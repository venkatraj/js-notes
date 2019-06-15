# Methods of RegExp and String
There are 2 sets of methods to deal with RegExp
1. Comes with RegExp object itself.
2. There are some String methods that deal with RegExp

## str.search(reg)
Searches for the first occurence of regex pattern, returns index. Returns -1 if not found. There is no way to search next occurences.
```js
let str = "A drop of ink may make a million think";
console.log(str.search(/drop/)); // 2
```

## str.match(regex) w/o `g` flag
The `str.match(regex)` looks for the first match and returns an array with additional properties.
```js
let str = "Fame is the thirst of youth";
let result = str.match( /fame/i );
console.log( result[0] );    // Fame (the match)
console.log( result.index ); // 0 (at the zero position)
console.log( result.input ); // "Fame is the thirst of youth" (the string)
```
If the pattern is delimited by parathesis, then that match becomes another element in the array
```js
let str = "JavaScript is a programming language";

let result = str.match( /JAVA(SCRIPT)/i );

console.log( result[0] ); // JavaScript (the whole match)
console.log( result[1] ); // script (the part of the match that corresponds to the parentheses)
console.log( result.index ); // 0
console.log( result.input ); // JavaScript is a programming language
```

## str.match(reg) with “g” flag
Create an array of all matching elements without any additional parameters. It won't create additional array elements for parathesis delimits. When there is no match `null` returned
```js
let str = "HO-Ho-ho!";
let result = str.match( /ho/ig );
console.log( result ); // [HO, Ho, ho] (all matches, case-insensitive)

result = str.match( /h(o)/ig );
console.log( result ); // [HO, Ho, ho]

result = str.match(/hey/gi);
console.log(result); // null
```

## str.split(regexp|substr, limit)
We already know that we can use String's `split` method to split a string into an array like so
```js
let words = "Hello How are you?".split(' ');
console.log(words); // [Hello, How, are, you?]
```

We can also use a RegExp to determines where to split the string like so
```js
let phoneNumber = "91-98765-43210";
let numberGroups = phoneNumber.split(/-/);
console.log(numberGroups); // [91, 98765, 43210]
```

## str.replace(str|reg, str|fun)
String replace method will search for given string or regex and replaces them with second parameter string. Like `.search` method it won't replace all occurences
```js
// replace a dash by a colon
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

You can do so, by using regex
```js
// replace all dashes by a colon
alert( '12-34-56'.replace( /-/g, ":" ) )  // 12:34:56
```
In addition to literal string as 2nd parameters we can also use special characters that has special meansing
$$	"$"
$&	the whole match
$`	a part of the string before the match
$'	a part of the string after the match
$n	if n is a 1-2 digit number, then it means the contents of n-th parentheses counting from left to right

Let's see examples
```js
let str = "John Doe, John Smith and John Bull.";

// for each John - replace it with Mr. and then John
alert(str.replace(/John/g, 'Mr.$&'));
// "Mr.John Doe, Mr.John Smith and Mr.John Bull.";

let str = "John Smith";

alert(str.replace(/(John) (Smith)/, '$2, $1')) // Smith, John
```

2nd parameter can also be a mapping fuction
```js
let i = 0;

// replace each "ho" by the result of the function
alert("HO-Ho-ho".replace(/ho/gi, function() {
  return ++i;
})); // 1-2-3

alert("HO-Ho-ho".replace(/ho/gi, function(match, offset, str) {
  console.log(offset);
  console.log(str)
  return `${match.toLowerCase()}${++i}`;
})); // ho4-ho5-ho6 
```
Mapping function arguments varies depends on regex.
If no parathesis `()` is used in regex then the arguments are
1. match - matched string `ho` in the above case
2. offset - offset of match. 0, 3, 6 in the above case
3. str - the whole string `HO-Ho-ho` in the above case

If parathesis are present in the regex then the arguments are...
1. match
2. p1
3. p2 and so on. content in parathesis pair 1, 2 ... n
Finally `offset, str)

Let's say we want to transform `John Smith` into `Smith, John`.
To do this we need to catch `firstName` and `lastName` and the switch its position and separated by `,`
```js
let name = 'John Smith';
let result = name.replace(/(John) (Smith)/gi, (match, firstName, lastName, offset, str) => {
  return `${lastName}, ${firstName}`;
});
console.log(result); // Smith, John
```
## RegExp methods
### `test` method
It looks for match and returns true/false. It is basically same as `str.search(substr) !== -1`
```js
let str = 'I lova javascript';
console.log(/javascript/i.test(str)); // true
console.log(str.search(/javascript/) !== -1); // true

console.log(/typescript/i.test(str)); // false
console.log(str.search(/typescript/i) !== -1); // false
```

### regexp.exec(str)
Before getting into the details of `.exec` method, let's recap what we have learnt so far.
With string methods
`search` returns the position of first match. Can't handle all occurences
`match` - w/o `g` flag. returns an array of match with special properties. index `0` has matched string `1` and so on will have parathesis matches
`match` - with `g` flag. returns an array of all matches w/o additional properties

- `exec` method w/o `g` flag behaves sames as `str.match`. i.e. returns first match
- with `g` flag it returns the first match and also it remebers the position with `lastIndex` property. Subsequent call to `exec` returns next match and update to `lastIndex` property. When no more match is found `null` returned and `lastIndex` property set to `0`

```js
let lang = 'learn a lot about javascript at http://javascript.info';

let firstJS = /javascript/gi.exec(lang);
console.log(firstJS[0]); // javascript
console.log(firstJS.index); // 18
console.log(firstJS.input); // whole string


let lang = 'learn a lot about javascript at http://javascript.info';
const regex = /java(script)/gi;
let firstJSWithB = regex.exec(lang);
console.log(firstJSWithB[0]); // javascript
console.log(firstJSWithB[1]); // script
console.log(firstJSWithB.index); // 18
console.log(regex.lastIndex); // 28
console.log(firstJSWithB.input); // whole string

let secondJSWithB = regex.exec(lang);
console.log(secondJSWithB[0]); // javascript
console.log(secondJSWithB[1]); // script
console.log(secondJSWithB.index); // 39
console.log(regex.lastIndex); // 49
console.log(secondJSWithB.input); // whole string

let noMatch = regex.exec(lang);
console.log(noMatch); // null
console.log(regex.lastIndex); // 0
```

The above code is to understand which can be written as
```js
let lang = 'learn a lot about javascript at http://javascript.info';

let regexp = /java(script)/gi;
let result = null;
while(result = regexp.exec(lang)) {
  console.log(result[0]); // javascript
  console.log(result[1]); // script
  console.log(result.index); // 18 for first match and then 28
  console.log(regexp.lastIndex); // 39, 49
}
```

We can also start search with specified position
```js
let str = 'A lot about JavaScript at https://javascript.info';

let regexp = /javascript/ig;
regexp.lastIndex = 30;

alert( regexp.exec(str).index ); // 34, the search starts from the 30th position
```

## The `y` flag
Using `y` flag limits the search to given position. It won't look for any other position, just given position
```js
let str = "I love JavaScript!";

let reg = /javascript/iy;

alert( reg.lastIndex ); // 0 (default)
alert( str.match(reg) ); // null, not found at position 0

reg.lastIndex = 7;
alert( str.match(reg) ); // JavaScript (right, that word starts at position 7)

// for any other reg.lastIndex the result is null
```
```js
let [a, op, b] = parse("1.2 * 3.4");

alert(a); // 1.2
alert(op); // *
alert(b); // 3.4

function parse(str) {
  let result = [];
  let matches = str.match(/(-?\d+\.?\d+)(\s?[-+*/]\s?)(-?\d+\.?\d+)/);
  result.push(matches[1]);
  result.push(matches[2]);
  result.push(matches[3]);
  return result;
}
```