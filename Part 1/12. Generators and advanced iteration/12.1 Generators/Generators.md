# Generators

Generators are functions. While regular functions returns single value, generators can return (yield) multiple values

## Generator functions
We can create generator function using `function*` syntax
```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence()
```
When called it returns a **frozen function call** Meaning that, it doesn't return any particular value, but an generator object. This generator object will then return values when invoking `next` method in it.
Like `Iterables` it returns an object in this format `{ value: someValue: done: Boolean }`

```js
let one = generator.next()
console.log(one) // {value: 1, done: false}
let two = generator.next()
console.log(two) // {value: 2, done: false}
let three = generator.next()
console.log(three) // {value: 3, done: true}
```

## Generators are iterables
Since generators are iterables you can use it with a `for..of` loop
```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  console.log(value); // 1, then 2
}
```
*NOTE* This ignores last value when `done: true` To overcome it, we need to use only `yield`s, not return
```js
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = generateSequence();

for(let value of generator) {
  console.log(value); // 1, then 2, then 3
}
```

Since generators are iterables, we can use spread operator with it
```js
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let sequence = [0, ...generateSequence()];

console.log(sequence); // 0, 1, 2, 3
```

## Using generators instead of iterables
```js
// Iterable code
let range = {
  from: 1,
  to: 5,

  // for..of calls this method once in the very beginning
  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object, asking it for next values
    return {
      current: this.from,
      last: this.to,

      // next() is called on each iteration by the for..of loop
      next() {
        // it should return the value as an object {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

console.log([...range]); // 1,2,3,4,5


// Generator code
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

let sequence = [...generateSequence(1,5)];

console.log(sequence); // 1, 2, 3, 4, 5
```

## Converting Symbol.iterator to generator

```js
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

console.log( [...range] ); // 1,2,3,4,5
```

## Generator composition
We can use other generators inside a generator.
For example, if we have code like this (which can be split into three generators)
```js
function* generateAlphaNum() {

  for (let i = 48; i <= 57; i++) yield i;

  for (let i = 65; i <= 90; i++) yield i;

  for (let i = 97; i <= 122; i++) yield i;

}
```
Then we can turn each `for` loop into its own generator and use them to compose `generateAlphaNum` generator

```js
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

console.log(str); // 0..9A..Za..z
```

Which is essentially same as 
```js
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;

  // yield* generateSequence(65, 90);
  for (let i = 65; i <= 90; i++) yield i;

  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;

}

let str = '';

for(let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}

console.log(str); // 0..9A..Za..z
```

## `yield` is a two way street.
Even though generators look like a iterables, it is more powerful and flexible than iterables. With iterable you can only get values. But generators can accept values as well.

```js
function* gen() {
  // Pass a question to the outer code and wait for an answer
  let result = yield "2 + 2 = ?"; // (*)

  alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- yield returns the value

generator.next(4); // --> pass the result into the generator
```

Generator can be resumed after some time
```js
// resume the generator after some time
setTimeout(() => generator.next(4), 1000);
```

Multiple next/yields
```js
function* gen() {
  let ask1 = yield "2 + 2 = ?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3 = ?"

  alert(ask2); // 9
}

let generator = gen();

alert( generator.next().value ); // "2 + 2 = ?"

alert( generator.next(4).value ); // "3 * 3 = ?"

alert( generator.next(9).done ); // true
```

## Throwing errors
Generators can also throw errors instead of yielding values
```js
function* gen() {
  try {
    let result = yield "2 + 2 = ?"; // (1)

    alert("The execution does not reach here, because the exception is thrown above");
  } catch(e) {
    alert(e); // shows the error
  }
}

let generator = gen();
let question = generator.next().value;
generator.throw(new Error("The answer is not found in my database")); // (2)
```

`Try...catch` can be in calling code too
```js
function* generate() {
  let result = yield "2 + 2 = ?"; // Error in this line
}

let generator = generate();

let question = generator.next().value;

try {
  generator.throw(new Error("The answer is not found in my database"));
} catch(e) {
  alert(e); // shows the error
}
```
