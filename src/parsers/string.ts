import { StrRules, StrT } from "../helpers";
import { ParsedResult } from "../parse";

export let StringParser: Required<{
  [k in keyof StrT]: (t: Required<StrT[k]>, v: string) => ParsedResult;
}> = {
  type(t, v) {
    if (typeof v == "string") return { status: true, type: "type" };
    return { status: false, msg: `Invalid String Type`, type: "type" };
  },
  rules(t, v) {
    let errors: ParsedResult[] = [];

    t?.forEach((e) => {
      let _r = Object.keys(e)[0] as keyof StrRules;
      let _ = StringRuleParser[_r];
      let _val = e[_r];
      if (_val) {
        //@ts-ignore
        let valid=_(_val, v);
        if(valid.status==false){
          errors.push(valid)
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

export let StringRuleParser: Required<{
  [k in keyof StrRules]: (
    t: [Required<StrRules[k]>, string?],
    v: string
  ) => ParsedResult;
}> = {
  min(t, v) {
    let [p = 0, m] = t;
    if (v.length > p) return { status: true, type: "min" };
    return {
      status: false,
      msg: m || `Must Contain atleast ${v.length} letter(s)`,
      type: "min",
      params: { len: v.length, expected: t },
    };
  },
  max(t, v) {
    let [p = 0, m] = t;

    if (v.length < p) return { status: true, type: "max" };
    return {
      status: false,
      msg: m || `Dont exceed more ${v.length} letter(s)`,
      type: "max",
      params: { len: v.length, expected: t },
    };
  },
  len(t, v) {
    let [p = 0, m] = t;

    if (v.length == p) return { status: true, type: "len" };
    return {
      status: false,
      msg: m || `Must Contain ${v.length} letter(s)`,
      type: "len",
      params: { len: v.length, expected: t },
    };
  },
  email(t, v) {
    let [p = false, m] = t;

    if (p) {
      if (
        /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i.test(
          v
        )
      )
        return { status: true, type: "email" };
      return { status: false, msg: `Invalid Email`, type: "email" };
    }
    return { status: false, msg: "unexpected err" };
  },
  rgexp(t, v) {
    let [p = "", m] = t;

    let _rg = RegExp(p);
    if (_rg.test(v)) return { status: true, type: "rgexp" };
    return { status: false, msg: `Regular Exp Err`, type: "rgexp" };
  },
};
