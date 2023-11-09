import { AllSchema, ArrRules, ArrT, inferData } from "../helpers";
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
  rules(t, v) {
    let errors: ParsedResult[] = [];

    t?.forEach((e) => {
      let _r = Object.keys(e)[0] as keyof ArrRules;
      let _ = ArrayRuleParser[_r];
      let _val = e[_r];
      if (_val) {
        //@ts-ignore
        let valid = _(_val, v);
        if (valid.status == false) {
          errors.push(valid);
        }
      }
    });
    if (errors.length > 0) {
      return { status: false, msg: "rule err", errors, type: "rules" };
    } else {
      return { status: true };
    }
  },
};

export let ArrayRuleParser: Required<{
  [k in keyof ArrRules]: (
    t: [Required<ArrRules[k]>, string?],
    v: inferData<AllSchema>[]
  ) => ParsedResult;
}> = {
  len(t, v) {
    let [p, m] = t;
    if (v.length == p) return { status: true };
    return {
      status: false,
      type: "len",
      msg: m || `Invalid length required ${p}`,
    };
  },
  max(t, v) {
    let [p = 10, m] = t;

    if (v.length < p) return { status: true };
    return { status: false, type: "max", msg: m||`Invalid length required ${p}` };
  },
  min(t, v) {
    let [p = 0, m] = t;

    if (v.length > p) return { status: true };
    return { status: false, type: "min", msg: `Invalid length required ${p}` };
  },
};
