# Rest parameters and spread operator
Many built in JS method support arbitrary number of arguments.
```js

    Math.min(val1, val2, val3, valX)
    Object.assign(src, obj1, obj2, ... objX);

```
`Math.min` returns minimum value among the supplied parameters and `Object.assign` copies supplied objects into `src` obj
Like these methods, we can also make our function to behave as such

To conclude, JS functions don't have signatures. Meaning that, you can call function with more or less parameters than in its declaration

```js

    function sum(a, b) {
        return a + b;
    }

    console.log( sum(1, 2, 3, 4, 5) );

```
The above code works fine without error, but returns a value of `3`.
We can rewrite our sum function to make use of remaining parameters using `arguments` object, that is automatically available inside function.

```js

    function showName() {
        console.log( arguments.length );
        console.log( arguments[0] );
        console.log( arguments[1] );

        // it's iterable
        // for(let arg of arguments) console.log(arg);
    }

    // shows: 2, Julius, Caesar
    showName("Julius", "Caesar");

    // shows: 1, Ilya, undefined (no second argument)
    showName("Ilya");

```

`arguments` object is an array-like object and also an iterable. But it is not an array. So, we can't use mapping functions on parameters. And we can't have few parameters as variables and rest as object. So when you do need such features, you can use `...rest` parameters

```js

    function showName(firstName, lastName, ...titles) {
        console.log( firstName + ' ' + lastName ); // Julius Caesar

        // the rest go into titles array
        // i.e. titles = ["Consul", "Imperator"]
        console.log( titles[0] ); // Consul
        console.log( titles[1] ); // Imperator
        console.log( titles.length ); // 2
    }

    showName("Julius", "Caesar", "Consul","Imperator");

```
Please note that the `...rest` parameter *should always be at the end*.
This won't work
```js

    function f(arg1, ...rest, arg2) { 
        // arg2 after ...rest ?!
        // error
    }

```
*Note:* Arrow functions don't have `arguments` object. Like `this` it takes arguments object from its parent
```js

    function f() {
        let showArg = () => console.log(arguments[0]);
        showArg();
    }

    f(1); // 1

```

## Spread Operator
With built in methods like `Math.min()` you need to pass no. of parameters to find minimum values. 
```js

    let min = Math.min(100,20,33,3,99,34);
    console.log(min); // 3

```
What is we have an array of values? like
```js

    let nums = [100,20,33,3,99,34];
    let min = Math.min(nums);
    console.log(min); // NaN

```
Because `.min()` expects no. of values, not an array. In old days, we will do like this (to be covered later)
```js

    let nums = [100,20,33,3,99,34];
    let min = Math.min.apply(Math, nums);
    console.log(min); // 3

```
But now you can do the same with spread operator
```js

    let nums = [100,20,33,3,99,34];
    let min = Math.min(...nums);
    console.log(min); // 3

```
Note that both rest and spread uses `...` 
When it is present in function declaration as parameter, then it converts rest of the parameters into an array.
When it is present in the function call or expressions, then it converts an array into individual elements

### Spread examples
```js

    let arr1 = [1, -2, 3, 4];
    let arr2 = [8, 3, -8, 1];

    console.log( Math.max(...arr1, ...arr2) ); // 8

    let arr1 = [1, -2, 3, 4];
    let arr2 = [8, 3, -8, 1];

    console.log( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25

    let arr = [3, 5, 1];
    let arr2 = [8, 9, 15];

    let merged = [0, ...arr, 2, ...arr2];

    console.log(merged); // 0,3,5,1,2,8,9,15 (0, then arr, then 2, then arr2)

```

You can also use spread operator to convert an iterator into an array.
```js
    
    let str = "Hello";
    console.log( [...str] ); // H,e,l,l,o

    console.log(Array.from(str));

```

This is same as using `Array.from()`, the difference is `Array.from` works both with array-like objects and iterables whereas spread operator only works in iterables

