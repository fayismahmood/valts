# inferData

valts library is fully compatable with typescript, you can retrive typescript types from schema you have created easily.

You can extract the TypeScript type of any schema with `inferData<typeof yourSchema>` .

```ts
import { Obj, Str, Validate, email, min, inferData } from "valts";

let schema = Obj({
  name: Str({ rules: [min(4)] }),
  email: Str({ rules: [email()] }),
});

type typ = inferData<typeof schema>;
//  type typ = {
//      name?: string | undefined;
//      email?: string | undefined;
//  }
```
