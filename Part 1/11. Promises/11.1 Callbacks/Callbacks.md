# Introduction: Callbacks

When we schedule a code, it will run after the current script is completely ran.

```js
console.log('Start')
setTimeout(() => console.log('This will be executed after current script, even though it should run with no delay'), 0)
for (let i = 0; i < 1000; i++) {
  console.log('Still running current script')
}

console.log('With this current script ends')
console.log('now scheduled script will run')
```

Likewise, if we load a script dynamically, it will be executed after current script is done. But if we want to use variables and functions in the dynamically loaded script, we need to know, if the loading is completed or not.

If we try to use the variables and functions before loading is complete, there will be ReferenceErrors

```js
function loadScript(src) {
  // creates a <script> tag and append it to the page
  // this causes the script with given src to start loading and run when complete
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}

// load and execute the script at the given path
loadScript('/my/script.js');
newFunction(); // no such function!
```

To solve the issue, the concept of callback functions are introduced. Remember that functions are object and we can pass around that and execute it when needed.

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the script ${script.src} is loaded`);
  alert( _ ); // function declared in the loaded script
});
```

This works fine when there is only one script to load or one request / response to server. Becomes problematic when trying to run multiple asyn. scripts.

## Callback in callback

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

    loadScript('/my/script3.js', function(script) {
      // ...continue after all scripts are loaded
    });

  })

});
```

It becomes even more troublesome, when we have multiple nested script with error handling code as well.

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

loadScript('/my/script.js', function(error, script) {
  if (error) {
    // handle error
  } else {
    // script loaded successfully
  }
});
```

## Pyramid of Doom
OR *Callback Hell*
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

It is harder to read and maintain, even if we use functions to divide code to manageble chunk

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

`Promises` are the answer to this issue.

