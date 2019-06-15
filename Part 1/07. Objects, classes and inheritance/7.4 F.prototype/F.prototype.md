# F.prototype
`__proto__` property is available only from ES6.
But prototypal inheritance is javascript language's core feature and been available from the beginning.
In the old days, we can set an object [[Prototype]] property only using a constructor function's `prototype` property.

The difference between object's `__proto__ ([[Prototype]]` and constructor function's `prototype` property is that when properties and methods look up is happening js engine looks for it in the object itself, if not found it will continue looking through the `__proto__` chain

Where as constructor functions prototype property is a regular property which is not involved in lookup. It only makes sure when an object is created using `new` keyword, that object's `__proto__` is assigned to `F.prototype` object

```js
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true

```
## Default F.prototype, constructor property
```js

    function Rabbit() {}

    /* default prototype
    Rabbit.prototype = { constructor: Rabbit };
    */
    alert( Rabbit.prototype.constructor == Rabbit ); // true

    function Rabbit() {}
    alert( Rabbit.prototype.constructor == Rabbit );

``

