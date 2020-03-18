# Global Object
Every ECMAScript environment has a global object that has built in variables and functions. It is available through out the script.

In browser env. it is called `window` and in node js env. it is called `global`. Recently, language specification added `globalThis` as global object which should be supported by all env.

```js
alert('Hi');
// is same as 
window.alert('Hi');
```

In browser, variables declared with `var` becomes global object properties and functions as well. But let and const will not become global properties

```js
var varTest = 'Var Test'
let letTest = 'Let Test';
const constTest = 'Const Test';
function sayHi() {
  console.log('Say Hi');
}
sayHi(); // Say Hi
window.sayHi();  // Say Hi
console.log(window.varTest);  // Var Test
console.log(window.letTest);  // undefined
console.log(window.constTest); // undefined

```

It is possible to create properties on global object directly. In old code, it is used to make some data available through out the code. But it is not needed as from ES6 onwards we have `modules` and import/export

```js
// make current user information global, to let all scripts access it
window.currentUser = {
  name: "John"
};

// somewhere else in code
alert(currentUser.name);  // John

// or, if we have a local variable with the name "currentUser"
// get it from window explicitly (safe!)
alert(window.currentUser.name); // John
```

## Using for polyfills

We can use the global object to test whether current env. supports certain language features such as `Promises`

```js
if (!window.Promise) {
  alert("Your browser is really old!");
}

// Or even write our own version of Promise
if (!window.Promise) {
  window.Promise = ... // custom implementation of the modern language feature
}
```
