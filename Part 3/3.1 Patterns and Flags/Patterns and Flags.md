# Patterns and Flags
Regular Expressions are powerful way of searching and replacing a string. Its implementation details vary between programmming languages but still there's a lot in common

## Regular Expressions
There are 2 syntaxes for creating regular expression objects in JS.
1. Long syntax
```js
const regexp = new RegExp('pattern', 'flags');
```
2. Short Syntax
```js
const regexp = /pattern/g; 
```
### Usage
We'll mostly use short syntax, but long syntax is useful when the pattern is dynamic such as this
```js
let search = prompt("What you want to search?", "love");
let regexp = new RegExp(search);

// find whatever the user wants
alert( "I love JavaScript".search(regexp));
```
Consist of two parts
1. Pattern
2. Flags

#### Pattern
This determines what we are searching for
```js
let str = "I love JavaScript!"; // will search here

let regexp = /love/;
alert( str.search(regexp) ); // 2
```
Here `/love/` is simplest pattern. `search` method of string uses this pattern to match the string and returns its index.

#### Flags
This determines how the search should behave. This means that should the search be case sensitive, look for all occurances, etc
There are 5 flags in JS
`i`
Used for case insensitive search
`g`
Looks for all occurences w/o it only first occurence will be taken in to account.
`m`
Multiline mode
`u`
Unicode support. Used for string that are made up of surrogate pairs
`y`
Sticky mode


##### `i` Flag
```js
let str = "I love JavaScript!";

// -1 (not found, because of case sensitivity)
alert( str.search(/LOVE/) ); 
alert( str.search(/LOVE/i) ); // 2 (found, case insensitive)
```