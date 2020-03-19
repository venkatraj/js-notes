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
With normal function constructor based prototypal inheritance, there is no connection between to constructor functions. Only objects created with it uses `__proto__` property to form inheritance chain.

But `class` construct also supports static methods. When using `extends` it adds a `[[Prototype]]` property to child class that reference parent class

```js

class Animal {}
class Rabbit extends Animal {}

// for static properties and methods
alert(Rabbit.__proto__ === Animal); // true
// that's in addition to the "normal" prototype chain for object methods
alert(Rabbit.prototype.__proto__ === Animal.prototype);

// and the next step is Function.prototype
alert(Animal.__proto__ === Function.prototype); // true

```

## Static methods
All methods in a class definition are put in prototype object. But if we want a method to be at class level (i.e. static methods), we can achieve it by using static keyword
```js

    class Article {
        constructor(title, date) {
            this.title = title;
            this.date = date;
        }
        static compare(articleA, articleB) {
            return articleA.date - articleB.date;
        }
    }

    // usage
    let articles = [
        new Article("Mind", new Date(2016, 1, 1)),
        new Article("Body", new Date(2016, 0, 1)),
        new Article("JavaScript", new Date(2016, 11, 1))
    ];

    articles.sort(Article.compare);
    console.log( articles[0].title ); // Body

```

## Static properties
*NOTE* Recent addition to javascript language
```js
class Article {
  static publisher = "Ilya Kantor";
}

console.log( Article.publisher ); // Ilya Kantor
```

## Inheritance of static properties and methods
Static properties and methods are inherited.

```js
class Animal {
  static planet = "Earth";

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }

}

// Inherit from Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbits = [
  new Rabbit("White Rabbit", 10),
  new Rabbit("Black Rabbit", 5)
];

rabbits.sort(Rabbit.compare);

rabbits[0].run(); // Black Rabbit runs with speed 5.

alert(Rabbit.planet); // Earth
```

So, Rabbit extends Animal creates two [[Prototype]] references:

1. Rabbit function prototypally inherits from Animal function.
2. Rabbit.prototype prototypally inherits from Animal.prototype.
As a result, inheritance works both for regular and static methods.

Here, let's check that by code:
```js
class Animal {}
class Rabbit extends Animal {}

// for statics
alert(Rabbit.__proto__ === Animal); // true

// for regular methods
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
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
