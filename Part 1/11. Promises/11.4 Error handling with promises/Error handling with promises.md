# Error handling with promises
When a promise rejects, the control jumps to the closest rejection handler.

```js
fetch('https://no-such-server.blabla') // rejects
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (the text may vary)
```

Errors fall through and will be handled by next closes `catch` just like `try...catch`

A `catch all` example, catches errors in any of 5 promises
```js
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
  .catch(error => console.log(error.message));
```

## Implicit `try...catch`
`Promise` executor code will behave as if it is wrapped with a hidden `try..catch` block

For example, in the below code, the promise is not rejected, but just raised an error, but will be handled in catch block
```js
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
}).catch(alert); // Error: Whoops!

// Actual rejection code
new Promise((resolve, reject) => {
  reject(new Error("Whoops!"));
}).catch(alert); // Error: Whoops!

// or catches any error in any block
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
  throw new Error("Whoops!"); // rejects the promise
}).catch(alert); // Error: Whoops!

// not just manually raised errors
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
  blabla(); // no such function
}).catch(alert); // ReferenceError: blabla is not defined
```

## Rethrowing
Just like `try..catch` rethrowing errors, promise `catch` can also rethrow error that it can't handle itself.

```js
// the execution: catch -> then
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
}).catch(function(error) {
  console.log("The error is handled, continue normally");
}).then(() => console.log("Next successful handler runs"));

// the execution: catch -> catch -> then
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
}).catch(function(error) { // (*)
  if (error instanceof URIError) {
    // handle it
  } else {
    console.log("Can't handle such error");
    throw error; // throwing this or another error jumps to the next catch
  }
}).then(function() {
  /* doesn't run here */
}).catch(error => { // (**)
  console.log(`The unknown error has occurred: ${error}`);
  // don't return anything => execution goes the normal way
});
```

## Unhandled rejections
Unhandled rejections are treated the same way, if error is raise, but was not handled.
We need `window` level handler to handle all unhandled rejections in code itself.

```js
new Promise(function() {
  noSuchFunction(); // Error here (no such function)
})
  .then(() => {
    // successful promise handlers, one or more
  }); // without .catch at the end!

  window.addEventListener('unhandledrejection', function(event) {
  // the event object has two special properties:
  alert(event.promise); // [object Promise] - the promise that generated the error
  alert(event.reason); // Error: Whoops! - the unhandled error object
});

new Promise(function() {
  throw new Error("Whoops!");
}); // no catch to handle the error
```