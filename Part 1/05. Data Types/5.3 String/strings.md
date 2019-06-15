# Strings
There is no char type in JS.
The internal format for string is always UTF-16 and is not tied to page encoding.

## Quotes
There are 3 types of quotes
* Single Quote
* Double Quote
* Backticks
There is no difference between single and double quotes. You can choose whatever you prefer. In practice, if there is single quotes in the lieterals then double quote is choosed and vice versa.

```js

    let single = 'He said "I am ready"';
    let double = "I'm a Front End Developer";

```

### Backticks
This allows as to embed variables and expressions in a string.
```js

    let language = 'JavaScript';
    function sum(num1, num2) {
        return num1 + num2;
    }

    // New, Backticks way
    console.log(`${language} is easy to use`);
    console.log(`10 + 20 is = ${sum(10,20)}`);

    // Old way
    console.log(language + ' has a steep learning curve');
    console.log("10 + 20 is = " + sum(10, 20));



```
It also allows multiline strings
```js

    let guestList = `Guests:
    * HTML
    * CSS
    * JavaScript
    `;
    console.log(guestList);

    // Old way
    let guestList1 = "Guests: \n*HTML \n*CSS \n*JavaScript \n";
    console.log(guestList1);

    // Error SyntaxError: Invalid or unexpected token
    let guestList2 = "Guests:
    * Who?";

    console.log(guestList2);

```

## Special characters
Characters such as new line `\n` are called special characters.
Backspace `\b`
Form feed `\f`
New line `\n`
Carriage return `\r`
Tab `\t`
A unicode `\uNNNN` e.g. `\u00A9` mean &copyright;
Two Unicode `\u{NNNNNNNN}`

```js 

    console.log( "\u00A9" ); // ©
    console.log( "\u{20331}" ); // 佫, a rare chinese hieroglyph (long unicode)
    console.log( "\u{1F60D}" ); // 😍, a smiling face symbol (another long unicode)

```

### Escape character

To enter single quote in a single quoted string literal, we need to escape it with the help of `\`. To add a `\` in a string literal, we need to escape it with additional `\`

```js

    console.log( 'I\'m the Walrus!' ); // I'm the Walrus!
    console.log( 'The backslash: \\' ); // The backslash: \

```

It is possible to use backticks like so without the use of escape character

```js

    console.log(`I'm the Walrus!`);

```

But you still need `\\` for displaying backslashes


## String length
String has a `length` property. This is the same wrapper object operation that we saw with Number type

```js
    
    console.log(`My\n`.length); // 3

```

## Accessing Characters.
You can access a character in a string using its position. There are two methods we can use for this purpose. One is square brackets `[pos]` and another is old `str.charAt(pos)`

```js

    let str = `Hello`;

    // the first character
    console.log( str[0] ); // H
    console.log( str.charAt(0) ); // H

    // the last character
    console.log( str[str.length - 1] ); // o

```

### Difference between `[pos]` and `.charAt(pos)`
```js

    let str = `Hello`;
    console.log( str[1000] ); // undefined
    console.log( str.charAt(1000) ); // '' (an empty string)

```

### `for..of`
```js

    let greeting = "Hello";
    for(let char of greeting) {
        console.log(char); // H,e,l,l,o
    }

```

## Strings are immutable
When we call a variable is immutable (`const`), we can't reassign a value to that variable.
When we say strings are immutable, the string itself can't be changed. i.e. you can't reassign a char with another char
```js

    "use strict"
    let str = 'Hi';
    str[0] = 'h'; // TypeError when used with "use strict" otherwise fails silently
    console.log(str[0]); // Still 'H' in non strict mode

```

To make the above possible, you need to do so
```js

    let str = 'Hi';
    str = 'h' + str[1];
    console.log(str);

```

Please note that the variable `str` is mutable because it is declared using `let` not `const`
So we can reassign value to `str`. Here we take `h` and concatenate it with `str[1]` which is `i` and stores it in `str`.
That means that we are creating a new string value and store it in a mutable variable, not changing the string itself.

## Changing cases
Two methods are available to change cases `toLowerCase()` and `toUpperCase()`

```js

    let lang = 'Javascript';
    console.log(lang.toLowerCase()); // javascript
    console.log(lang.toUpperCase()); // JAVASCRIPT
    console.log(lang); // Javascript
    // Since these methods available on all string, it works for single char strings as well
    console.log(lang[4].toUpperCase()); // S

```

## Searching for a substring
There are multiple ways to look for a substring in a string
### str.indexOf
To find out whether the substring "World!" is present in "Hello, World!" or not, you'll use `str.indexOf(substr, pos)`
```js

    let greeting = "Hello, World!";
    console.log(greeting.indexOf('World!')); // 7 because 'W' is at possion 7
    console.log(greeting.indexOf('world!')); // -1 because indexOf is case sensitive
    console.log(greeting.indexOf('World!', 8)); 
    // -1 because search starts at position 7 and there is no 'World!' beyond it
    console.log(greeting.indexOf('o', 5)); // 8 ignoring 'o' at position 4

```
Find out no. of `as` in `let str = 'As sly as a fox, as strong as an ox';`

```js

    let str = 'As sly as a fox, as strong as an ox';
    let asCount = 0;
    let position = str.toLowerCase().indexOf('as');
    while(-1 !== position) {
        asCount++;
        position = str.toLowerCase().indexOf('as', position+1); 
        // +1 is important, we want to look forward
        // Otherwise it will be infinite loop
    }

    console.log(asCount);

```
**str.lastIndexOf(str, pos)**

```js

    let str = "Widget with id";
    // 12, because search starts from the end
    console.log(str.lastIndexOf('id')); 

    // 12 because search starts from the end. index 12 is end of string
    console.log(str.lastIndexOf('id', 12)); 

    // 12 Because search starts from the end determined by length property
    console.log(str.lastIndexOf('id', str.length));

    // 1 Because 'id' present at index 1 and (backward) search start from index 2 
    console.log(str.lastIndexOf('id', 2));

    // -1 Because there were no 'id' after (backward) index 0
    console.log(str.lastIndexOf('id', 0));

```

Explain why this doesn't work
```js

    let str = "Widget with id";

    if (str.indexOf("Widget")) {
        alert("We found it"); // doesn't work!
    }

```
Correct form
```js

    let str = "Widget with id";

    if (-1 !== str.indexOf("Widget")) {
        alert("We found it"); // Works!!
    }

```    

### includes, startsWith, endsWith
These methods returns true or false
`includes` returns true, if substring is found, false otherwise
`startsWith` returns true, if substring is at start, false otherwise
`endsWith` returns true, if substring is at the end, false otherwise

```js

    console.log( "Widget with id".includes("Widget") ); // true
    console.log( "Hello".includes("Bye") ); // false
    console.log( "Midget".includes("id") ); // true
    console.log( "Midget".includes("id", 3) ); // false, from position 3 there is no "id"
    console.log( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid"
    console.log( "Widget".endsWith("get") );   // true, "Widget" ends with "get"

```

## Getting a substring
* slice
* substring
* substr

### Slice
```js

    let str = 'stringify';
    console.log(str.slice(2));      // ringify
    console.log(str.slice(0,5));    // strin
    console.log(str.slice(0,1));    // s
    console.log(str.slice(-4,-1));  // gif

```

```js

    let str = 'stringify';
    // 'ringify' because start position is inclusive
    console.log(str.slice(2)); 

    // 'strin' because end position is excluded
    console.log(str.slice(0,5));

    // 's' because end position is excluded
    console.log(str.slice(0,1));

    // 'gif' Slices from reverse 4th char from last to last (which is excluded)
    console.log(str.slice(-4,-1));

```

### Substring
```js

    let str = "stringify";

    // these are same for substring
    console.log( str.substring(2, 6) ); // "ring"
    console.log( str.substring(6, 2) ); // "ring"

```

```js

    let str = "stringify";
    console.log(str.slice(2, 6));
    console.log(str.slice(-7, -3));

```    

### Substr

Returns specific no. of characters from specified position

```js

    let str = "stringify";
    console.log( str.substr(2, 4) ); // ring, from the 2nd position get 4 characters
    console.log( str.substr(-4, 3) ); // gif, from the 4th position get 3 characters

```

## Comparing strings
When comparing string we know that `a` is greater than `A`. This happens because the comparision actually take place between character code not between character

```js

    console.log( 'a' > 'A' ); // true
    console.log( 'Österreich' > 'Zealand' ); // true

```

### charCodeAt and codePointAt
Both methods returns character code. The difference is `charCodeAt` is UTF-16 where as `codePointAt` is unicode
As we already see some characters need two unicodes `\uNNNNNNN` getting character code of such character needs `codePointAt`

```js

    let str = "Hello, 😍";
    console.log(str.charCodeAt(0));  // 72
    console.log(str.codePointAt(0)); // 72
    console.log(str.charCodeAt(7));  // 55357
    console.log(str.codePointAt(7)); // 128525

```    

### fromCharCode and fromCodePoint
You could create a single character or string from character code(s)

```js

    console.log(String.fromCharCode(90)); // Z
    console.log(String.fromCodePoint(128525)); // 😍

    console.log(String.fromCharCode(97,98,99,100,101)); // abcde
    console.log(String.fromCodePoint(97,98,99,100,101,128525)); // abcde😍

```

## str.localeCompare(str)

Since the character code change `a` comes after `A` and in many languages the character codes different and making string comparision non obvious. `localeCompare` method helps to solve it (for IE10, you need Intl.js)

**str.localeCompare(str2)**
* Returns `1` if `str` is greater than `str2`
* Returns `-1` if `str` is less than `str2`
* Returns `0` if both are equal

 ```js

    console.log( 'Österreich'.localeCompare('Zealand') ); // -1

```

Excercises:
Write a function ucFirst(str) that returns the string str with the uppercased first character, for instance:
```js
ucFirst('john') == 'John';

function ucFirst(str) {
    let firstChar = str[0];
    return firstChar.toUpperCase() + str.slice(1);
}
```
2. Write a function checkSpam(str) that returns true if str contains ‘viagra’ or ‘XXX’, otherwise `false.

```js
function checkSpam(str) {
    str = str.toLowerCase();
    if (str.includes('viagra') || str.includes('xxx')) {
        return true;
    } else {
        return false;
    }
}

```

3. Create a function truncate(str, maxlength) that checks the length of the str and, if it exceeds maxlength – replaces the end of str with the ellipsis character "…", to make its length equal to maxlength.
```js
function truncate(str, maxlength) {
    if (str.length > maxlength) {
        return str.slice(0, maxlength-1) + '…';
    } else {
        return str;
    }
}
```
4. Extract the money
We have a cost in the form "$120". That is: the dollar sign goes first, and then the number.

Create a function extractCurrencyValue(str) that would extract the numeric value from such string and return it.
```js
function extractCurrencyValue(str) {
    return str.slice(1);
}