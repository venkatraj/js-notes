# Promise
A company hires for a Web Developer job. There are lots of applicants. So, you get lots of phone calls to know the status of the hiring. Now that is time consuming one. Instead the company promises applicants that it will inform them of the out come of hiring process, no matter what. 
Sometimes the company has to abandon the whole hiring process as the business situation changes. But it will inform applicants nevertheless that the posting is not available at the moement.

In real life, there will be a procedure (or software) that processes the applicantions, select few, put on hold some others and reject many.

So the process is "producing code" of the result - The Company
"Consuming code" wants the result when process is done. The applicants
Since applicants are many, there can be many consuming codes for the result
A `promise` is a email notification that is sent to all applicants regardless of outcome.
The consuming code can read the email at their convienice. Some many opt to get instance notification via mobile,
some may only view it by opening a email client or web based one.

Let us see a JS `Promise`
```js
let promise = new Promise(function(resolve, reject){
    // Producing code
});
```
The function passed to `Promise` constructor is called `executor`. When a promise is created, the executor function called automatically and it eventually produces result. - The company

The resulting `promise` object has internal properties
* `state` - Initially `pending`, then changes to either `fulfilled` or `rejected` - This determines whether hiring process is over or abandoned.
* `result` - An arbitrary value, initially `undefined` - This determines whether particular canditation is selected or not in a collection of statuses. 

When the executor finished the job, depends on situation it should call either `resolve` or `reject`
* `resolve(value)` - to indicate that the process finished successfully.
    * sets `state` to `fulfilled`
    * sets `result` to `value` (a collection of candidates status)
* `reject(error)` - to indicate that an error occured. (hiring abandoned, script not loaded, etc)
    * sets `state` to `rejected`
    * sets `results` to `error`

Let us see the promise in the light of loading script and callbacks.
A promise is a object that will tell consuming code (callback) whether the promise is fulfilled or rejected.
The executor tried to load the script. If it is successful, it sets promise's `state` to `fulfilled` and `result` to `script` If it fails to load script, then `state` becomes `rejected` and `result` becomes `error`

```js
let promise = new Promise(function(resolve, reject) {
  // the function is executed automatically when the promise is constructed

  alert(resolve); // function () { [native code] }
  alert(reject);  // function () { [native code] }

  // after 1 second signal that the job is done with the result "done!"
  setTimeout(() => resolve("done!"), 1000);
});
```
You see two things from above code.
The executor function called (runs) immediately. And it receives two arguments `resolve` and `reject`. Both are functions comes from JavaScript engine. We don't have to create them. Think of them as function that changes the `promise` object from this `{ state: 'pending', result: undefined}` to `{ state: 'fulfilled', result: 'done'}`
While the promise can't be fulfilled, it rejects it
```js
let promise = new Promise(function(resolve, reject) {
  // after 1 second signal that the job is finished with an error
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});
```
Now `promise` object is changed form this `{ state: 'pending', result: undefined}` to `{ state: 'rejected', result: error }`

**Notes:**
* There can be only one result or error. Further calls will be ignored
* Reject with `Error` objects, not just strings
* Resolve / reject can be immediate
* The `state` and `result` are internal, we can't access them directly, but can use `then/catch` methods to use the result of promise

```js
let promise = new Promise(function(resolve, reject) {
  resolve("done");

  reject(new Error("…")); // ignored
  setTimeout(() => resolve("…")); // ignored
});

// Immediate
let promise = new Promise(function(resolve, reject) {
  resolve(123); // immediately give the result: 123
});
```
## Consumer codes with `then` and `catch`
With `.then` you can handle both `fulfilled` and `rejected` states
```js
promise.then(function(result){
    // Handles successful result
}, function(error) {
    // handles error
});
```
First function is called when the promise is successfully fulfilled and the second one is called when rejected.
```js
// Fulfilled
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve runs the first function in .then
promise.then(
  result => alert(result), // shows "done!" after 1 second
  error => alert(error) // doesn't run
);

// Rejection
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject runs the second function in .then
promise.then(
  result => alert(result), // doesn't run
  error => alert(error) // shows "Error: Whoops!" after 1 second
);
```
If we are only interest in handling fulfilled promises, then we can pass only one argument to `.then`
```js
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

promise.then(alert); // shows "done!" after 1 second
```

If we are only interested in rejected promises, then we can pass 2nd argument to `.then` like this `.then(null, function)` or its `alias` `.catch(function)`
```js
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // shows "Error: Whoops!" after 1 second
```
## Handler's of `then/catch` are always async
Consider this
```js
// an immediately resolved promise
let promise = new Promise(resolve => resolve("done!"));

// .catch(f) is the same as promise.then(null, f)
promise.then(alert); // shows "Error: Whoops!" after 1 second
alert('code finished');
```
You will first get `code finished` alert and then done alert. Even though the promise is fulfilled without any delay it is executed after `code finished` alert. because in execution queue, it is first executor, `code finsihed` alert and then only `fulfilled` gets into queue and executed as such

Examples:
Rewrite this with promise
```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error ` + src));

  document.head.append(script);
}
```

```js
function loadScript(src) {
    return new Promise(function(resolve, reject){
        let script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error("Can't load script"));
        document.head.append(script);
    });
}

let promise = loadScript('my/script.js');
// One way
promise.then(function(){
    console.log("Succesfully loaded");
});
promise.catch(function(){
    console.log('Failed');
});

// OR
promise.then(
    (script) => console.log(`${script} loaded`),
    (error) => console.log(`Error: ${error.messsage}`)
);
promise.then(script => alert('One more handler to do something else!'));
```

### Callbacks
* We must have a ready callback function when calling loadScript. In other words, we must know what to do with the result before loadScript is called.

* There can be only one callback.

### Promises
* Promises allow us to code things in the natural order. First we run loadScript, and .then write what to do with the result.

* We can call `.then` on a promise as many times as we want, at any time later.
