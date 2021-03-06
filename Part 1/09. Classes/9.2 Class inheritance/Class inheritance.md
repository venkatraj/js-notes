# Class inheritance
To extend a class and create a child class we use `extends`


## The `extends` keyword
```js

    class Animal {
        constructor(name) {
            this.speed = 0;
            this.name = name;
        }
        run(speed) {
            this.speed += speed;
            console.log(`${this.name} runs with speed ${this.speed}`);
        }
        stop() {
            console.log(`${this.name} stopped`);
        }
    }
    class Rabbit extends Animal {
        hide() {
            console.log(`${this.name} hides`);
        }
    }
    let rabbit = new Rabbit("White Rabbit");
    rabbit.run(5);
    rabbit.hide();

    // above is basically same as
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.run = function(speed) {
        this.speed += speed;
        console.log(`${this.name} runs with speed ${this.speed}`);
    };
    Animal.prototype.stop = function() {
        console.log(`${this.name} stopped`);
    };
    function Rabbit(name) {
        this.name = name;
        this.speed = 0;
    }
    Rabbit.prototype.hide = function() {
        console.log(`${this.name} hides`);
    };
    Rabbit.prototype.__proto__ = Animal.prototype;
    let rabbit = new Rabbit("White Rabbit");
    rabbit.run(5);
    rabbit.hide();

```

## Any expression is allowed after extends
```js

    function f(phrase) {
        return class {
            sayHi() { alert(phrase) }
        }
    }

    class User extends f("Hello") {}

    new User().sayHi(); // Hello

```

## Overriding method
To completely override a method, we just have to mention that method in child class
```js
    class Animal {
        stop() {
            // This won't be used if overridden
        }
    }

    class Rabbit extends Animal {
        stop() {
            // ...this will be used for rabbit.stop()
        }
    }
    
    let rabbit = new Rabbit();
    rabbit.stop();

```

If we want to extend functionality of parent method, then we have `super` keyword to access parent methods.
super.methodName() calls parent method
super() calls parent constructor (and should be used only in child constructor)

```js

    class Animal {
        constructor(name) {
            this.name = name;
        }
        stop() {
            this.speed = 0;
            alert(`${this.name} stopped.`);
        }
    }
    class Rabbit extends Animal {
        hide() {
            alert(`${this.name} hides!`);
        }
        stop() {
            super.stop(); // call parent stop
            this.hide(); // and then hide
        }
    }

    let rabbit = new Rabbit("White Rabbit");
    rabbit.stop(); // White Rabbit stopped. White rabbit hides!

```

### `super` in functions and arrow functions

Functions inside method can't access parent method. i.e. It has no access to `super`

With arrow functions, it is possible. Like `this` and `arguments` arrow functions don't have its own `super`, so it can be used.

```js

    class Rabbit extends Animal {
        start() {
            // Error: Unexpected super
            setTimeout(function() { super.start() }, 1000);
        }
    }

    class Rabbit extends Animal {
        stop() {
            // works fine
            setTimeout(() => super.stop(), 1000); 
        }
    }    

```

## Overriding constructor
If we don't override constructor in child class it is automatically generated internally.
```js

    class Rabbit extends Animal {
        // some other methods
    }

    // Above is same as below
    class Rabbit extends Animal {
        // generated for extending classes without own constructors
        constructor(...args) {
            super(...args);
        }
    }

```

If we want to extend the constructor, we can do so
```js

    class Animal {
        constructor(name) {
            this.speed = 0;
            this.name = name;
        }
        // ....
    }

    class Rabbit extends Animal {
        constructor(name, earLength) {
            super(name);
            this.earLength = earLength;
        }
        // ...
    }

    let rabbit = new Rabbit("White Rabbit", 10);
    alert(rabbit.name); // White Rabbit
    alert(rabbit.earLength); // 10

```
Please note that this won't work
```js
    class Animal {
        constructor(name) {
            this.speed = 0;
            this.name = name;
        }
        // ...
    }

    class Rabbit extends Animal {
        constructor(name, earLength) {
            this.speed = 0;
            this.name = name;
            this.earLength = earLength;
        }
        // ...
    }

    // Doesn't work!
    let rabbit = new Rabbit("White Rabbit", 10); 
    // Error: this is not defined.

```
To use `this` inside constructor we should call `super`
Why??
When we call a constructor function, it creates an object `this`, manipulates it and returns it.
```js

    function Animal(name) {
        // Happens behind the scene when function is called with new operator
        // this = {};
        this.name = name;
        // Happens behind the scene
        // return this;
    }

```
So when calling `Rabbit` it won't create a `this` object, because it is child class it suppose to be extend the `this` of parent class. So to achieve it and to have access to `this` we should use `super()` before accessing `this`

This prevention of creating `this` object in child constructor function is achieved with the help of a special internal property `[[ConstructorKind]]: "derived"`
So when the `ConstructorKind` is normal it creates an empty object as `this`
With derived `ConstructorKind` it doesn't do it. It expects parent constructor function to do this, so we need to invoke it using `super`.

## Super: internals, [[HomeObject]]
What is `super` refers? Since it calls parent method, the obvious guess it `this.__proto__`
```js

    let animal = {
        name: "Animal",
        eat() {
            alert(`${this.name} eats.`);
        }
    };

    let rabbit = {
        __proto__: animal,
        name: "Rabbit",
        eat() {
            // that's how super.eat() could presumably work
            this.__proto__.eat.call(this); // (*)
        }
    };

    rabbit.eat(); // Rabbit eats.

```
Our guess is correct, thanks to the above code. Note that we need to do
`this.__proto__.eat.call(this)` not `this.__proto__.eat()` 
Because we want to `eat` in the context of `rabbit` object not `rabbit.__proto__` object

But the below code prove that we are wrong.

```js

    let animal = {
        name: "Animal",
        eat() {
            alert(`${this.name} eats.`);
        }
    };
    let rabbit = {
        __proto__: animal,
        eat() {
            // ...bounce around rabbit-style and call parent (animal) method
            this.__proto__.eat.call(this); // (*)
        }
    };
    let longEar = {
        __proto__: rabbit,
        eat() {
            // ...do something with long ears and call parent (rabbit) method
            this.__proto__.eat.call(this); // (**)
        }
    };
    longEar.eat(); // Error: Maximum call stack size exceeded
```
But why?
In `longEar`, `this.__proto__.eat` is equal to `rabbit.eat` and we call it in the context of `longEar`

In `rabbit`, `this.__proto__.eat` is equal to `rabbit.eat` because `this` refers to `longEar` and `this.__proto__` refers to `rabbit` . Now we are calling `rabbit.eat` in the context of `longEar`

This makes `this.__proto__` of `rabbit.eat` equals to `rabbit.eat` itself and resulting in a never ended nested calls

### [[HomeObject]]
To overcome the above issue, JS adds another internal property [[HomeObject]].
**When a function is specified as a class or object method, its [[HomeObject]] property becomes that object.**
This is actually violates the idea of `unbound` functions. And since [[HomeObject]] property is internal we can't change that. It is bound forever.

But the change is safe and doesn't break compatibility. Besides this [[HomeObject]] is only used when using `super` keyword. `super` takes object from [[HomeObject]] and uses it.

```js

let animal = {
  name: "Animal",
  eat() {         // [[HomeObject]] == animal
    alert(`${this.name} eats.`);
  }
};
let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {         // [[HomeObject]] == rabbit
    console.log("Rabbit, super.eat is equal to this.__proto__.eat?");
    console.log(super.eat == this.__proto__.eat);
    console.log("Rabbit, super.eat is equal to rabbit.__proto__.eat?");
    console.log(super.eat == rabbit.__proto__.eat);
    console.log("Rabbit, super.eat is equal to animal.eat?");
    console.log(super.eat == animal.eat);
    super.eat();
  }
};
let longEar = {
  __proto__: rabbit,
  name: "Long Ear",
  eat() {         // [[HomeObject]] == longEar
    console.log("LongEar, super.eat is equal to this.__proto__.eat?");
    console.log(super.eat == this.__proto__.eat);
    super.eat();
  }
};
longEar.eat();  // Long Ear eats.

```
With `class` methods [[HomeObject]] property is added automatically. But with plain objects, we need to use new function shorthand syntax to have [[HomeObject]].
Consider this
```js
let animal = {
  eat: function() { // should be the short syntax: eat() {...}
    // ...
  }
};

let rabbit = {
  __proto__: animal,
  eat: function() {
    super.eat();
  }
};

rabbit.eat();  // Error calling super (because there's no [[HomeObject]])
```
Since these objects uses old syntax, there is no [[HomeObject]]. It should be like so

```js
let animal = {
  eat() { 
    console.log('Eat');
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
    super.eat();
  }
};

rabbit.eat(); // Now, it works
```

## Exercises

### Error creating an instance
Here's the code with Rabbit extending Animal.

Unfortunately, Rabbit objects can’t be created. What’s wrong? Fix it.

```js
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {
    this.name = name;
    // Comment out above line and use this 
    // super(name)
    this.created = Date.now();
  }
}

let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
alert(rabbit.name);
```

### Extended clock
```js
class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

class ExtendedClock extends Clock {
    constructor({template}) {
        super({template})
    }

    render() {
        super.render()
    }
}