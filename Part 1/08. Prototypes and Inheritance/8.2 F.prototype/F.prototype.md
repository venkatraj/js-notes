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

```

This default prototype objects, makes it easy to create an object of same type, if we don't know its constructor. For example, let us say we have `rabbit` object, but not `Rabbit` constructor

```js
function Rabbit(name) {
  this.name = name;
}
let rabbit = new Rabbit("White Rabbit")

// In some other module, we are not aware of Rabbit constructor
// But we do have rabbit object and want to create another one
// We do this
let rabbit2 = new rabbit.constructor("Black Rabbit")
```

Please note that, JS doesn't not ensure correct value for `constructor` property. It can be overwritten and its entirely upon us to make sure it is not.

```js
// Wrong code, overwrites prototype object and remove constructor property
function Rabbit() {}
Rabbit.prototype = {
  jumps: true
};

let rabbit = new Rabbit();
alert(rabbit.constructor === Rabbit); // false

// Right way
function Rabbit() {}

// Not overwrite Rabbit.prototype totally
// just add to it
Rabbit.prototype.jumps = true
// the default Rabbit.prototype.constructor is preserved

// OR this way
Rabbit.prototype = {
  jumps: true,
  constructor: Rabbit
};

// now constructor is also correct, because we added it
```

## Exercises

### Changing "prototype"
In the code below we create new Rabbit, and then try to modify its prototype.

In the start, we have this code: