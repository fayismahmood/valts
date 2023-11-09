# number

`Num` function is used to create number schema;

```ts
import { Num, inferData } from "valts";

let schema = Num();
```

## number Rules

You can add rules to number by passing rule functions as argument to `Num` function.

```ts
Num({ rules: [email()] });
// to validate email number
```

every rule functions have a message parameter to create a custom message

```ts
Num({ rules: [email("invalid email")] });
// this should display `invalid email` when number is not a  valid email
```

#### Available rules

`len`  
`max`  
`min`

### Length

`len` function

```ts
Num({ rules: [len(10, "10 char....")] });
// to validate number length
```

### Maximum Length

`max` function

```ts
Num({ rules: [max(10, "too big number")] });
// to validate max
```

### Minimum Length

`min` function

```ts
Str({ rules: [min(10, "too small number")] });
// to validate minimum
```
