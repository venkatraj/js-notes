# Comparisons
Greater than `a > b`   
Less than `a < b`   
Greater than or equals `a >= b`  
Less than or equals `a <= b`  
Equals `==`   
Not equals `!=`  
Identical `===`  
Not identical `!==`  

## Boolean results
All comparisons returns boolean value as result
* If `a > b` returns `true` then it means yes `a` is greater than `b`
* If `a > b` returns `false` then it means no `a` is not greater than `b`. Its value is less than `b`

```js
console.log( 2 > 1 );  // true 
console.log( 2 == 1 ); // false
console.log( 2 != 1 ); // true
```
Normally you will use result of comparison with a decision making structure, but you can also assign the result to a variable.
```js
let result = 5 > 4; // assign the result
console.log( result ); // true
```

## String comparison
To compare two string, first js sort them and then see which one comes first. The first one is less than the second one.
```js
console.log( 'Z' > 'A' ); // true
console.log( 'Glow' > 'Glee' ); // true
console.log( 'Bee' > 'Be' ); // true
```
Here in alphabetical order `Z` comes after `A`, so it is greater than `A`

There is a catch. As we know JS is case sensitive, consider this
```js
console.log('a' > 'A');
```
Here the result is `true` because in unicode char encoding table, uppercase letters comes first and then comes lowercase.
```js
'A'.charCodeAt(0) // 65
'a'.charCodeAt(0) // 97
```
**Note:** Don't worry if the above code doesn't make sense. We will get into that later.

## Comparison of different types
When comparing different types of values, they are converted into `Number` type
```js
console.log( '2' > 1 ); // true
console.log( '01' == 1 ); // true
console.log( true == 1 ); // true
console.log( false == 0 ); // true
```
is same as 
```js
console.log( Number('2') > 1 ); // true
console.log( Number('01') == 1 ); // true
console.log( Number(true) == 1 ); // true
console.log( Number(false) == 0 ); // true
```
So this obviously creates a problem when we try to compare things between different data types.

## Identical or Strict comparison
When equality and non equality operators fail, we use idential operators
```js
console.log( '01' === 1 ); // false
console.log( true === 1 ); // false
console.log( false !== 0 ); // true
```

## Funny comparison
```js
console.log( null > 0 );  // false
console.log( null == 0 ); // false
console.log( null >= 0 ); // true
```

There are certain reasons behind this behavior. Which can be read and memorized. Even if you know the internals of these results, using it in production software is error prone. You should stick with Identical / Strict equality operators.

```js
console.log( null === undefined ); // false
console.log( null == undefined ); // true
```