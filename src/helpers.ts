export type AllSchema = StrT | ObjT | ArrT | NumT;

///////////////////RulesTypes
export type StrRules = {
  email?: boolean;
  len?: number;
  max?: number;
  min?: number;
  rgexp?: string;
};
export type NumRules = {
  len?: number;
  max?: number;
  min?: number;
};

export type ArrRules = {
  min?: number;
  max?: number;
  len?: number;
};
///////////////////End-RulesTypes

export type RuleArr<R> = { [k in keyof R]: [R[k], string?] }[];

export type StrT = {
  type: "string";
  rules?: RuleArr<StrRules>;
};

export type NumT = {
  type: "number";
  rules?: RuleArr<NumRules>;
};

export type ObjT = {
  type: "object";
  keys: { [key: string]: AllSchema & { required?: boolean } };
};

export type ArrT = {
  type: "array";
  elm: AllSchema;
  rules?: RuleArr<ArrRules>;
};

/////////////////////////Functions to convert into schema by functions
export function Arr<T extends AllSchema>(
  t: Omit<ArrT, "type"> & {
    elm: T;
    rules?: RuleArr<ArrRules>;
  }
): ArrT & {
  elm: T;
  rules?: RuleArr<ArrRules>;
} {
  return {
    type: "array",
    ...t,
  };
}
export function Str(t?: Omit<StrT, "type">): StrT {
  return { type: "string", ...t };
}

export function Num(t: Omit<NumT, "type">): NumT {
  return { type: "number", ...t };
}

export function Obj<
  T extends { [key: string]: AllSchema & { required?: boolean } }
>(
  keys: T
): {
  type: "object";
  keys: T;
} {
  return {
    type: "object",
    keys,
  };
}

/////////////////////////End--------------Functions to convert into schema by functions

//------------------------------------------------------------------------------------//
// typescript infer Generics      //////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
type req<R extends object, K extends keyof R> = Pick<Required<R>, K> &
  Partial<R>;
type ValueOf<T> = T[keyof T];

type ObjReqFil<T extends ObjT> = ValueOf<{
  [k in keyof T["keys"]]-?: T["keys"][k]["required"] extends true ? k : never;
}>;

export type inferData<T extends AllSchema> = T extends StrT
  ? string
  : T extends NumT
  ? number
  : T extends ArrT
  ? inferData<T["elm"]>[]
  : T extends ObjT
  ? { [p in keyof req<T["keys"], ObjReqFil<T>>]: inferData<T["keys"][p]> }
  : any;
