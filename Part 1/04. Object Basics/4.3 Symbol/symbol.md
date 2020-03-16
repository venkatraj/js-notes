Also read: https://codeburst.io/a-practical-guide-to-es6-symbol-3fc90117c7ac

# Symbol Type
Object property name can be either string type or symbol type. So far we have seen only string type object property names. Even if we used property names such as
```js
let phoneCodes = {
  91: "India",
  1: "US"
}
for(prop in phoneCodes) {
  console.log(prop);
  console.log(typeof prop); // string
  console.log(phoneCodes[prop]);
}
```
this, as you can see it is still string.

## Symbols
Symbol value is a unique identifier. You can't create same symbol twice.
### Creating Symbols
```js

  // id is a new symbol
  let id = Symbol();

```
Symbol's can have a description (called symbol name) which is useful for debugging.
```js

  // id is a symbol with the description "id" (or) Symbol with name "id" is stored in `id`
  let id = Symbol("id");

```
If you create two symbols with same description, then they are still unique and are not equal
```js

  let id1 = Symbol("id");
  let id2 = Symbol("id");

  console.log(id1 == id2); // false

```
Symbols don't auto convert to strings
```js

  let id = Symbol("id");
  console.log(id); // TypeError: Cannot convert a Symbol value to a string

  // To do that
  let id = Symbol("id");
  console.log(id.toString()); // Symbol(id), now it works

  let id = Symbol("id");
  let user = {
    [id]: 1,
    name: 'Venkat'
  };

  console.log(user[id]); // 1 Accessed using id variable which has symbol value

  user.id = 2;
  console.log(user.id); // 2 Accessed using `id` property name
  console.log(user[id]); // 1 Accessed using id variable which has symbol value

  let user2  = {
    id: 2,
    name: 'Raj'
  };

  user2.id = 3;
  console.log(user2.id); // 3 Accessed using `id` property name
  console.log(user2[id]);  // `undefined` Accessed using id variable which has symbol value (does not exists in user2 object)

```

## Usage
Main usage of Symbols is to create "hidden" properties or private properties as called in other oop languages.

Consider that we have a collection of user objects.and each user object has a `userID` to identify themselves.

If some other script (say a Department script that uses users objects) is using our collection, then chances are that they can overwrite our unique user IDs which is not desireable.

Normally, we will use clousers (which we will see soon) to hide properties. But with new Symbols such things becomes easy.
```js
let user = { name: "John" };
let id = Symbol("id");
user[id] = "ID Value";

// we can access the data using the symbol as the key
console.log( user[id] );


function anotherScript() {
  // In some other script they have this
  let id = Symbol("id");
  user[id] = "Their id value";
  console.log(user[id])
}

anotherScript();
console.log( user[id] );
```
In above script no damage has been done. Because `id` variable has a unique identifier which is different from the original one. The scope of this `id` will end when script completes execution and when you use `id` in your script you are actually using the original unique symbol.

So symbols prevents situations like this
```js
let user = { name: "John" };

// our script uses "id" property
user.id = "ID Value";

// ...if later another script the uses "id" for its purposes...

user.id = "Their id value"
// boom! overwritten! it did not mean to harm the colleague, but did it!
```
```js
const SECRET = Symbol('secret')
let data = { }
data[SECRET] = 10
let newData = Object.assign({ }, data)

Object.getOwnPropertyNames(data)  // []
(SECRET in data)                  // true
(SECRET in newData)               // true

// But can be detectable
Object.getOwnPropertySymbols(data)
```

## Symbols in a literal
We need to use square brackets to use symbols as property names same as using variable as property names
```js
let id = Symbol("id");

let user = {
  name: "John",
  [id]: 123 // not just "id: 123"
};
```
## Symbols are skipped by for..in
`for...in` loops skips symbols, because they are hidden properties and not for public use
```js

  let id = Symbol("id");
  let user = {
    name: "John",
    age: 30,
    [id]: 123
  };

  for (let key in user) console.log(key); // name, age (no symbols)

  // the direct access by the symbol works
  console.log( "Direct: " + user[id] );

```
## Cloning objects with Symbols
Using `Object.assign` copies both string and symbol properties. Since when you copy you would expect to copy all properties. So "hidden" won't work here.
```js

  let id = Symbol("id");
  let user = {
    [id]: 123
  };

  let clone = Object.assign({}, user);

  console.log( clone[id] ); // 123

```
## Global Symbols
Symbols are great way to hide property from changing it accidentally. But sometimes we want to access them  at will.

Say, we want to access an object based on an `id` This should be exactly the same `id` when the object was created and used to identify it uniquely.

For that a `global symbol registry` exists in javascript. This global symbol registry guarantees that if you access symbol by name, it exactly repeats the same unique identifier rather than new ones unlike below example
```js
let id1 = Symbol('id');
let id2 = Symbol('id');
console.log(id1 == id2); // false
```
To create a symbol in global registry, you would use
```js
Symbol.for(key);

  // read from the global registry
  let id = Symbol.for("id"); // if the symbol did not exist, it is created

  // read it again
  let idAgain = Symbol.for("id");

  // the same symbol
  alert( id === idAgain ); // true

```
It checks global registry for `key`, if it exists it returns it, if not it creates and returns it.
Subsequent calls for same `key` will return the same symbol, no new ones created
```js
let id1 = Symbol.for('id');
let id2 = Symbol.for('id');
console.log(id1 == id2 ); // true
```
## Symbol.keyFor
Alternatively, you can symbol's description from symbol value. For example, above we created a symbol with description `id`, so we can get that description using the created symbol.

```js

  let userID = Symbol.for('id');
  let userName = Symbol.for('name');
  console.log(Symbol.keyFor(userID)); // id
  console.log(Symbol.keyFor(userName)); // name

```
Please note that `Symbol.keyFor` only works with `global Symbol registry`, it will not work with normal Symbols. Because with normal Symbols, you can create multiple Symbols with same description
```js
console.log( Symbol.keyFor(Symbol.for("name")) ); // name, global symbol

console.log( Symbol.keyFor(Symbol("name2")) ); // undefined, the argument isn't a global symbol
```
## System symbols
There are many "system" symbols exists in javascript to be used internally. We can use them to fine tune various aspects of our objects which we will see soon.
