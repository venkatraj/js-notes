## Natives are extendable
Built in classes like Array, Map and others are extendable
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

#### Other collections work similarly
Other collections, such as Map and Set, work alike. They also use `Symbol.species`

## No static inheritance in built-ins
Even though build-in objects has static methods (think of Object.defineProperty, etc) it won't be inherited. That is even though `Date` is inherited from `Object`, `Date` doesn't have `Object` static methods such as defineProperty, Object.keys, etc