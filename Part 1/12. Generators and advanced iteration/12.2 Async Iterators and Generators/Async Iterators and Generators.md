# Async Iterators and Generators
Async iterators allows us to iterate over data that comes asynchronously

## Async Iterators
It is similar to iterators with few syntax variations
1. Iterator method should be [Symbol.asyncIterator] instead of [Symbol.iterator]
2. `next()` method should return a Promise, instead of any value
3. We should use `for await...of` loop instead of `for...of` loop
```js
let range = {
  from: 1,
  to: 5,

  // for await..of calls this method once in the very beginning
  [Symbol.asyncIterator]() { // (1)
    // ...it returns the iterator object:
    // onward, for await..of works only with that object,
    // asking it for next values using next()
    return {
      current: this.from,
      last: this.to,

      // next() is called on each iteration by the for await..of loop
      async next() { // (2)
        // it should return the value as an object {done:.., value :...}
        // (automatically wrapped into a promise by async)

        // can use await inside, do async stuff:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }

})()
```

(1) uses [Symbol.asyncIterator]
(2) next() no need to be `async` but it allows us to use `await` the Promise to be resolve
(3) awaits for promise to be resolved
(4) use of `for await...of` loop

*NOTE* spread ... doesn't work with async iterables

## Async generator
Similar to generator with async/await syntax

```js
async function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    // yay, can use await!
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield i;
  }
}

(async () => {
  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    alert(value); // 1, then 2, then 3, then 4, then 5
  }
})();
```

If you plan to use `.next()` method instead of `for await...of` loop, then you must use await because it returns a promise
```js
result = await generator.next();
```

## Async iterables
Just like we can use generator, in a iterable (instead of using iterator object), we can use async generator as well
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

for(let value of range) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}

// Use async instead
let range = {
  from: 1,
  to: 5,

  async *[Symbol.asyncIterator]() { // same as [Symbol.asyncIterator]: async function*()
    for(let value = this.from; value <= this.to; value++) {
      // make a pause between values, wait for something
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield value;
    }
  }
};

(async () => {
  for await (let value of range) {
    alert(value); // 1, then 2, then 3, then 4, then 5
  }
})();
```