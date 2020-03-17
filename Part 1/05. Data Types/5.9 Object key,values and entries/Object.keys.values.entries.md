# Object.keys(), values() and Entries()
It is a common agreement to use iterables methods for data structures. That is why Map, Set and Array data structures has .keys(), .values() and .entries()

Similarly, we can use `Object` data structure's method to get iterables of plain objects

Object.keys(obj) – returns an array of keys.
Object.values(obj) – returns an array of values.
Object.entries(obj) – returns an array of [key, value] pairs.

There is two difference between other data strcutures and plain objects.
1. Calling Syntax. map.keys() vs Object.keys(obj)
2. Return value. map => Iterable Vs obj => array


```js

  let user = {
    name: "John",
    age: 30
  };

```

Object.keys(user) = ["name", "age"]
Object.values(user) = ["John", 30]
Object.entries(user) = [ ["name","John"], ["age",30] ]

These methods ignore symbolic properties. To get them we need to use `Object.getOwnPropertySymbols` or `Reflect.ownKeys(obj)`

## Transforming objects
```js
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // convert to array, map, and then fromEntries gives back the object
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);

alert(doublePrices.meat); // 8
```

## Exercises

```js

  let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
  };

  alert( sumSalaries(salaries) ); // 650

  function sumSalaries(arr) {
    let salaries = Object.values(arr);
    let sum = 0;
    for(let salary of salaries) {
        sum += salary
    }

    return sum;
  }
```
### Count properties

```js
let user = {
  name: 'John',
  age: 30
};

function count(obj) {
  // return Array.from(Object.entries(obj)).length
  return Object.entries(obj).length // because Object.entries() itself returns an array, not an iterable
}

console.log( count(user) ); // 2
```
