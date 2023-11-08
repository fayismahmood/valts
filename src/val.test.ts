// sum.test.js
import { expect, test } from "vitest";
import { Obj } from "./helpers";

test("adds 1 + 2 to equal 3", () => {
  let dd = Obj({
    name: { type: "string" },
    email: { type: "string", email: [true, "Invalid Email"] },
  });
  expect(1 + 2).toBe(3);
});
