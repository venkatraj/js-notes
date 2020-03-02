## Operators
First we need to know the some cs terms

`operator, operand, unary, binary`

`An operator` - is a symbol that performs mathematical operations. We are familiar with this by our school mathematics.

* `+` does addition
* `-` does subtraction
* `*` does multiplication
* `/` does division

`An operand` - is a value upon the operators does operations
```js
var sum = 5 + 10;
```
In the above in example `5` and `10` are operands and `+` is operator.

`unary` - An operator is unary, if it operates upon single operand
```js
let bank_blance = 5000;
bank_balance = -bank_balance;
console.log(bank_balance); // -5000
let cost = "100";
let tax = "200";
console.log(cost + tax);
console.log(+cost + +tax);
console.log(Number(cost) + Number(tax));
```
`binary` - An operator is binary, if it operates on 2 operands. Here `+` is binary operator
```js
let sum = 5 + 10;
console.log(sum); // 15
let language = "Java" + "Script";
console.log(language); // JavaScript
console.log('1' + 2 + 2); // 122
console.log(1 + 2 + '2'); // 32
console.log('6'/2); // 3
```

## Operator Precedence
Usually follows school math. Full list can be seen here.
[Precedence Table](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence)

## Assignment Operator
All operators returns a value and assignment operators too
```js
let x = y = z = 10;
console.log(x); // 10
console.log(y); // 10
console.log(z); // 10
let a, b, c;
a = b = c = 2 + 2;

Also, valid not recommended
let a = 1;
let b = 2;
let c = 3 - (a = b + 1);
alert( a ); // 3
alert( c ); // 0
```

## Reminder %
`%` returns the remainder of a division
```js
console.log(5 % 2); // 1
console.log(5 % 2.5); // 0
console.log(8 % 3); // 2
```

## Exponentiation
New operator
```js
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root, that's maths)
alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)
```

## Increment  / Decrement
* **Increment** `++` increases value by 1
* **Decrement** `--` decreases value by 1

### Two variations
* prefix
* postfix
```js
let a = 1;
let b = a++;

let c = 5;
let d = ++c;
// bad practice
let counter = 1;
alert( 2 * counter++ ); // 2, because counter++ returns the "old" value
// Good practice
let counter = 1;
alert( 2 * counter );
counter++;
```

## Compound Operators
Most of the time, we modify a value and then assign it to again. like
```js
let n = 2;
n = n + 5;
n = n * 2;`
```

This can be shortened as
```js
let n = 2;
n += 5;
n *= 2;
```
## Comma
Comma operator is rare and unusual operator. It evaluate several expressions separated by comman `,` and discard values except the last one.
```js
let a = (1 + 2, 3 + 4);
console.log(a); // 7 (the result of 3 + 4)
```
You may wonder what is the use of evaluating and discarding values except last one?
```js
for (a = 1, b = 3, c = a * b; a < 10; a++) {
 // Do something
}
```

## Bitwise operators
There are bitwise operators in JS as in many languages. These needs to be learnt when needed. 
* AND ( & )
* OR ( | )
* XOR ( ^ )
* NOT ( ~ )
* LEFT SHIFT ( << )
* RIGHT SHIFT ( >> )
* ZERO-FILL RIGHT SHIFT ( >>> )

[Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)


## Tasks
```js
let a = 1, b = 1;

let c = ++a; // ? 
let d = b++; // ? 
// a, b and c are 2 where as d is 1

// 2nd task
let a = 2;
let x = 1 + (a *= 2);
// a is 4 and x is 5


// 3rd task
"" + 1 + 0      // "10"
"" - 1 + 0      // -1
true + false    // 1 + 0 = 1
6 / "3"         // 2
"2" * "3"       // 6
4 + 5 + "px"    // '9px'
"$" + 4 + 5     // '$45'
"4" - 2         // 2
"4px" - 2       // NaN
7 / 0           // Infinity
"  -9  " + 5    // '   -9   5'
"  -9  " - 5    // -14
null + 1        // 0 + 1 = 1
undefined + 1   // NaN
" \t \n" - 2    // -2 (because \t and \n are also spaces and results in empty string)
```
