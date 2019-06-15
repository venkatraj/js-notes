# Type Conversions
Most of the time, operators converts values to right type. For example, `alert` converts anything passed to it to `String` type.

There are some cases where this is not useful or not working as intended. For such cases, we will do explicit type conversion.

## To String
To convert a value to string type we use `String` type casting function

```js
    let value = true;
    alert(typeof value); // boolean

    value = String(value); // now value is a string "true"
    alert(typeof value); // string
```

## To Number
To convert a value to number, we use `Number` type casting function
```js
    let str = "123";
    alert(typeof str); // string

    let num = Number(str); // becomes a number 123
    alert(typeof num); // number
```

With number conversion
undefined   becomes NaN
null	    becomes 0
true and false  becomes 1 and 0
string	=> Whitespaces from the start and the end are removed. Then, if the remaining string is empty, the result is 0. Otherwise, the number is “read” from the string. An error gives NaN.

```js
    alert( Number("   123   ") ); // 123
    alert( Number("123z") );      // NaN (error reading a number at "z")
    alert( Number(true) );        // 1
    alert( Number(false) );       // 0
```

## To Boolean
To convert to boolean value, we use `Boolean` type casting function
*Rules* 
Values that are intuitively “empty”, like 0, an empty string, null, undefined and NaN become false.
Other values become true.

```js
    alert( Boolean(1) ); // true
    alert( Boolean(0) ); // false
    alert( Boolean("hello") ); // true
    alert( Boolean("") ); // false
    alert( Boolean("0") ); // true
    alert( Boolean(" ") ); // spaces, also true (any non-empty string is true)    
```