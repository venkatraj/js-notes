Generators are functions. While regular functions returns single value, generators can return (yield) multiple values

## Generator functions
We can create generator function suingusing `function*` syntax
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
This ignores last value when `done: true` To overcome it, we need to use
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

Since generators are iterables, we can do this
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