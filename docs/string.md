# String

`Str` function is used to create string schema;

```ts
import { Str, inferData } from "valts";

let schema = Str();
```

## String Rules

You can add rules to string by passing rule functions as argument to `Str` function.

```ts
Str({ rules: [email()] });
// to validate email string
```

every rule functions have a message parameter to create a custom message

```ts
Str({ rules: [email("invalid email")] });
// this should display `invalid email` when string is not a  valid email
```

#### Available rules

`email`  
`len`  
`max`  
`min`  
`url`  
`uuid`  
`date`  
`rgexp`

### Email

`email` function

```ts
Str({ rules: [email()] });
// to validate email string
```

### Length

`len` function

```ts
Str({ rules: [len(10, "10 char....")] });
// to validate email string
```

### Maximum Length

`max` function

```ts
Str({ rules: [max(10, "too big string")] });
// to validate email string
```

### Minimum Length

`min` function

```ts
Str({ rules: [min(10, "too small string")] });
// to validate email string
```

### URL

`url` function

```ts
Str({ rules: [url("Not a valid Url")] });
// to validate url string
```

### UUID

`uuid` function

```ts
Str({ rules: [uuid("Not a valid UUID")] });
// to validate uuid string
```

### Date

`date` function

```ts
Str({ rules: [date("Not a valid Date")] });
// to validate date string
```

You can validate `max` and `min` for date;

```ts
Str({
  rules: [
    date(
      { max: "11/1/2002", min: "11/1/2000" },
      "You should be born between 11/1/2000 and 11/1/2002 "
    ),
  ],
});
// to validate date between two dates
```


### Regular Expression

`regexp` function

```ts
Str({ rules: [regexp("^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$","Not a valid Indian mobile number")] });
// to validate Indian mobile number
```