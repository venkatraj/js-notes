# Map, Set WeakMap and WeakSet
Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type.

```js

  let language = new Map();
  language.set('name','JavaScript');
  language.set(false, 'Super Easy');
  language.set(1, 'No. 1 language');

  console.log(language.get(false)); // "Super Easy";
  console.log(language.has(null)); // false
  language.delete('name');  // Remove 'name' key/value
  language.clear(); // Removes all key/value but empty map exists
  language.size; // Now '0'

```

## Map can also use objects as keys.
```js

  let john = { name: "John" };

  // for every user, let's store his visits count
  let visitsCountMap = new Map();

  // john is the key for the map
  visitsCountMap.set(john, 123);

  console.log( visitsCountMap.get(john) ); // 123

```

### Chaining
```js

  let user = new Map();
  user
    .set('name', 'Venkat')
    .set('language','JavaScript')
    .set('Competance','High')
    .set('Compensation','Moderate')

  console.log(user);

```

## Map from arrays
```js

  // array of [key, value] pairs
  let map = new Map([
    ['1',  'str1'],
    [1,    'num1'],
    [true, 'bool1']
  ]);

```

## Object to arrays
```js

  let user = {
    name: 'Venkat',
    lang: 'JavaScript'
  };

  console.log(Object.entries(user));

```

## Map from objects
```js

  let user = {
    name: 'Venkat',
    lang: 'JavaScript'
  };

  let userMap = new Map(Object.entries(user));

```

## Map and its iterables
* map.keys()
* map.values()
* map.entries()

```js

  let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 350],
    ['onion',    50]
  ]);

  // iterate over keys (vegetables)
  for(let key of recipeMap.keys()) {
    console.log(key); // cucumber, tomatoes, onion
  }

  // iterate over values (amounts)
  for(let value of recipeMap.values()) {
    console.log(value); // 500, 350, 50
  }

  // iterate over [key, value] entries
  for(let entry of recipeMap) {
    console.log(entry); // ['cucumber',500], [...]
    console.log(entry[0]); // cucumber, ...
    console.log(entry[1]); // 500, ...
  }

```

## Map forEach
```js

  recipeMap.forEach( (value, key, map) => {
    alert(`${key}: ${value}`); // cucumber: 500 etc
  });

```

## Set
```js

  let set = new Set();

  let john = {name: "John"};
  let pete = {name: "Pete"};
  let mary = {name: "Mary"};

  set.add(john);
  set.add(pete);
  set.add(mary);
  set.add(john);
  set.add(pete);
  set.add(mary);

  console.log(set.size); // 3
  console.log(set.has(john)); // true
  console.log(set.delete(john)); // returns true delete's john
  console.log(set.size); // 2
  set.clear(); // Removes all values
  console.log(set.size); // 0

```

## Iteration over Set
To make it compatible with Map, Set also has three iterable methods
* Set.keys() - return keys
* Set.values() = return values same as keys
* Set.entries() - returns [key, value]
```js

  let set = new Set(['one','two','three','four','five']);

  for(let value of set.keys()) {
    console.log(value); // one, two, three, four, five
  }

  for(let value of set.values()) {
    console.log(value); // one, two, three, four, five
  }

  for(let value of set.entries()) {
    console.log(value); // [one, one],[two,two],[three,three],[four,four],[five,five]
    console.log(value[0]); // one, two, three, four, five
    console.log(value[1]); // one, two, three, four, five
  }

  for(let value of set) {
    console.log(value); // one, two, three, four, five
  }

  set.forEach(function(value, valueAgain, setItself) {
    console.log(value); // one, two, three, four, five
    console.log(valueAgain); // one, two, three, four, five
  });

```

## WeakSet and WeakMap
In `Set` and `Map`, if you use an object as key/value and then the object is not reachable, the stored item is unaffected.
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

Excercises
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
