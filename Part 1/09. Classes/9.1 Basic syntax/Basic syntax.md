# Classes

We can create many objects of same type using `Constructor` Functions. Modern javascript has a advanced `class` construct for this. But it is still prototype based one.

## The `Class` syntax
```js
class MyClass {
  // class methods
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

```js

    // Prototype based class syntax
    function User(name) {
        this.name = name;
    }
    User.prototype.sayHi = function() {
        alert(this.name);
    }
    let user = new User("John");
    user.sayHi();

    // Class construct
    class User {
        constructor(name) {
            this.name = name;
        }
        sayHi() {
            alert(this.name);
        }
    }
    let user = new User("John");
    user.sayHi();

```

A `class` construct is not an object literal format and there is no comma between methods.

Classes requires `new` operator to instantiate objects.

```js

    class User {
        constructor() {}
    }

    alert(typeof User); // function
    User(); // Error: Class constructor User cannot be invoked without 'new'

```

The `class User{...}` does following
1. Creates a function named `User` and its function code is taken from `constructor` method
2. Put methods (like sayHIi) of class definition into `User.prototype` object

```js

class User {
    constructor(name) { 
        this.name = name; 
    }
    
    sayHi() { 
        console.log(this.name); 
    }
}

// proof: User is the "constructor" function
console.log(User === User.prototype.constructor); // true

// proof
console.log(typeof User); // function

// proof: there are two methods in its "prototype"
console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## Not just a syntactic sugar

There are important differences.

1. First, a function created by class is labelled by a special internal property 
[[FunctionKind]]:"classConstructor". 
So it’s not entirely the same as creating it manually.

And unlike a regular function, a class constructor must be called with new:
```js
class User {
  constructor() {}
}

console.log(typeof User); // function
User(); // Error: Class constructor User cannot be invoked without 'new'
```

Also, a string representation of a class constructor in most JavaScript engines starts with the “class…”
```js
class User {
  constructor() {}
}

console.log(User); // class User { ... }
```

2. Class methods are non-enumerable. A class definition sets enumerable flag to false for all methods in the "prototype".

That’s good, because if we for..in over an object, we usually don’t want its class methods.

3. Classes always use strict. All code inside the class construct is automatically in strict mode.

### Classes have a default constructor() {}
If there’s no constructor in the class construct, then an empty function is generated, same as if we had written constructor() {}

## Class Expression
Just like functions, classes can be defined inside another expression, passed around, returned etc.

Here's a class-returning function ("class factory"):

```js

    function makeClass(phrase) {
        // declare a class and return it
        return class {
            sayHi() {
                alert(phrase);
            };
        };
    }

    let User = makeClass("Hello");
    new User().sayHi(); // Hello

```

### Named Class Expression(?)
```js

    // "Named Class Expression" (alas, no such term, but that's what's going on)
    let User = class MyClass {
        sayHi() {
            alert(MyClass); // MyClass is visible only inside the class
        }
    };

    new User().sayHi(); // works, shows MyClass definition
    alert(MyClass); // error, MyClass not visible outside of the class

```

## Getters/setters

```js

    class User {
        constructor(name) {
            // invokes the setter
            this.name = name;
        }
        get name() {
            return this._name;
        }
        set name(value) {
            if (value.length < 4) {
            alert("Name is too short.");
            return;
            }
            this._name = value;
        }
    }

    let user = new User("John");
    alert(user.name); // John
    user = new User(""); // Name too short.

```

## Class Properties

With in a `class` construct there is no properties, all properties should go via methods and constructor function. But recently there can be class properties outside constructor function

```js
    class User {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }

    let subscriber = new User('John',21);
    console.log(subscriber);

    class User {
        // NOTE there is not `let` or `var`
        name;
        age;
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }

    let subscriber = new User('John',21);
    console.log(subscriber);
```

## Exercise 1
```js
class Clock {
    constructor(template) {
        console.log(typeof template);
        console.log(template);
        this._template = template;
    }

    _render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this._template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        console.log(output);        
    }

    stop() {
        clearInterval(this._timer);
    }

    start() {
        this._render();
        this._timer = setInterval(() => this._render(), 1000);
    }
}

let myClock = new Clock('h:m:s');
myClock.start();

```