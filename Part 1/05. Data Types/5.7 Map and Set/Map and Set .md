# Map and Set
## Map
Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type.

new Map() – creates the map.
map.set(key, value) – stores the value by the key.
map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
map.has(key) – returns true if the key exists, false otherwise.
map.delete(key) – removes the value by the key.
map.clear() – removes everything from the map.
map.size – returns the current element count.

## Map[key]
Though will work, we shouldn't use square bracket syntax for accessing map elements


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

# Map key comparison
It uses `SameValueZero` algorithm which is roughly equal to `===` comparison. Difference is `NaN === NaN` returns false where as `SameValueZero` returns true. So NaN can be used as the key as well.

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
A Set is a collection, a set of unique values

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
  console.log(set.delete(john)); // returns true deletes  john
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

