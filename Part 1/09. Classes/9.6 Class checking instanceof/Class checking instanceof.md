# Class checking: "instanceof"
To check whether an object is an instance of a class or not, we use `instanceof` operator
**Syntax**
```js
obj instanceof Class
```
Real example
```js
class Rabbit {}
let rabbitObj = new Rabbit();
// to check whether the rabbitObj is instance of class Rabbit or not
console.log(rabbitObj instanceof Rabbit); // true
```
You can also check whether an object is created by certain constructor function or not.
For example
```js
function Rabbit() {}
let rabbitObj = new Rabbit();
console.log(rabbitObj instanceof Rabbit); // true
```
The `instanceof` operator returns true, regardless of whether the object is direct instance of specified class or it is instance of inherited class.
For example
```js
class Animal{}
class Rabbit extends Animal{}
let rabbit = new Rabbit();
console.log(rabbit instanceof Rabbit); // true
console.log(rabbit instanceof Animal); // true
console.log(rabbit instanceof Object); // true

// same with built in objects
let collection = [];
console.log(collection instanceof Array); // true
console.log(collection instanceof Object); // true
```
We can rewrite the above check as follows
```js
rabbit.__proto__ === Rabbit.prototype
rabbit.__proto__.__proto__ === Animal.prototype
rabbit.__proto__.__proto__.__proto__ === Object.prototype
```

Since the availability of Symbol data type, we can fine tune this prototype chain check with a static method `Symbol.hasInstance`
```js
class Animal {
    static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
    }
}
let obj = {canEat: true};
console.log(obj instanceof Animal); // true
```
There is another method available at our disposal. `objA.isPrototypeOf(objB)`
So, `obj instanceof Animal` is equal to `Animal.prototype.isPrototypeOf(obj)` and vice versa.
```js
class Animal{}
class Rabbit extends Animal{}
let rabbit = new Rabbit();
console.log(Rabbit.prototype.isPrototypeOf(rabbit)); // true
console.log(Animal.prototype.isPrototypeOf(rabbit)); // true
console.log(Object.prototype.isPrototypeOf(rabbit)); // true
```

Please note that `isPrototypeOf` is actually using prototype object not Constructor function.
```js
function Rabbit() {}
let rabbit = new Rabbit();

// changed the prototype
Rabbit.prototype = {};

// ...not a rabbit any more, 
// because prototype object is overridden and constructor reference is gone!
alert( rabbit instanceof Rabbit ); // false
```
## Bonus: Object toString for the type
We can use built in `Object.toString` method to convert object type as string
```js
let num = 10;
let str = 'hello';
let arr = [];

let customToString = Object.prototype.toString;
console.log(customToString.call(num)); // [object Number]
console.log(customToString.call(arr)); // [object Array]
console.log(customToString.call(str)); // [object String]

let customToString = Object.prototype.toString;
console.log(customToString.call(1)); // [object Number]
console.log(customToString.call([])); // [object Array]
console.log(customToString.call("hello")); // [object String]
class Animal {}
console.log(customToString.call(new Animal())); // [object Object]
```

As you can see the Animal object isn't converted to `[object Animal]` instead it is displaying as `[object Object]` We can fix that with the help of `Symbol.toStringTag` property in custom objects.

```js
class Animal {
    get [Symbol.toStringTag]() {
        return "Animal";
    }
}
let customToString = Object.prototype.toString;
console.log(customToString.call(new Animal())); // [object Animal]


let user = {};
let customToString = Object.prototype.toString;
console.log(customToString.call(user)); // [object Object]

let user = {
  [Symbol.toStringTag]: "User"
};
let customToString = Object.prototype.toString;
console.log(customToString.call(user)); // [object User]

```
For most environment-specific objects, there is such a property. Here are some browser specific examples:
```js
// toStringTag for the environment-specific object and class:
console.log( window[Symbol.toStringTag]); // window
console.log( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

console.log( {}.toString.call(window) ); // [object Window]
console.log( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```