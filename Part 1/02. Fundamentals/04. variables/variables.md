# Variables
Programming is all about processing information / data.

An online shop needs to handle product information, price, tax, shipping, customers address, payment mode, etc

A chat application needs to handle text messages, images and video

A variable is a named storage for data and that data keeps changing its value as program flows and processes data.

When we talk about our savings, we might say `bank balance` We don't tell the exact amount literally, because it keeps  changing every day. A bank balance on 1st day of month is not the same as last day of the month. Similarly a data in a program is not same at the start, in the middle and at the end. It keeps varying, so we name the data and store it in a place.

Similarly we name values that don't change at all. For example, we say `Birthday` rather than exact date. Because it is easy to use and remember. Such are called constants.

### Creating variables
There are 3 ways to create a variable in javascript.
* var
* let
* const

We will use `let` in most of our programs. `var` is similar to `let` but is old standard. We will see the difference between `var` and `let` later, but for now let's use `let`

### To create a variable (also called **declare** or **define**) we write like this
```javascript
let greeting
```
### Declare and then assign
```javascript
let greeting;
greeting = 'Hello, World!';
```
### Declare and initialize
```javascript
let greeting = 'Hello, World!';
```

### Using variables
```javascript
let greeting = 'Hello, World!';
console.log(greeting);
```
### Multiple declarations
```javascript
let name = 'Venkat';
let age = 21; // Wish I'm either 21 or I was wise as I'm now @ 21
let message = 'Hello, World!';
```
#### Another way
```javascript
let name = 'Venkat', age = 21, message = 'Hello, World!';
```
#### Preferred style
```javascript
let name = 'Venakt',
    age = 21,
    message = 'Hello, World!';
```
### Overwriting and Processing
```javascript
let message = 'Hello, World!';
message = 'Hello, JavaScript!'; // Overwriting
message = message.toUpperCase(); // Processing
```

### Copying variable
```javascript
let message = 'Hello, World!';
let greeting;
greeting = message;
```

## Variable naming rules
* Should start with any alphabet or `$` or `_`. Can't start with numerals
* Rest of the name can contain alphanumerals and `$` and `_`

### Valid names

```javascript
let userName;
let test123;
let $ = 1; // declared a variable with the name "$"
let _ = 2; // and now a variable with the name "_"
alert($ + _); // 3
let имя = '...'; // Non english characters allowed, not recommended
let 我 = '...'; // Non english characters allowed, not recommended
num = 5; // the variable "num" is created if didn't exist (if you don't use strict mode) Error thrown if you use strict mode
let myFirstName = 'Venkat'; // Common practice to use camelCase for multiple words
let apples = 'Good for health';
let Apples = 5; // Both apples and Apples exists. JS is case sensitive.
```

### Invalid variable names:

```javascript
let 1a; // cannot start with a digit
let my-name; // a hyphen '-' is not allowed in the name
let return = 10; // Invalid can't use keywords / reserved words
```
## constants
Constants are immutable variables meaning that it can't be reassigned with a value
```javascript
const PI = 3.14;
const myBirthday = '01.01.2000';
myBirthday = '01.01.1997'; // Throws error
```
it is common practice to declare a constant in capital letters to hold values that aren't easy to remember and hard coded in script. Immutable means it can't be reassigned, but it is possible to change the value it holds in certain data types which we will see later. 
