# Modules, Introduction
Until recently, we used multiple script tags to multiple scripts. For example, first we load jQuery and then load code that uses jquery syntax.

Loading list of script one by one has its disadvantages. All variables and functions are visible to other scripts and polluting the global scope. For example, jquery uses `$` as its main function and so is other libraries like prototypejs.org

Later libraries are made to organize code into modules such as
* AMD - requirejs
* CommonJS
* UMD

## What is a module?
Like python modules, a javascript module is just a file. 

We can use `export` keyword to make specific variables and functions visible to outside of current module

We could use `import` keyword to use functionalities of other modules that exported it.

In `sayHi.js`
```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

In `main.js`
```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
```

To tell the browser to treat a script as a module, we need to use `<script type="module">`


## Core module features
### Always runs in "use strict" mode
```html
<script type="module">
  a = 5; // error, variable needs to be declared in strict mode
</script>
```
### Module level scope
Each module has its own top level scope. i.e. other modules variables and functions are not seen in other scripts. We need to explicitly export and import in order to use each other

Let us demonstrate it in `inline module` it is same in external module as well

```html
<script type="module">
  let user = 'Venkat'
</script>

<script type="module">
  console.log(user) // ReferenceError: user is not defined
</script>
```

You can use `export/import` if both modules are external. You need to make global variable `user` then you have to declare it as `window.user = 'Venkat'` which is highly not recommended.

## A module code is evaluated only the first time when imported.

```js
// 📁 alert.js
alert("Module is evaluated!");
```

```js
// Import the same module from different files

// 📁 1.js
import `./alert.js`; // Module is evaluated!

// 📁 2.js
import `./alert.js`; // (shows nothing)
```

It is fine, because modules are used to share reusable code, not to run top level code every time they are imported

```js
// 📁 admin.js
export let admin = {
  name: "John"
};

// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

// Both 1.js and 2.js imported the same object
// Changes made in 1.js are visible in 2.js
```

This `once` evaluated feature can be used to our advantage like setting `configuration` objects

```js
// 📁 admin.js
export let admin = { };

export function sayHi() {
  alert(`Ready to serve, ${admin.name}!`);
}

// 📁 init.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 other.js
import {admin, sayHi} from './admin.js';

alert(admin.name); // Pete

sayHi(); // Ready to serve, Pete!
```

## import.meta
The object import.meta contains the information about the current module. Content depends on env.
```html
<script type="module">
  alert(import.meta.url); // script url (url of the html page for an inline script)
</script>
```

## In a module, `this` is `undefined` (not global)
```html
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

## Browser specific features

### Module scripts are deferred.

Module scripts are always deferred, same effect as defer attribute. So no `render blocking`

And also scripts wait until the HTML document is fully ready. That means it has in built
```js
$(document).ready(function() {

})
```
or it is as if module code is wrapped with
```js
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});
```

A practical example of this
```html
<script type="module">
  alert(typeof button); // object: the script can 'see' the button below
  // as modules are deferred, the script runs after the whole page is loaded
</script>

Compare to regular script below:

<script>
  alert(typeof button); // Error: button is undefined, the script can't see elements below
  // regular scripts run immediately, before the rest of the page is processed
</script>

<button id="button">Button</button>
```

Regular script don't see `button` because it is loaded and executed first before html is fully loaded (i.e. button tag)

Where as `module` can see `button` because it is deferred, so it is loaded after html is loaded and executed after page is fully loaded

*NOTE* if you page needs javascript to work, then displaying html page (as it loads first) without js can be confusing. So you need to put `loading indicators` while everything is loading.

### Async works on inline script
For non-module scripts, the async attribute only works on external scripts. Async scripts run immediately when ready, independently of other scripts or the HTML document.

For module scripts, it works on inline scripts as well.

Async scripts are best to use for analytical scripts, advertisement scripts, etc
```html
<!-- all dependencies are fetched (analytics.js), and the script runs -->
<!-- doesn't wait for the document or other <script> tags -->
<script async type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### External scripts
1. external script with same `src` run only one
```html
<!-- the script my.js is fetched and executed only once -->
<script type="module" src="my.js"></script>
<script type="module" src="my.js"></script>
```

2. External script fetched from different domain needs CORS header `Access-Control-Allow-Origin`

```html
<!-- another-site.com must supply Access-Control-Allow-Origin -->
<!-- otherwise, the script won't execute -->
<script type="module" src="http://another-site.com/their.js"></script>
```

### No `bare' modules allowed

This `import` is invalid
```js
import {sayHi} from 'sayHi'; // Error, "bare" module
// the module must have a path, e.g. './sayHi.js' or wherever the module is
```
Though you can see `bare` imports in `ReactJS` applications. Some env. allows `bare` imports but not `browsers`

In react js case, we use module bundlers, so it is `webpack` like module bundlers that is responsible to resolve the `bare` module locations

### Compatibility `nomodule`
Old browsers do not understand type="module". Scripts of an unknown type are just ignored. For them, it’s possible to provide a fallback using the nomodule attribute:

```html
<script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script>
```