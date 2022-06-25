import { isInList, getProduct } from "./helper-function";

let list = [
  {
    _id: 1,
    name: "car mat",
  },
  {
    _id: 2,
    name: "car wheel",
  },
];

test("return true if present in the list", () => {
  expect(isInList(list, 1)).toBe(true);
});

test("return false if not present in the list", () => {
  expect(isInList(list, 3)).toBe(false);
});

test("should return the product in the list", () => {
  expect(getProduct(list, 2)).toEqual({
    _id: 2,
    name: "car wheel",
  });
});
