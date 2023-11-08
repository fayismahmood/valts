# install
`npm i valts`
# Usage
Definge your schema using valts 
```ts
import {Obj,Validate} from "valts";

let schema=Obj({
    name: { type: "string" },
    email: { type: "string", email: [true, "Invalid Email"] },
  });


let validate=Validate(schema,{name:"ameen",email:"amee@gma.com"})
```