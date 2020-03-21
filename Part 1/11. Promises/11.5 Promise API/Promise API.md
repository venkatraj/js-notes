# Promise API
There are 5 static methods in the `Promise` class

## Promise.all
Executes an array (actually any iterable) of promises, and returns an array of result. The result array items are in the same order as the order of array of promises.

if any one of the promise is rejected in the array, `Promise.all` results in a rejection and ignoring the other promises which may successfully fulfilled. 

In `Promisel.all`, like `arr.every` method all promises should be resolved in order to give an array of results 

```js
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 when promises are ready: each promise contributes an array member

let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));


let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // all responses are resolved successfully
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
    }

    return responses;
  })
  // map array of responses into an array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(users => users.forEach(user => alert(user.name)));
```

### Promise.all(iterable) allows non-promise “regular” values in iterable
The `iterable` may contain non-promises such as primitive values
```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```

## Promise.allSettled
*A recent addition to the language*
`Promise.all` returns an array of results only when all promises are fulfilled.

There are times, we need an array of results regardless of whether all promises are fulfilled or some are rejected. To handle such things, we use `Promise.allSettled`

Result array will be of this format
```
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```
The below code handle the same result of above example
```js
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { 
    // (*) results contains both `fulfilled` and `rejected` promises
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

In case of absense of browser support, we can use below polyfill
```js
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      state: 'fulfilled',
      value
    }), reason => ({
      state: 'rejected',
      reason
    }))));
  };
}
```

## Promise.race
If `Promise.all` is like `arr.every`, then `Promise.race` is like `arr.some` only difference is that it returns first settled result whether that promise is resolved or 
rejected just like a `race`

```js
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```
The first promise here was fastest, so it became the result. After the first settled promise “wins the race”, all further results/errors are ignored.

## Promise.resolve/reject
Methods Promise.resolve and Promise.reject are rarely needed in modern code, because async/await syntax makes them somewhat obsolete.

### Promise.resolve
Promise.resolve(value) creates a resolved promise with the result value. Same as
```js
let promise = new Promise(resolve => resolve(value));
```
We already used this in our `Promise.allSettled` polyfill code.

In other words, it is just like converting a stringified JSON into json object. it takes a resulting value of a promise and turns it into a promise

For example, the loadCached function below fetches a URL and remembers (caches) its content. For future calls with the same URL it immediately gets the previous content from cache, but uses Promise.resolve to make a promise of it, so the returned value is always a promise:
```js
et cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```
We can write loadCached(url).then(…), because the function is guaranteed to return a promise. We can always use .then after loadCached. That’s the purpose of Promise.resolve in the line (*).

## Promise.reject
`Promise.reject(error)` creates a rejected promise with error. Same as:
```
let promise = new Promise((resolve, reject) => reject(error));
```
In practice, this method is almost never used.