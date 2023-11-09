# Getting Started

## Install

via `npm` or other js package managers

### Using npm

`npm i valts`

## Creating a sample schema

```ts
import { Obj, Str, Validate, email, min } from "valts";

let schema = Obj({
  name: Str({ rules: [min(4)] }),
  email: Str({ rules: [email()] }),
});

let validate = Validate(schema, { name: "adfdaf", email: "adfsd@dsdf.cdf" });
// returns {status:true}
let validate2 = Validate(schema, { name: "adf", email: "adfsd@dsdf.cdf" });
// {"status":false,"errors":{"name":{"status":false,"msg":"rule err","errors":[{"status":false,"msg":"Must Contain atleast 3 letter(s)","type":"min","params":{"len":3,"expected":4}}],"type":"rules"}},"msg":"Invalid object properties"}
```
