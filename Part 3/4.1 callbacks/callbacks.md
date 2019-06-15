# Callbacks
Many actions in JS are asynchronous.
Meaning that you may request weather data from other server (https://openweathermap.org/)
While your script is communicating with other server, rest of your script continues to execute other statements

Consider this example
```js
function loadScript(src) {
    let script = document.createElement('script');
    script.src = src;
    document.head.append(script);
}

loadScript('js/script.js');
```
What this does is creating a `<script src="js/script.js"></script>` element and append it to document's `<head>` section.
Then it does loads `js/script.js` while the process is going on the script that has `loadScript` continues to execute.
The `loadScript` function is called asynchrounous because while it executes and loads a script, rest of the script is executing.
```js
loadScript('/my/script.js');
// the code below loadScript doesn't wait for the script loading to finish
// ...
```

Let us say we have a function called `newFunction` in `my/script.js` file and we write like this
```js
loadScript('/my/script.js'); // the script has "function newFunction() {…}"
newFunction(); // no such function!
```
Because after calling `loadScript` it immediately start executing `newFunction`, but chances are that `loadScript` may not have finished loading `my/script.js` file and that makes `newFunction` unavailable immediately. It will only be available when the script is finished loading `script.js` file

So to make this work, we need to track the load completion of `script.js` file. And only upon load completion, we should execute `newFunction`. Such mechanism is called `callback` function. Let us see an example
```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}
loadScript('/my/script.js', function() {
  // the callback runs after the script is loaded
  newFunction(); // so now it works
  ...
});
```

Practical examples
```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = callback(script);
  document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', function(script){
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // function declared in the loaded script
});
```

### Variations
```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = function() {
      callback(script);
  };
  document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', function(script) {
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // function declared in the loaded script
});
// Arrow functions
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', (script) => {
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // function declared in the loaded script
});
```

## Callback in callback
Say we load weather data and then we want to load another script that handles that data. Then we handles the data.
That means that I need to load a script and after completing it, I need to load another script and then only I can do something with the first script.
```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', function(script) {
  alert(`Cool, the ${script.src} is loaded`);
  console.log(_)
  loadScript('http://code.jquery.com/jquery-3.3.1.slim.min.js', function(script) {
    alert(`Cool, jQuery is loaded`);
    console.log($);
  });
});
```

What if we want one more script to load?
```js
loadScript('/my/script.js', function(script) {
  loadScript('/my/script2.js', function(script) {
    loadScript('/my/script3.js', function(script) {
      // ...continue after all scripts are loaded
    });
  })
});
```
Now you can realize that this can get really complex when we have a hand ful of callbacks.

## Handling errors
In the above example, What will happen if the script is failed to load? To handle such situations our callback function should be able to handle both success and failure of the script.
```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
  document.head.append(script);
}

loadScript('/my/script.js', function(error, script) {
  if (null !== error) {
    // handle error
  } else {
    // script loaded successfully
  }
});
```
Here the `callback` function is called like this `callback(null, script)` then script loading is successful.
Otherwise it is called like `callback(error)`. This style is called `error first callback`
In `error first callback`, 
1. The first argument is reserved for error condition.
2. The second argument and next ones are used for success condition

In other words, on error call will be `callback(error)` and on success call will be `callback(null, result1, result2, ...)`

## Callback Hell (or Pyramid of doom)
Consider this code
```js
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...continue after all scripts are loaded (*)
          }
        });

      }
    })
  }
});
```
You can image the complexity of reading and managing about code, if it has couple of more callback and there is real code instead of `...` This is called callback hell or pyramid of doom.

We can try to simplify it like this
```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continue after all scripts are loaded (*)
  }
};
```

This is much better to read and understand especially when we have callback functions named after `steps` What if those callback functions are different, real world, what I'm doing names such as `loadLodashAndExecute`, `loadReact` and so on. It is difficult to follow and see the execution flow. Also the `step*` function aren't meant to reuse, so we let go anonymous functions only to clutter our namespace.



