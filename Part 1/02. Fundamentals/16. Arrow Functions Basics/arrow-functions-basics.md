## Arrow Functions
As *function expression*
```js
let func = function(arg1, arg2, ...argN) {
  return expression;
}
```
Same code as arrow function
```js
let func => (arg1, arg2, ...argN) = expression;
```
Multiline structure
```js
let sum = (a, b) = {
    let result = a + b;
    return result;
}
console.log(sum(10, 15)); // 25
```

```js
let sum = (a, b) => a + b; 

let sum = (a, b) => {
    let result = a + b;
    return result;
}

// single parameter arrow function can be written without parathesis
let greeting = name => console.log(`Hello, ${name}`);

// no parameters, parathesis necessary
let greeting = () => console.log('Hello, World!');

```