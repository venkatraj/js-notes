# Promise

Imagine that your web application is sending request to github.com to retrieve users data in json format. The request may be successful or failure, but it takes some time to complete this request.

Once the request is complete, whether it is successful or failure you need to change the state of your application.

If successful, you may show a list of users to your web app users. If failed, you may state that there was an issue with github server.

If both case you need to run some code.

`Producer Code` is the code you write to send request to server

`Consumer Code` is the code you execute upon request completion.

This can be done with `Promise`. A promise is a construct that receives a function as argument and runs it right away. This is `producer code`. This producer code also receives two arguments (functions) namely `resolve` and `reject`. We don't need to write code for this function. It is built in and we just need to execute it in the producer code depends on the context.  It returns a `promise` object which as two properties namely `[[PromiseStatus]] and [[PromiseValue]] both are internal.

A `promise` object initially has `pending` as status and `undefined` as value.
Once the producer code is completed successfully, it invokes `resolve` function with `result`. If failed, it invokes `reject` function with `Error` object

```js
  const promise = new Promise((resolve, reject) => {
    let randomNumber = Math.floor(Math.random() * 10 - 1)
    if (randomNumber % 2 == 0) {
      resolve('Even number')
    } else {
      reject(new Error('Odd number'))
    }
    resolve('Done') // ignored
    reject('Really?!') // ignored
  })
```

Only one call is execute, it can be either resolve or reject. further calls to resolve or reject are ignored.

We can then use `.then, .catch and .finally` methods and chain them on `Promise` construct

## then
We can use `.then` for both success and failure
```js
const promise = new Promise((resolve, reject) => {
  ....
})

promise.then(
  function(result) { /* handle a successful result */ },
  function(error) { /* handle an error */ }
);
```

# catch
```js
// Both cases
promise.then(
  result => console.log(result)
  error => console.log(error)
);

// Only success process
promise.then(result => console.log(result))

// Only error
promise.then(null, error => console.log(error))
```

An alternative to process error is to use `.catch`
```js
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});
promise.catch(console.log)
```

## finally
This is similar to `try...catch...finally`.
Two points to note about `finally`

1. A finally handler has no arguments. In finally we don't know whether the promise is successful or not. That's all right, as our task is usually to perform "general" finalizing procedures.

2. A finally handler passes through results and errors to the next handler.

So this is possible. Using `finally` first is possible
```js
new Promise((resolve, reject) => {
  setTimeout(() => resolve("result"), 2000)
})
  .finally(() => alert("Promise ready"))
  .then(result => alert(result)); // <-- .then handles the result

  // OR this
  new Promise((resolve, reject) => {
  throw new Error("error");
})
  .finally(() => alert("Promise ready"))
  .catch(err => alert(err));  // <-- .catch handles the error object
```

### On settled promises handlers run immediately
If a promise is pending, .then/catch/finally handlers wait for it. Otherwise, if a promise has already settled, they execute immediately

We can add handlers any time: if the result is already there, our handlers get it immediately.

## Example: loadScript

```js
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}

let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('Another handler...'));
```


