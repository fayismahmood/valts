// sum.test.js
import { expect, test } from "vitest";
import { Arr, Num, Obj, Str } from "../src/helpers";
import { Validate } from "../src/parse";
import { email, max } from "../src/rules";

test("TestString Status True", () => {
  let StringSchema = Str({ rules: [email("asfasfasfsf")] });
  expect(Validate(StringSchema, "asdf@sfasf.asf")).toStrictEqual({
    status: true,
  });
});

test("TestString Status False", () => {
  let StringSchema = Str({ rules: [email("asfasfasfsf")] });
  expect(Validate(StringSchema, "asdffasf.asf")).toStrictEqual({
    status: false,
    msg: "rule err",
    type: "rules",
    errors: [{ msg: "Invalid Email", status: false, type: "email" }],
  });
});

test("Test Number Status True", () => {
  let NumSchema = Num({ rules: [max(50)] });
  expect(Validate(NumSchema, 35)).toStrictEqual({
    status: true,
  });
});

test("Test Number Status False", () => {
  let NumSchema = Num({ rules: [max(50, "exceed more than 50")] });
  expect(Validate(NumSchema, 85)).toStrictEqual({
    status: false,
    msg: "rule err",
    errors: [
      {
        status: false,
        msg: "exceed more than 50",
        type: "max",
        params: { len: 85, expected: 50 },
      },
    ],
    type: "rules",
  });
});

test("Test Object Status True", () => {
  let ObjSchema = Obj({ a: Str({ rules: [{ email: [true, "Inv Email"] }] }) });
  expect(Validate(ObjSchema, { a: "aa@df.dfa" })).toStrictEqual({
    status: true,
  });
});

test("Test Object Status False", () => {
  let ObjSchema = Obj({ a: Str({ rules: [{ email: [true, "Inv Email"] }] }) });
  expect(Validate(ObjSchema, { a: "aadf.dfa" })).toStrictEqual({
    msg: "Invalid object properties",
    status: false,
    errors: {
      a: {
        errors: [{ msg: "Invalid Email", status: false, type: "email" }],
        msg: "rule err",
        status: false,
        type: "rules",
      },
    },
  });
});

test("Test Array Status True", () => {
  let ArrSchema = Arr({ elm: { type: "string" } });
  expect(
    Validate(ArrSchema, ["Asdfas", "eeee", "werd", "eoireq"])
  ).toStrictEqual({
    status: true,
  });
});

test("Test Array Status False", () => {
  let ArrSchema = Arr({
    elm: { type: "string" },
    rules: [{ max: [2, "Too more"] }],
  });
  expect(
    Validate(ArrSchema, ["Asdfas", "eeee", "werd", "eoireq"])
  ).toStrictEqual({
    errors: [
      {
        msg: "Too more",
        status: false,
        type: "max",
      },
    ],
    msg: "rule err",
    status: false,
    type: "rules",
  });
});
