import { AllSchema, ArrT, inferData } from "../helpers";
import { ParsedResult, Validate } from "../parse";

export let ArrayParser: Required<{
  [k in keyof ArrT]: (
    t: Required<ArrT[k]>,
    v: inferData<ArrT["elm"]>[]
  ) => ParsedResult;
}> = {
  type(t, v) {
    if (Array.isArray(v)) return { status: true };
    return { status: false, type: "type", msg: `Invalid Array type` };
  },
  elm(t, v) {
    let errors: any[] = [];

    v.forEach((e, i) => {
      let val = Validate(t, e);
      if (val.status == false) {
        errors.push({ err: val, key: i, val: e });
      }
    });
    //return { status: false, type: "type", msg: `Invalid Array type` };
    if (errors.length > 0) {
      return {
        status: false,
        type: "elm",
        msg: `Invalid array element `,
        errors,
      };
    } else {
      return { status: true };
    }
  },
  len(t, v) {
    if (v.length == t) return { status: true };
    return { status: false, type: "len", msg: `Invalid length required ${t}` };
  },
  max(t = 10, v) {
    if (v.length < t) return { status: true };
    return { status: false, type: "max", msg: `Invalid length required ${t}` };
  },
  min(t = 0, v) {
    if (v.length > t) return { status: true };
    return { status: false, type: "min", msg: `Invalid length required ${t}` };
  },
};
