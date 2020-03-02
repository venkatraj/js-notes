## Static methods and inheritance
As we already know, static methods are not added to prototype, but the constructor itself.
Recap
```js
class User {
  static staticMethod() {
    console.log(this === User);
  }
  someMethod() {
      console.log('Method in prototype');
  }
}

User.staticMethod(); // true
User.prototype.staticMethod(); // Uncaught TypeError: User.prototype.staticMethod is not a function
User.someMethod(); // Uncaught TypeError: User.someMethod is not a function
User.prototype.someMethod(); // Method in prototype;

```
With normal function construtor based prototypal inheritance, there is no connection between to constructor functions. Only objects created with it uses `__proto__` property to form inheritance chain.

But `class` construct also supports static methods. When using `extends` it adds a `[[Prototype]]` property to child class that reference parent class

```js

class Animal {}
class Rabbit extends Animal {}

// for static propertites and methods
alert(Rabbit.__proto__ === Animal); // true
// that's in addition to the "normal" prototype chain for object methods
alert(Rabbit.prototype.__proto__ === Animal.prototype);

// and the next step is Function.prototype
alert(Animal.__proto__ === Function.prototype); // true

```
## No static inheritance in built-ins
Even though build-in objects has static methods (think of Object.defineProperty, etc) it won't be inherited. That is even though `Date` is inherited from `Object`, `Date` doesn't have `Object` static methods such as defineProperty, Object.keys, etc

## Natives are extendable
Built in classes like Array, map and others are extendable
```js

Array.prototype.isEmpty = function() {
    return this.length === 0;
}

// add one more method to it (can do more)
class PowerArray extends Array {
    isEmpty() {
        return this.length === 0;
    }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```
Please note one very interesting thing. Built-in methods like filter, map and others – return new objects of exactly the inherited type. They rely on the constructor property to do so.
`arr.constructor === PowerArray`

If you want to change the constructor that are returned by built-in methods such as filter, map, etc you need to use a static getter `Symbol.species`
```js
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
  // built-in methods will use this as the constructor
  static get [Symbol.species]() {
    return Array;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter creates new array using arr.constructor[Symbol.species] as constructor
let filteredArr = arr.filter(item => item >= 10);

// filteredArr is not PowerArray, but Array
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
```

## Excercise 2
```js

class ExtendedClock extends Clock {
    constructor(options) {
        super(options);
        let {precision = 1000} = options;
        this._precision = precision;
    }
    start() {
        this._render();
        this._timer = setInterval(() => this._render(), this._precision)
    }
}
