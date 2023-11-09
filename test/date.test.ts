import { expect, test } from "vitest";
import { Num, Str, Validate, date, max } from "../src";

test("Test Date True", () => {
    let DateSchema = Str({ rules: [date({min:"10/4/2023"})] });
    expect(Validate(DateSchema, "10/4/2023")).toStrictEqual({
      status: true,
    });
  });