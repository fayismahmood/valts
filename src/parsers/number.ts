import { NumT } from "../helpers";
import { ParsedResult } from "../parse";

export let NumberParser:Required<{
    [k in keyof NumT]: (
      t: Required<NumT[k]>,
      v: number
    ) => ParsedResult;
  }> ={
    type(t, v) {
        if(typeof v=="string")return {status:true,type:"type"}
        return {status:false,msg:`Invalid Number Type`,type:"type"}
    },
    len(t, v) {
        if( t==v)return {status:true,type:"len"}
        return {status:false,msg:`Invalid Length required ${t} letters`,type:"len",params:{len:v,expected:t}}
    },
    max(t=0, v) {
        if(v<t)return {status:true,type:"max"}
        return {status:false,msg:`Atleast ${t} letters are required `,type:"max",params:{len:v,expected:t}}
  
    },
    min(t=0, v) {
        if(v>t)return {status:true,type:"min"}
        return {status:false,msg:`Must not exceed more than ${t} letters `,type:"min",params:{len:v,expected:t}}
  
    },
  }