# Microtasks

Like event handlers, promise handlers (`.then/.catch/.finally`) too run asynchronously.

Promise handlers are queued in an internal queue called `PromiseJobs` aka `microtask queue`

The queue handlers are executed one by one only when the current script is done executing.

## Unhandled rejection
If we don't catch errors or catch it in a scheduled code, then `unhandledrejection` event is triggered first and then scheduled code will run

```js
let promise = Promise.reject(new Error("Promise Failed!"));
promise.catch(err => alert('caught'));

// doesn't run: error handled
window.addEventListener('unhandledrejection', event => alert(event.reason));

// Second example
let promise = Promise.reject(new Error("Promise Failed!"));

// Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));


// 3rd example, scheduled code
let promise = Promise.reject(new Error("Promise Failed!"));
setTimeout(() => promise.catch(err => alert('caught')), 1000);

// Error: Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));

// will display both `Promise Failed and Caught` messages one by one
```
