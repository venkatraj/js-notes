# Logical Operators
3 logical operators
* OR `||`
* AND `&&`
* NOT `!`

Though called logical operator, it is applied to all types and can return any type

```js
let result = 10 || 20;
```
`result` will be 10, rather than `true`

## OR
OR operator takes 2 operands and gives a result.
```js
true || true; // true because both are true
true || false; // true because atleast one is true
false || true; // true because atleast one is true
false || false; // false because both are false
```

Like relational operators, logical operators converts its operand values to boolean to decide the result
```js
if (1 || 0) { // works just like if( true || false )
  alert( 'truthy!' );
}

let hour = 9;

if (hour < 10 || hour > 18) {
  alert( 'The office is closed.' );
}

let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'The office is closed.' ); // it is the weekend
}
```

### OR does short circuit operation or seeks first truthy value
In other words, when executing code left to right, when it finds first truth value in a operands, it stops execution and returns that operand.
If all operands has falsy values, then last operand is returned.

Consider this...
```js
let value1 = '',
    value2 = 10,
    value3 = false,
    result;

result = value1 || value2 || value3; // return 10
```

```js
alert( 1 || 0 ); // 1 (1 is truthy)
alert( true || 'no matter what' ); // (true is truthy)

alert( null || 1 ); // 1 (1 is the first truthy value)
alert( null || 0 || 1 ); // 1 (the first truthy value)
alert( undefined || null || 0 ); // 0 (all falsy, returns the last value
```

This behaviour is useful when we need a default value. Consider this
```
let currentUser = null;
let defaultUser = "John";

let name = currentUser || defaultUser || "unnamed";

alert( name ); // selects "John" – the first truthy value
```
**NOTE:** Remember explicit is better than implicit. 

## AND `&&`
In classical programming AND returns true if both operands are truthy and false otherwise:
```js
  alert( true && true );   // true - Both are true
  alert( false && true );  // false - Both are not true
  alert( true && false );  // false - Both are not true
  alert( false && false ); // false - Both are not true
  let hour = 12;
  let minute = 30;

  if (hour == 12 && minute == 30) {
    alert( 'Time is 12:30' );
  }
```

Just as for OR, any value is allowed as an operand of AND:
```js
  if (1 && 0) { // evaluated as true && false
    alert( "won't work, because the result is falsy" );
  }
```

## AND seeks the first falsy value
```js
  // if the first operand is truthy,
  // AND returns the second operand:
  alert( 1 && 0 ); // 0
  alert( 1 && 5 ); // 5

  // if the first operand is falsy,
  // AND returns it. The second operand is ignored
  alert( null && 5 ); // null
  alert( 0 && "no matter what" ); // 0
```

## ! (NOT)
The operator accepts a single argument and does the following:

1. Converts the operand to boolean type: true/false.
2. Returns an inverse value.
```js
alert( !true ); // false
alert( !0 ); // true
alert( !!"non-empty string" ); // true
alert( !!null ); // false
// Same as
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```