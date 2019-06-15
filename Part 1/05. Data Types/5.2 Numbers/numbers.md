# Numbers

We want to store (1000000) ten lakh in a variable, it is hard to type and track no. of zeros in a number literal. To make it easier, JavaScript supports exponential form. i.e. You can write ten lakh like so
```js

  let oneMillion = 1e6;
  console.log(oneMillion); // 1000000

```

Basically, exponential form works like this. It multiply the number that preceeds `e` with 1 and no. of zeros. In the above example 1 is multiplied by 1 and 6 zeros (1000000)

Let us say we need to represent 23 lakhs and 9500 rupees, we could write like this
```js

  let amount = 23.95e5;
  console.log(amount); // 23.95 x 100000 = 2395000

```

If we want to represent very small numbers, we could use negative exponential form. This basically divides the number that preceeds `e` by 1 and give no. of zeros. Let us say, we want to represent one microsecond in the form of seconds, because other data are in seconds.

In one second there is one million micro seconds. i.e. 1 / 1000000 = 0.000001;
To represent this we can write like this
```js

    // e3 means 1 x 1000
    // e-3 means 1 / 1000

    let microsecond = 0.000001;
    let millisecond = 0.001;
    // or
    let oneMicroSecond = 1e-6;
    let oneMilliSecond = 1e-3;
    console.log(oneMicroSecond); // 0.000001
    console.log(oneMilliSecond); // 0.001;
    console.log('1000 milliseconds is equal to 1 second');
    console.log(oneMilliSecond * 1000); // 1

```

# Hexadecimal, Octal and Binary formats
Javascript also provides support for Hex, Octal and Binary form numbers.

You write hex code with preceeding `0x`
To represent 255 you would write like this
```js

  console.log(0xff); // 255
  console.log(0xFF); // 255 (case doesn't matter)

```

For octals, no. will preceed with `0o` and for binaries it is `0b`
```js

  let octal_255 = 0o377;
  let binary_255 = 0b11111111;
  console.log(octal_255); // 255
  console.log(binary_255); // 255
  console.log(octal_255 === binary_255); // true

```
## toString(base)

The method `toString(base)` returns a number in given format as string.

```js

  let num1 = 0xff;
  let num2 = 255;
  console.log(num2.toString(10)); // "255"
  console.log(num2.toString(8)); // "377"
  console.log(num2.toString(2)); // "11111111"
  console.log(num1.toString(16)); // "0xff"
  console.log(num1.toString(8)); // "377"
  console.log(num1.toString(2)); // "11111111"

```

There is also support for base36. Though I can't find the use case for numbers, it can be used to  encode strings like so
```js

  function encode(str) {
    return Array.prototype.map.call(str, function(c) {
      return c.charCodeAt(0).toString(36);
    }).join('');
  }

  encode('https://codinggeek.com'); // "2w383834371m1b1b2r332s2x322v2v2t2t2z1a2r3331"

```

## Calling methods on literals
Please note that you need to use two dots `..` when calling methods on number literals. Because numbers also represents fractions such as `123.45` javascript doesn't know whether you're writing fractions or invoking method when it first encounters first dot. So it should be like this
```js

  123456..toString(36);
  // or
  (123456).toString(36);

```

## Rounding.
Javascript provides a built in object `Math` and several methods to assits with common mathamatical operations on numbers

### `Math.floor`
Rounds down: `3.1 to 3.9` becomes `3` and `-1.1 to -1.9` becomes `-2`
```js

  Math.floor(3.1); // 3
  Math.floor(3.5); // 3
  Math.floor(3.9); // 3
  Math.floor(-1.1); // -2
  Math.floor(-1.5); // -2
  Math.floor(-1.9); // -2

```

### `Math.ceil`
Rounds up: `3.1 to 3.9` becomes `4` and `-1.1 to -1.9` becomes `-1`
```js

  Math.ceil(3.1); // 4
  Math.ceil(3.5); // 4
  Math.ceil(3.9); // 4
  Math.ceil(-1.1); // -1
  Math.ceil(-1.5); // -1
  Math.ceil(-1.9); // -1

```

### `Math.round`
Rounds to nearest integer. `3.1 to 3.4` becomes `3` and `3.5 to 3.9` becomes `4` On contrary `-1.1 to -1.5` becomes `-1` and `-1.6 to -1.9` becomes `-2`
```js

  Math.round(3.1); // 3
  Math.round(3.5); // 4
  Math.round(3.9); // 4
  Math.round(-1.1); // -1
  Math.round(-1.5); // -1
  Math.round(-1.9); // -2

```

### `Math.trunc`
This method is not supported by IE.
It remove anything after decimal point.
So `3.1 to 3.9` becomes `3` and `-1.1 to -1.9` becomes `-1`

If we want to round off numbers after particular digits, say 2 digits after decimal point for currencies, we can achieve this in 2 ways.

let us say, I want to round off this number with 2 decimal digits `123.4567`
```js

  let amount = 123.4567;
  console.log(Math.floor(amount * 100) / 100); // 123.45;

  // Another way
  console.log(amount.toFixed(2)); // 123.46

```
As you can see both ways rounds off a number to a 2 decimal digits number. The difference is `toFixed` is rounding off to nearest number just like `Math.round`
So, `.456` becomes `.46`

To conclude
```js

  let amount = 123.454;
  let anotherAmount = 123.456;
  let yetAnotherAmount = 1;
  console.log(amount.toFixed(2)); // 123.45
  console.log(anotherAmount.toFixed(2)); // 123.46
  console.log(yetAnotherAmount.toFixed(2)); // 1.00

```
Since the 3rd digit is `4` in `amount` it is rounded down
and in `anotherAmount` the 3rd digit is `6`, so it is rounded up.

## Imprecise calculations
A number is represented by 64 bit IEEE - 754. 52 bits are used to store digits, 11 to store decimal value and 1 to store sign. 

If the number is too large to be presented by this 64 bits, then we get `Infinity`
```js

  console.log(1e500); // Infinity

```
You can find out safe boundaries by using `Number` object's built in properties and methods such as 
```js

  Number.MAX_VALUE;  // 1.7976931348623157e+308
  Number.MIN_VALUE; // 5e-324
  Number.MAX_SAFE_INTEGER; // 9007199254740991
  Number.MIN_SAFE_INTEGER; // -9007199254740991
  Number.isSafeInteger(1e15); // true
  Number.isSafeInteger(1e16); // false
  Number.isSafeInteger(-1e15); // true
  Number.isSafeInteger(-1e16); // false

```
The less obvious thing is that it losses precision when doing floating point calculations
```js

  console.log(0.1 + 0.2 == 0.3); // false
  console.log(0.1 + 0.2); // 0.30000000000000004

```

This happens because of how the number is represented internall. Please note that this is not specific to Javascript but also happens in languages like `PHP, Java, C, Perl, Ruby` because they too use same `IEEE-754` number system.

To fix issues like `0.1 + 0.2 = 0.30000000000000004`, we can use `toFixed()` method. But please note that this returns a string and you have to convert to integer explicitily
```js

  (0.1 + 0.2).toFixed(2); // "0.30" string
  +(0.1 + 0.2).toFixed(2); // 0.3 number

```
Consider this
```js

  // Hello! I'm a self-increasing number!
  alert( 9999999999999999 ); // shows 10000000000000000

```
This happens because the number is exceed the `MAX_SAFE_INTEGER` limit. So here `isSafeInteger()` method becomes handy before proceeding
```js

  if (Number.isSafeInteger(9999999999999999)) {
    alert( 9999999999999999 );
  } else {
    alert("Not safe integer, will produce unexpected results");
  }

```
## Two Zeros
Another consequence of using IEEE-754 is that there is two zeros. `0` and `-0`

## Other properties and methods 
Apart from MIN and MAX values and safe intergers there are other properties exists in `Number` object
```js

  Number.NaN; // NaN
  Number.POSITIVE_INFINITY; // Infinity
  Number.NEGATIVE_INFINITY; // -Infinity

```

### isSafeInteger
Checks for safe integer as seen previously

### isInteger
Checks a number is whether integer or floating point number
```js

  Number.isInteger(1.34); // false
  Number.isInteger(134); // true

```
### isNaN
To make sure a mathematical expression returns a number
```js

  let num = 'a';
  if (isNaN(100/num)) {
    console.log('The value of num is not a number');
  }

  console.log( isNaN(NaN) ); // true
  console.log( isNaN("str") ); // true

```
`NaN` is not equal to anything even itself `NaN == NaN` is `false`

### isFinite
```js

  console.log( isFinite("15") ); // true
  console.log( isFinite("str") ); // false, because a special value: NaN
  console.log( isFinite(Infinity) ); // false, because a special value: Infinity

```

### Object.is
There is a special built in function `Object.is` which compares its parameters same as identical operator `===`
The thing is it works with `NaN`
```js

  NaN === NaN; // false
  Object.is(NaN, NaN); // true
  let a = b = 10;
  a === b; // true
  Object.is(a,b); // true


```

## parseInt and parseFloat
Type casting with `Number` and `+` is strict
```js

  Number("100px"); // NaN
  +('100'); // 100
  +('100px'); // NaN

```

In real web world, it is useful to get a css property value like `100px` and then do calculations on it. To help with it there is `parseInt` and `parseFloat`
```js

  Number("100px"); // NaN
  +('100'); // 100
  +('100px'); // NaN
  Number("33.3333%"); // NaN
  +("33.3333%"); // NaN

  console.log(parseInt('100px')); // 100
  console.log(parseInt('2em')); // 2
  console.log(parseInt('2000 Rupees')); // 2000
  console.log(parseInt('a123')); // NaN, the first symbol stops the process

  console.log(parseFloat('12.3')); // 12.3
  console.log(parseFloat('12.34.5')); // 12.34
  console.log(parseFloat('33.333%')); // 33.333

```
There is also second optional parameter for `parseInt` which converts a string in other number formats using given numer system base.
For example, string `ff` represents `255` in hexcode base.
So it can be converted to decimal using `parseInt('ff', 16)`
```js

  console.log(parseInt('ff', 16)); // 255
  console.log(parseInt('377', 8)); // 255
  console.log(parseInt('11111111', 2)); // 255

```

## Other Math functions
Built in `Math` objects has other methods

## Random numbers
To generate random numbers, we could use
```js

  Math.random(); // generates random number between 0.1 to 0.9
  function getRandomInRange(min, max) {
    return (Math.random() * (max - min) + min);
  }

  getRandomInRange(20, 30); // Generates random number between 20 and 30


```

## Max and min numbers
Find maximum number 
```js

  Math.max(3,5,7,1,9,4); // 9
  Math.min(3,5,7,1,9,4); // 1

```
## Power
```js

  Math.pow(2,8); // 256 
  2 ** 8; // 256

```