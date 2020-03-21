# Promisification

`Promisification` is a process of converting a function that accepts a callback into a function that returns a promise.

```js
// A callback based function
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// usage:
// loadScript('path/script.js', (err, script) => {...})

// below code converts the above callback based function into a function that returns a promise
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err)
      else resolve(script);
    });
  })
}

// usage:
// loadScriptPromise('path/script.js').then(...)
```

We can even write `decoratorFunction` for promisification
```js
function promisify(f) {
  return function (...args) { // return a wrapper-function
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // append our custom callback to the end of f arguments

      f.call(this, ...args); // call the original function
    });
  };
};

// usage:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```
This is simple one expecting every function that accepts callback function with two arguments `(err, result)` 

We may need to write advanced version of this to handle other variations of callback functions (which accepts variable no. of arguments)

Or use libraries such as `es6-promisify` https://github.com/digitaldesignlabs/es6-promisify in browser OR in Node.js, the built-in `util.promisify`

### Please note:
Promisification is a great approach, especially when you use async/await (see the next chapter), but not a total replacement for callbacks.

Remember, a promise may have only one result, but a callback may technically be called many times.

So promisification is only meant for functions that call the callback once. Further calls will be ignored.