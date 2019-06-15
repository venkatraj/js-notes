# Classes

The `class` construct is just a syntax sugar for prototype based classes

## The `Class` syntax
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

A `class` construct is not an object literal format and there is no comma betweenn methods.

Classes requires `new` operator to instantiate objects.

```js

    class User {
        constructor() {}
    }

    alert(typeof User); // function
    User(); // Error: Class constructor User cannot be invoked without 'new'

```

The `class User{...}` does following
1. Declares a variable `User` and it references to function `constructor`
2. Put methods in class definition into `User.prototype` object

```js

    class User {
    constructor(name) { this.name = name; }
    sayHi() { alert(this.name); }
    }

    // proof: User is the "constructor" function
    alert(User === User.prototype.constructor); // true

    // proof: there are two methods in its "prototype"
    alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi

```

### Class methods are non-enumerable

### Classes have a default constructor() {}
If there’s no constructor in the class construct, then an empty function is generated, same as if we had written constructor() {}

### Classes always use strict

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

## Only methods

With in a `class` construct there is no properties, all properties should go via methods and constructor function

```js

    class User {
        // Uncaught SyntaxError: Unexpected identifier
        let name;
        let age;
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }

    let subscriber = new User('John',21);
    console.log(subscriber);

    // Right one

    class User {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }

    let subscriber = new User('John',21);
    console.log(subscriber);

```

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
    alert( articles[0].title ); // Body

```

## Excercise 1
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