export type AllSchema = StrT | ObjT | ArrT | NumT;

export type StrT = {
  type: "string";
  email?: [boolean,string?];
  len?: number;
  max?: number;
  min?: number;
  rgexp?: string;
};

export type NumT = {
  type: "number";
  len?: number;
  max?: number;
  min?: number;
};

export type ObjT = {
  type: "object";
  keys: { [key: string]: AllSchema & { required?: boolean } };
};

export type ArrT = {
  type: "array";
  elm: AllSchema;
  min?: number;
  max?: number;
  len?: number;
};

export function Arr<T extends AllSchema>(t: Omit<ArrT,"type"> & { elm: T }): ArrT & { elm: T } {
  return {
    type: "array",
    ...t
  };
}
export function Str(t?: Omit<StrT,"type">): StrT {
  return { type: "string", ...t};
}

export function Num(t: Omit<NumT,"type">): NumT {
  return { type: "number", ...t };
}

export function Obj<T extends { [key: string]: AllSchema & { required?: boolean } }>(
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
