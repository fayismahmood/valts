import { AllSchema, ObjT, inferData } from "../helpers";
import { ParsedResult, Validate } from "../parse";

export let ObjectParser: Required<{
  [k in keyof ObjT]: <V extends inferData<ObjT>>(
    t: Required<ObjT[k]>,
    v: V
  ) => ParsedResult;
}> = {
  type(t, v) {
    if (typeof v == "object" && !Array.isArray(v)) return { status: true };
    return { status: false, msg: "Invalid Object Type", type: "type" };
  },
  keys(t, v) {
    let _keys = Object.keys(t);
    let errors: any = {};
    _keys.forEach((e) => {
      let _ = t[e];
      let _v = v[e];
      let val = Validate(_, _v);
      if (val.status == false) {
        errors[e] = val;
      }
    });
    if (Object.keys(errors).length > 0) {
      return { status: false, errors,msg:"Invalid object properties" };
    }else{
      return {status:true}
    }
  },
};
