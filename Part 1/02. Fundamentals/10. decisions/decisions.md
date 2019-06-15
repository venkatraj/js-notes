# Decision Making
Two operators help us with decision making
* if statements
* conditional ternary operators

## `if` statments
The "if" statement gets a condition, evaluates it and, if the result is true, executes the code.
```js
let year = prompt('In which year was ECMAScript-2015 specification published?', '');
if (year == 2015) alert( 'You are right!' );
```
More than one statement should be wrapped in curly braces like this (is called block of statements)
```js
if (year == 2015) {
  alert( "That's correct!" );
  alert( "You're so smart!" );
}
```
This is recommended approach even for single statement. It improves readability and also future safe, meaning that if you want to add another statement, you don't have to modify structure

### Boolean conversion
The `if (…)` statement evaluates the expression in parentheses and converts it to the boolean type.

We have already seen type conversion and let's recall it once more.

* A number 0, an empty string "", null, undefined and NaN become false. Because of that they are called "falsy" values.
* Other values become true, so they are called "truthy".

## `else` clause
`if` block of statements executes when the condition is true. If we need some code to execute if the condition is false, then we'll use `else` block of statements
```js
let year = prompt('In which year was ECMAScript-2015 specification published?', '');

if (year == 2015) {
  alert( 'You guessed it right!' );
} else {
  alert( 'How can you be so wrong?' ); 
}
```

## Nested `if else`
```js
let year = prompt('In which year was ECMAScript-2015 specification published?', '');

if (year < 2015) {
  alert( 'Too early...' );
} else if (year > 2015) {
  alert( 'Too late' );
} else {
  alert( 'Exactly!' );
}
```

## Ternary operator
Sometime we need to perform a simple check where `if else` can be over kill
Consider this...
```js
let accessAllowed;
let age = prompt('How old are you?', '');

if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}

alert(accessAllowed);
```

All we want to check is whether the age is 18 or not and based on result we want to set a variable.
In such situations ternary operator comes in handy.
The syntax is:
```js
let result = condition ? value1 : value2;
```
The above example can be rewritten using ternary operator like this...
```js
let accessAllowed = age > 18 ? true : false;
```
Since all comparision operators return boolean values, it is possible to rewrite the above as this (but not recommended, remember explicit is better than implicit)
```js
let accessAllowed = age > 18;
```

## Nested ternary operator
It is possible to write nested ternary operator statement. Always remember to write code for someone else to be read and understand.
```js
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
```
--- 
### Tasks
Will `alert` be shown?
```js
if ("0") {
  alert( 'Hello' );
}
```
--- 
Ask web page visitor about "official" name of javascript? If the say "ECMAScript", appreciate them. If not, Nudge them and tell the correct answer
--- 
Asks web page visitor for number input, get them and alert them with allowing result
* 1, if the value is greater than zero,
* -1, if less than zero,
* 0, if equals zero.
--- 
Ask web site visitor for their name. If they say `Admin` asks for password. If they enter `WebMaster` display welcome message, other wise says it is wrong password. If they enter username other than `Admin` inform them that they are unknown user. Each stage (username/password) should have a cancel option.
--- 
Rewrite this using ternary operator
```js
if (a + b < 4) {
  result = 'Below';
} else {
  result = 'Over';
}
```
---
Rewrite this using ternary operator
```js
let message;

if (login == 'Employee') {
  message = 'Hello';
} else if (login == 'Director') {
  message = 'Greetings';
} else if (login == '') {
  message = 'No login';
} else {
  message = '';
}
```