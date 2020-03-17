# WeakSet and WeakMap
In `Set` and `Map`, if you use an object as key and then if the object becomes unreachable, the stored object is unaffected.

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // overwrite the reference

// john is stored inside the map,
// we can get it by using map.keys()
```

## WeakMap
```js

  let myWeakMap = new WeakMap();
  let user = {name: 'John'};
  myWeakMap.set(user, 'Hey, John');

  // TypeError: WeakMap key must be an object, got the string "Venkat"
  myWeakMap.set('Venkat', 'Hey, Venkat'); 

```

```js

let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // overwrite the reference

// john is still stored inside the map
map.size; // 1


let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // overwrite the reference
// john is removed from memory!
```

WeakMap has only the following methods:

weakMap.get(key)
weakMap.set(key, value)
weakMap.delete(key)
weakMap.has(key)

AND doesn't not support iterable methods (.keys(), .values() and .entries())

## Use cases
In a relational database, a table row with foreign key as ID is automatically deleted when the original ID is deleted from another table. For example, in `users` table, we have User ID. And we use `user_id` as foreign key in `user_meta` table. Once the user has been deleted, the `user_meta` data has no use and hence it should be deleted as well.

In JS code, WeakMap is used for similar purpose. To store extra information about objects, like `user_meta` of a `user` object


## WeakSet
Same as `Set` only difference is `WeakSet` can only store objects. Like `WeakMap` it doesn't support size method and other iterables like keys, values and entries


## Exercises
```js

function unique(arr) {
  return Array.from(new Set(arr));
}

let strs = ["Hare", "Krishna", "Hare", "Krishna", "Krishna", "Krishna", "Hare", "Hare", ":-O"];

alert( unique(strs) ); // Hare, Krishna, :-O

function aclean(arr) {
  let mySet = new Set();
  arr.forEach(item => {
    let itemArr = Array.from(item).sort();
    mySet.add(itemArr.join(''))
  });
  return Array.from(mySet);
}
let arr = ["nap", "teachers", "cheaters", "pan", "ear", "era", "hectares"];

alert( aclean(arr) ); // ["anp", "aceehrst", "aer"]
// This is wrong, words should still has same letter order

```
