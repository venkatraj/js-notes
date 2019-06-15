# Data Types
There are 7 basic data types in JavaSctipt.
* Number
* String
* Boolean
* null
* undefined
* Object
* Symbol

## Number Type
Handles both integer and floating point numbers
```js
let quantity = 10;
let price = 99.00;
```
It also has `special numberic values` such as `Infinity`,
`-Infinity` and `NaN`

`Infinity` is equal to mathematical Infinity which means greater than any number. You shouldn't ask what is `-Infinity`, this is javascript.
```js
console.log(1/0); // Infinity
console.log(Infinity); // Infinity
```

`NaN` stands for `Not a Number`, but it still belongs to `Number` type. (This is JS) `NaN` is the result of mathematical operation that doesn't result in a Number.
```js
console.log("name"/2); // Results in NaN. Did you expect first name?
```
Any operation that includes a `NaN` will result in `NaN`
```js
console.log("name"/2 + 2); // NaN
```

## String
A string value is quoted in JS
3 Types of quotes in JS
* Double Quotes `"JS"`
* Single Quotes `'JS'`
* Backticks <code>&#96;JS&#96;</code>

There is no difference between double and single quotes in JS. Both are just quotes.

Backticks are used to embed variables into a string. Old way of doing this is
```js
var language = 'JavaScript';
var learning_curve = 'Difficult';
console.log(language + ' is ' + learning_curve + ' to learn');
```

Let's do it in modern way
```js
var language = 'JavaScript';
var learning_curve = 'Difficult';
console.log(`${language} is ${learning_curve} to learn`);
```
You can also use expressions
```js
console.log(`Square of 3 is ${3 * 3}`);
```

## Booleans
Have only two values: `true` and `false`
Used for checks. Logical operations always results in boolean values.

```js
let isPassed = true;
let isDistinction = false;
let age = 17;
let isAdult = age > 18;
console.log(isAdult); // false
```
## null
Has only one value: `null`
Means `nothing`, `empty` and `unknow value`

## undefined
Has only one value: `undefined`
When a variable is declared but not intialized or assigned a value, then it is `undefined`

## Objects & Symbols
All the above types are primitive types. Objects and Symbols are reference type which we will learn later.

## Finding Data Type
JavaScript is dynamically typed meaning that there are data types but variables are not bind to any type.
In other words, a variable can hold number data type, and then it can hold string data type. No issues.

These may leave us wondering on what data type we are handling? For example
```js
let num1 = 1;
let num2 = 2;
console.log(num1 + num2); // 3
num1 = "1";
num2 = 2;
console.log(num3 + num4); // 12
```
So to find out the data type we are dealing with, we use `typeof`. It comes in 2 flavour
* Operator style: `typeof num1`
* Function style: `typeof(num2)`

```js
var num;
typeof num; // "undefined"
typeof 0 // "number"
typeof 10 > 5; // "boolean"
typeof true; // "boolean"
typeof "foo" // "string"
typeof Symbol("id") // "symbol"
typeof Math // "object"  (1)
typeof null // "object"  (2)
typeof alert // "function"  (3)
```

1. Math is built in object and has several math related functionality
2. `null` is not an object. It is separate type. This is error in language kept for backward compatibility
3. `function` is not a data type. All functions are objects, but it returns `function` for convenience.

