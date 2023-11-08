import { StrT } from "../helpers";
import { ParsedResult } from "../parse";

export let StringParser: Required<{
  [k in keyof StrT]: (t: Required<StrT[k]>, v: string) => ParsedResult;
}> = {
  type(t, v) {
    if (typeof v == "string") return { status: true, type: "type" };
    return { status: false, msg: `Invalid String Type`, type: "type" };
  },
  min(t = 0, v) {
    if (v.length > t) return { status: true, type: "min" };
    return {
      status: false,
      msg: `Must Contain atleast ${v.length} letter(s)`,
      type: "min",
      params: { len: v.length, expected: t },
    };
  },
  max(t = 0, v) {
    if (v.length < t) return { status: true, type: "max" };
    return {
      status: false,
      msg: `Dont exceed more ${v.length} letter(s)`,
      type: "max",
      params: { len: v.length, expected: t },
    };
  },
  len(t = 0, v) {
    if (v.length == t) return { status: true, type: "len" };
    return {
      status: false,
      msg: `Must Contain ${v.length} letter(s)`,
      type: "len",
      params: { len: v.length, expected: t },
    };
  },
  email(t, v) {
    if (
      t &&
      /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i.test(
        v
      )
    )
      return { status: true, type: "email" };
    return { status: false, msg: `Invalid Email`, type: "email" };
  },
  rgexp(t = "", v) {
    let _rg = RegExp(t);
    if (_rg.test(v)) return { status: true, type: "rgexp" };
    return { status: false, msg: `Regular Exp Err`, type: "rgexp" };
  },
};
