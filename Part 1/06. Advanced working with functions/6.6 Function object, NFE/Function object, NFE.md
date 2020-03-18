# Function object, NFE

In javascript function are objects. Like any other objects, you can add / remove properties, pass by reference and do other activities with functions too.

## The "name" property
By default, every function has a `name` property which returns the name of the function. This is true not only for function declaration but for function expressions too
```js

  function sayHi() {
    console.log("Hi");
  }
  console.log(sayHi.name); // sayHi


  let sayHi = function() {
    console.log("Hi");
  }
  console.log(sayHi.name); // sayHi (works!)


  function f(sayHi = function() {}) {
    console.log(sayHi.name); // sayHi (works!)
  }
  f();

```

Object methods have names too
```js

  let user = {

    sayHi() {
      // ...
    },

    sayBye: function() {
      // ...
    }

  }

  console.log(user.sayHi.name); // sayHi
  console.log(user.sayBye.name); // sayBye

```

However anonymous functions don't have a name.

```js

  // function created inside array
  let arr = [function() {}];

  console.log( arr[0].name ); // <empty string>
  // the engine has no way to set up the right name, so there is none

```

## The "length" property.
Functions has another built-in propety `length` which returns the no. of arguments in the function declaration.
```js

  function f1(a) {}
  function f2(a, b) {}
  function many(a, b, ...more) {}

  console.log(f1.length); // 1
  console.log(f2.length); // 2
  console.log(many.length); // 2

```
`rest` parameter is NOT counted.

This can be used to replicate `polymorphism` in javascript. In below example, the functions called depends on its length (no. of arguments). If there is positive response (ok), then both handlers are called. For negative response (cancel) only the second handler is called.

```js

  function ask(question, ...handlers) {
    let isYes = confirm(question);

    for(let handler of handlers) {
      if (handler.length == 0) {
        if (isYes) handler();
      } else {
        handler(isYes);
      }
    }

  }

  // for positive answer, both handlers are called
  // for negative answer, only the second one
  ask("Question?", () => console.log('You said yes'), result => console.log(result));

```

## Custom properties
We can add our own properties to functions
```js

  function sayHi() {
    console.log("Hi");

    // let's count how many times we run
    sayHi.counter++;
  }
  sayHi.counter = 0; // initial value

  sayHi(); // Hi
  sayHi(); // Hi

  console.log( `Called ${sayHi.counter} times` ); // Called 2 times

```
*NOTE*: function properties and variables declared inside of a function are totally different things. They have no relationship.

You can use function properties as an alternative to closure.
```js

  function makeCounter() {
    // instead of:
    // let count = 0

    function counter() {
      return counter.count++;
    };

    counter.count = 0;

    return counter;
  }

  let counter = makeCounter();
  console.log( counter() ); // 0
  console.log( counter() ); // 1

```
The difference is in closure, the `count` live in outer Lexical Environments where as property live in itself. With closure, `count` can't be modified by outer code. Only nested functions can modify it. But with properties it is possible
```js

  function makeCounter() {

    function counter() {
      return counter.count++;
    };

    counter.count = 0;

    return counter;
  }

  let counter = makeCounter();

  counter.count = 10;
  console.log( counter() ); // 10

```
So the choice of use is depends on context.

## Named function expression
Also called NFE is a function expression with a name.
Here we assign an anonymous function to a variable
```js

  // Function expression
  let sayHi = function(who) {
    console.log(`Hello, ${who}`);
  };

  // Named function expression
  let sayHi = function func(who) {
    console.log(`Hello, ${who}`);
  };

```
Often times it is difficult to debug anonymous functions as we have no idea where the bug is coming from. Alternate to that is to use a NFE
```js
let sayHi = function func(who) {
  console.log(`Hello, ${who}`);
};
```
Another advantage of using NFE is that you can call the function itself (recursive call). Consider the following examples.
```js
let sayHi = function func(who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    func("Guest"); // use func to re-call itself
  }
};

sayHi(); // Hello, Guest

// But this won't work:
func(); // Error, func is not defined (not visible outside of the function)

// Same is possible with anonymous function expressions
let sayHi = function(who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    sayHi("Guest");
  }
};

// But fails when sayHi no longer holds reference
let sayHi = function(who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    sayHi("Guest"); // Error: sayHi is not a function
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error, the nested sayHi call doesn't work any more!

// NFE works in this situation

let sayHi = function func(who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    func("Guest"); // Now all fine
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (nested call works)

```

## Exercises

### Set and decrease the counter
```js
function makeCounter() {
      function counter() {
        console.log(counter.count++)
      }
      counter.count = 0;

      counter.set = function (value) {
        counter.count = value;
      }

      counter.decrease = function () {
        counter.count--;
      }

      return counter;

    }


    let myCounter = makeCounter();

    myCounter()   // Displays 0, increments to 1
    myCounter()  // Displays 1, increments to 2
    myCounter.set(5) // Sets to 5
    myCounter() // Displays 5, increments to 6
    myCounter.decrease() // Decrements to 5
    myCounter.decrease() // Decrements to 4
    myCounter() // Displays 4, increments to 5
```


### Sum with an arbitrary amount of brackets
```js
// sum(1)(2) == 3; // 1 + 2
// sum(1)(2)(3) == 6; // 1 + 2 + 3
// sum(5)(-1)(2) == 6
// sum(6)(-1)(-2)(-3) == 0
// sum(0)(1)(2)(3)(4)(5) == 15

function sum(a) {
  currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
      return currentSum;
  };

  return f;
}
console.log(String(sum(5)(-1)(2)))
```