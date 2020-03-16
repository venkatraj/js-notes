# Methods of primitives

Javascript provides a way to access primitive data types with methods.
A wrapper object is created, when using dot notation of primitive data type, then appropriate methods are available to act upon the primitive value. Once it is done, the wrapper object is destroyed and leaves primitive value intact.

This may sound confusing, so let us see an example
```js

  let str = "Hello";
  alert( str.toUpperCase() ); // HELLO

```

In the above example, the `str` value is converted to uppercase with the help of `toUpperCase()` method. In reality, there is no `toUpperCase()` method that is attached to variable `str` because it is a primitive string value. What really happens is...
```js

  let str = "hello";
  alert(str.toUpperCase());
  // pseudo code - This is what happens on the above line
  new String('hello').toUpperCase();
  // Since `str.` is replaced with `new String('hello')` it becomes object and has methods
  typeof new String('hello'); // object

```

Like the above code, though it is possible, it is not recommended to use Primitive Constructor functions. It will result in unexpected surprises.
```js

  let zero = new Number(0);

  if (zero) { // zero is true, because it's an object
    alert( "zero is truthy?!?" );
  }

```

It is perfectly safe and recommended to use it as type casting functions rather than Constructors
```js

  let num = Number("123"); // convert a string to number

```

### null/undefined have no methods
```js

  alert(null.test); // error

```
