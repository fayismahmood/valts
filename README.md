# install
`npm i valts`
# Usage
Definge your schema using valts 
```ts
import {Obj} from "valts";

let schema=Obj({
    name: { type: "string" },
    email: { type: "string", email: [true, "Invalid Email"] },
  });
```