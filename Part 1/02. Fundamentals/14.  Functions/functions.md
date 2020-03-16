# Functions
In our `switch` tutorial, we see how we can find Week Day's name based on its number. Such code blocks are useful throughout a large program to find day in a user friendly string rather than using numbers from 0 to 6.

If we write such block of code through out our program wherever it is needed, it becomes too bloated and hard to maintain.
For example, if we misspelled `Wednesday` as `Wenesday` then we need to modify it at all occurrences. To address such things, we can use functions. In simple terms `Functions` are block of code that has a name. You can execute that block of code, by calling that name.

We have already seen some built-in functions such as `console.log`, `prompt` and `confirm` we don't know the code behind it, but it works. 

We can also create our own user defined functions

## Function declaration
```js
function sayHello() {
    console.log('Hello!');
}
```

```js
function sayHello(name) {
    console.log(`Hello, ${name}!`);
}

sayHello('Venkat'); // Hello, Venkat!
sayHello('Sivakumar'); // Hello, Sivakumar!
sayHello('Premalatha') // Hello, Premalatha!
```
## Scopes
A local scope, outer scope and global scope
```js
let userName = 'John';

function showMessage() {
  let message = 'Hello, ' + userName;
  console.log(message);
}
showMessage(); // Hello, John
console.log(message); // Uncaught ReferenceError
```

```js
let userName = 'John';

function showMessage() {
  let userName = "Bob"; // declare a local variable

  let message = 'Hello, ' + userName; // Bob
  console.log(message);
}

// the function will create and use it's own userName
showMessage();

console.log( userName ); // John, unchanged, the function did not access the outer variable
```

## Parameters
```js
function showMessage(from, text) { // arguments: from, text
  console.log(from + ': ' + text);
}
showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)
```

```js
function showMessage(from, text) {
  from = '*' + from + '*'; // make "from" look nicer
  console.log( from + ': ' + text );
}

let from = "Ann";
showMessage(from, "Hello"); // *Ann*: Hello
// the value of "from" is the same, the function modified a local copy
console.log( from ); // Ann
```
### Default values
```js
function showMessage(from, text) {
  console.log( from + ": " + text );
}

showMessage("Ann"); // Ann: undefined
```

```js
function showMessage(from, text = "Hello") {
  console.log( from + ": " + text );
}

showMessage("Ann"); // Ann: Hello
```
### Old style default parameters
```js
function showMessage(from, text) {
  if (typeof text === "undefined") {
    text = 'no text given';
  }

  console.log( from + ": " + text );
}
```
OR "clever" one (what is the catch?)
```js
function showMessage(from, text) {
  // if text is falsy i.e. empty string then text gets the "default" value `no text given`
  text = text || 'no text given';
  ...
}
```

### Returning value
Say we want to calculate total marks of a students. This block of code is useful for all students of a class or even school.
So function is ideal usage for such problem. But it also needs to return total marks value, instead of just displaying total marks. Only then we can use it to find average marks from another function.
```js
function sum(a, b) {
  return a + b;
}

let result = sum(1, 2);
console.log( result ); // 3
```
Once the execution flow encounters `return` keyword, it stops executing that function and exits the function and return to where it is called. So, it is possible to have multiple `return` in a function
```js
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Got permission from parents?');
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  console.log( 'Access granted' );
} else {
  console.log( 'Access denied' );
}
```
It is possible to use return without a value. That causes the function to exit immediately.
It is useful in situations like there is no meaning to continue executing the function.
```js
function showMovie(age) {
  if ( !checkAge(age) ) {
    return;
  }

  console.log( "Showing you the movie" ); 
  // ...
}
```
**NOTE:** A function with an empty return or without it returns undefined
