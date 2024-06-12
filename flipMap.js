import { hasNonPrimitiveValues } from "./src/utils/utils";

const obj = {
  add: () => console.log("add method"),
  user: {
    name: "tom",
  },
  age: 10,
  friends: [1, 2, 3],
};

const flipAsMap = (original) => {
  const flipped = new Map(Object.entries(original));

  Object.keys(original).forEach((key) => flipped.set(original[key], key));

  return flipped;
};

const AL2_flipObject = (original) => {
  const flipped = Object.assign({}, original);

  if (hasNonPrimitiveValues(flipped)) return flipAsMap(original);

  Object.keys(flipped).reduce((acc, key) => {
    acc[acc[key]] = key;
    return acc;
  }, flipped);

  return flipped;
};

console.log(obj);
const result = AL2_flipObject(obj);
console.log(result);
console.log(result.get("add") === obj.add);
console.log(result.get(obj.add) === "add");
