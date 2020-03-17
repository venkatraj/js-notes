# Iterables
Iterables can be any object that is useable in a `for..of` loop.
## Symbol.iterator
Let's look at an example.
```js

  let range = {
    from: 1,
    to: 5
  };

  // Pseudo code
  for(num of range) {
    console.log(num); // 1,2,3,4,5
  }

```
If the above code run successfully, then range object is iterable. But we will get an error
`TypeError: range is not iterable` To make it iterable, it (`range`) should return an iterator object. An iterator is an object with `next` method that returns a `{done: Boolean, value: any}` format. 

In Javascript, `for..of` loop, it looks for `[Symbol.iterator]` method which should return an iterator.

In other words, first call of `for..of` invokes `[Symbol.iterator]` method and gets an iterator object and subsequent calls of `for..of`, it uses `next` method which returns an object in `{done: boolean, value: any}` format. When `done: false` the `for..of` knows that the iteration is not over and takes the next value. When `done: true` the `for..of` knows that the iteration is over and exists loop.

Let us see the above explanation in code.

```js

  let range = {
    from: 5,
    to: 10,
    [Symbol.iterator]() {
      return {
        current: this.from,
        last: this.to,
        next() {
          if (this.current <= this.last) {
            return {done: false, value: this.current++}
          } else {
            return {done: true}
          }
        }
      }
    }
  }

  for(num of range) {
    console.log(num);
  }

```

Here, `range` object has a method named `Symbol.iterator` which return the essential iterator object with `next` method. In that object, we store, `from` and `to` values in its own properties and `next` method checks whether the range is completed or not. Depends on it, it returns an object in the `{done: boolean, value: any}` format.

If you are a `Python` fan boy, you could do this
```js
    let range = (from, to, step) => {
      return {
        from,
        to,
        step,

        [Symbol.iterator]() {
          return {
            current: this.from,
            last: this.to,
            step: this.step,
            next() {
              if (this.current <= this.last) {
                let val = this.current
                this.current += this.step
                return { done: false, value: val };
              } else {
                return { done: true };
              }
            }
          }
        },
      };
    };

    for (let num of range(1, 10, 2)) {
      console.log(num);
    }
```

**Strings** are iterables and it works well for surrogate paris as well.
```js
for (let char of "test") {
  alert( char ); // t, then e, then s, then t
}

let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, and then 😂
}
```

## Calling an iterator explicitly
```js

  let str = "Hello";

  // does the same as
  // for (let char of str) alert(char);
  let iterator = str[Symbol.iterator]();

  while (true) {
    let result = iterator.next();
    if (result.done) break;
    alert(result.value); // outputs characters one by one
  }

```

This is rarely needed. We call built-in iterator explicitly and stores the returned iterable object in variable `iterator`. The returned object has `next` method which can be used to iterate through items. One use case is that if we need to pause and do something special for certain items, we can use like this, but I'm still not convinced why we can't do that with `if/else` in `for..of`

# Iterables and array-likes
These two are different, though arrays are iterables too

* `Iterables` has built in `Symbol.iterator` method
* Array-likes has numeric indexes and length

Important thing to note is that, Array likes can be iterables and vice versa. But is not necessary that every array like is iterables or every iterables is array like.

In other words, strings are array-like and also iterables. However, the earlier iterable we have seen `range` is not array like, but it is still iterable.

## Array.from
Array like objects and iterables are not arrays, so method like `push, pop` is not available with them. To make such objects to work really like array, we have `Array.from`
```js

  let arrLike = {
    0: 'Hello',
    1: 'World',
    length: 2
  };
  console.log(arrLike.pop()); // TypeError: arrLike.pop is not a function

  let arr = Array.from(arrLike);
  console.log(arr.pop()); // World

```
Same happens with iterables
```js

  let str = "Hello, World";
  let arr = Array.from(str);
  console.log(arr); // ['H','e','l','l','o',....]
  //OR
  let arr1 = Array.from(range); // From previous example
  console.log(arr1); // [1,2,3,4,5]

```
Full syntax of `Array.from` is
```js
Array.from(obj[, mapFn, thisArg]);
```
`mapFn` is a function that will run for every element to process it. `thisArg` allows to set `this` for it. (Example?! please)
Let us make square root array from this
```js

  let str = '123';
  let sqRootArr = Array.from(str, (num) => num * num);
  console.log(sqRootArr); // [1,4,9]

```
To convert a string into an array, as we seen earlier, we can use `split` method
```js

  let str = 'abc';
  let chars = str.split('');
  console.log(chars); // ['a','b','c']

```
But that fails, if the string contains surrogate paris
```js

  let anotherStr = '𝒳😂';
  let anotherChars = anotherStr.split('');
  console.log(anotherChars); ['\ud835','\udcb3','\ud83d','\ude02']

```
This can be remedied by using `Array.from` to turn string into an array
```js

  let str = '𝒳😂';

  // splits str into array of characters
  let chars = Array.from(str);

  console.log(chars);
  console.log(chars[0]); // 𝒳
  console.log(chars[1]); // 😂
  console.log(chars.length); // 2

```

