# Async/await

## Async
To make a function always return a Promise, we use `async`. Remember that promisification is different from this. It transforms a callback format into a promise. Whereas this makes the return value a Promise

```js
async function f() {
  return 1;
}

f().then(alert); // 1

// OR use explicit promise return
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

So, async ensures that the function returns a promise, and wraps non-promises in it. 

## Await
The keyword await makes JavaScript wait until that promise settles and returns its result.

```js
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  // works only inside async functions
  let result = await promise; // wait until the promise resolves (*)

  alert(result); // "done!"
}

f();
```

### Can’t use await in regular functions
```js
function f() {
  let promise = Promise.resolve(1);
  let result = await promise; // Syntax error
}
```

```js
async function showAvatar() {

  // read our JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // show the avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

### await won’t work in the top-level code
```js
// syntax error in top-level code
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

// Solve it if IIFE
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

### await accepts "thenables"
The idea is that a third-party object may not be a promise, but promise-compatible: if it supports `.then`, that's enough to use it with await.
```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // resolve with this.num*2 after 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
};

async function f() {
  // waits for 1 second, then result becomes 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

### Async class methods
```js
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1
```

## Error handling

```js
async function f() {
  await Promise.reject(new Error("Whoops!"));
}

// Above code is same as
async function f() {
  throw new Error("Whoops!");
}

// So, basically await is replacement for `.then`
// for `.catch` we need to do this
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}

f();

// or this
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() becomes a rejected promise
f().catch(alert); // TypeError: failed to fetch // (*)
```

### async/await and promise.then/catch
When we use `async/await`, we rarely need `.then`, because await handles the waiting for us. And we can use a regular `try..catch` instead of `.catch`. 

### async/await works well with Promise.all
```js
// wait for the array of results
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

## Exercises

### Rewrite using async/await
```js
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404

// SOLUTION
async function loadJson(url) {
    try {
      let response = await fetch(url)
      if (response.status == 200) {
        return await response.json()
      } else {
        throw new Error(response.status)
      }
    } catch(err) {
      console.log(err)
    }
  }

  loadJson('no-such-user.json')
```

### Rewrite "rethrow" with async/await
```js
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    })
}

// Ask for a user name until github returns a valid user
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();