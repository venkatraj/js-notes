# Function expressions and arrows
In JavaScript, a function is not a “magical language structure”, but a special kind of value. Functions are objects.

*Function delaration:*
```js
function sayHi() {
    alert( "Hello" );
}
sayHi(); // Executes function code
alert(sayHi); // Shows function code, just like any other variable
```

*Function Expression:*
```js
let sayHi = function() {
    alert( "Hello" );
}; // Why is a `;` here?

let sayHello = sayHi;
sayHello();
```

## Callback functions
```js
let yes = function() {
    console.log('You have to learn JS');
}

let no = function() {
    console.log('Seriously? Good luck!');
}

function ask(question, ok, cancel) {
    if (confirm(question)) {
        ok();
    } else {
        cancel();
    }
}
ask('You want to be a Front End Developer?', yes, no);
```
The arguments of `ask` are called *callback functions* or just *callbacks*.

## Anonymous Functions
```js
function ask(question, ok, cancel) {
    if (confirm(question)) {
        ok();
    } else {
        cancel();
    }
}

ask(
    'You want to be a Front End Developer?',
    function() {
        console.log('You have to learn JavaScript');
    },
    function() {
        console.log('Seriously? Good luck!');
    }
);
```

## Difference between Function declaration and function expression

```js
sayHello('JavaScript');
function sayHello(name) {
    console.log(`Hello, ${name}`);
} 

sayHi('TypeScript');
let sayHi = function(name) {
    console.log(`Hi, ${name}`);
}
sayHi('React');
```
**When a Function Declaration is made within a code block, it is visible everywhere inside that block. But not outside of it.**
NOTE: "use strict";
```js
"use strict"
let age = prompt("What is your age?", 18);

// conditionally declare a function
if (age < 18) {
  function welcome() {
    console.log("Hello!");
  }
} else {
  function welcome() {
    console.log("Greetings!");
  }
}

// ...use it later
welcome(); // Error: welcome is not defined
```
