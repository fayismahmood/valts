import { NumRules, NumT } from "../helpers";
import { ParsedResult } from "../parse";

export let NumberParser: Required<{
  [k in keyof NumT]: (t: Required<NumT[k]>, v: number) => ParsedResult;
}> = {
  type(t, v) {
    if (typeof v == "number") return { status: true, type: "type" };
    return { status: false, msg: `Invalid Number Type`, type: "type" };
  },
  rules(t, v) {
    let errors: ParsedResult[] = [];

    t?.forEach((e) => {
      let _r = Object.keys(e)[0] as keyof NumRules;
      let _ = NumberRuleParser[_r];
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

export let NumberRuleParser: Required<{
  [k in keyof NumRules]: (
    t: [Required<NumRules[k]>, string?],
    v: number
  ) => ParsedResult;
}> = {
  len(t, v) {
    let [p, m] = t;
    if (p == v) return { status: true, type: "len" };
    return {
      status: false,
      msg: m || `Invalid Length required ${p} letters`,
      type: "len",
      params: { len: v, expected: p },
    };
  },
  max(t, v) {
    let [p = 0, m] = t;

    if (v < p) return { status: true, type: "max" };
    return {
      status: false,
      msg: m || `Atleast ${p} letters are required `,
      type: "max",
      params: { len: v, expected: p },
    };
  },
  min(t, v) {
    let [p = 0, m] = t;

    if (v > p) return { status: true, type: "min" };
    return {
      status: false,
      msg: m || `Must not exceed more than ${p} letters `,
      type: "min",
      params: { len: v, expected: p },
    };
  },
};
