import { AllSchema, Arr, Obj, Str, StrT, inferData } from "./helpers";
import { ArrayParser } from "./parsers/array";
import { NumberParser } from "./parsers/number";
import { ObjectParser } from "./parsers/object";
import { StringParser } from "./parsers/string";

export type ParsedResult = {
  status: boolean;
  msg?: string;
  type?: string;
  params?: { [key: string]: any };
};

export let Parsers = {
  string: StringParser,
  object: ObjectParser,
  array: ArrayParser,
  number: NumberParser,
};

export function ParseErrors<T extends AllSchema>(t: T, v: inferData<T>) {
  let Type = Parsers[t.type];

  let err: any = {};
  for (const key in t) {
    if (Object.prototype.hasOwnProperty.call(t, key)) {
      const element = t[key];

      if (key in Type) {
        //@ts-ignore
        let _ = Type?.[key](element, v);
        if (_.status == false) {
          err[key] = _;
        }
      }
    } else {
      return { err: "Unexpected err" };
    }

    //
  }
  if (Object.keys(err).length > 0) {
    return err;
  } else {
    return { status: true };
  }
}

export function Validate<T extends AllSchema>(t: T, v: inferData<T>) {
  let Type = Parsers[t.type];

  for (const key in t) {
    if (Object.prototype.hasOwnProperty.call(t, key)) {
      const element = t[key];

      if (key in Type) {
        //@ts-ignore
        let _ = Type?.[key](element, v);
        if (_.status == false) {
          return _;
        }
      }
    } else {
      return { err: "Unexpected err" };
    }

    //
  }

  return { status: true };
}
 
