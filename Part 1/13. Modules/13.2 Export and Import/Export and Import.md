# Export and Import
## Export before declarations
We can export any variable, function or class with prefixing with `export` keyword

```js
// export an array
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export a constant
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a function
export function sayHi() {
  console.log('Hi!')
}

// export a class
export class User {
  constructor(name) {
    this.name = name;
  }
}
```

We can all use `export` separately and list the things we want to export. Like this

```js
let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MODULES_BECAME_STANDARD_YEAR = 2015;

function sayHi() {
  console.log('Hi!')
}

const sayBye = () => console.log('Bye')

class User {
  constructor(name) {
    this.name = name;
  }
}

export {months, MODULES_BECAME_STANDARD_YEAR, sayHi, sayBye, User}
```

## Import
We can import only needed stuff by listing it in a `{}` braces

```js
import {sayHi, sayBye} from './aModule'
```

To import everything from a module, we may use this
```js
import * as mod from './aModule'
```
While this makes easy to import a list of stuff, but also makes it hard to mention it in the code. Because you need prefix every imported stuff with `mod` 

Also, module bundlers does a better job of optimization when we list things separately.

## Import `as`

We can use `as` to import a stuff and use it in different name
```js
// 📁 main.js
import {sayHi as hi, sayBye as bye} from './say.js';

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

## Export `as`
Similar to import as, you can export in different name
```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

## Export default
There are two kinds of modules.
1. Utilities that contain functions, variables, etc
2. A single entity like class

To export single entity modules, we can use `export default`. So when importing them you don't need to use `{}`. In fact you don't need to give a name while exporting default and you can give any name when importing defaults

```js
// 📁 user.js
export default class User { // just add "default"
  constructor(name) {
    this.name = name;
  }
}

// 📁 main.js
import User from './user.js'; // not {User}, just User

new User('John');

// exports without names
export default function(user) { // no function name
  alert(`Hello, ${user}!`);
}

// export a single value, without making a variable
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class { // no class name
  constructor(name) { 
    this.name = name;
   }
}

// Using it
import User from './aModule'
const myself = new User('Venkat')

// OR
import Person from './aModule'
const myself = new User('Raj')

// Because of no name in export, we can give our own while importing it

export class { // Error! (non-default export needs a name)
  constructor() {}
}
```

### The `default` name
This is useful when, sometimes, we export both default and group of utilities

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// same as if we added "export default" before the function
export {sayHi as default};

// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// 📁 main.js
import {default as User, sayHi} from './user.js';

new User('John');

// or
// 📁 main.js
import * as user from './user.js';

let User = user.default; // the default export
new User('John');
```

### A word against default exports
When we export things without a name, we could end up in trouble. Because for named exports we use this
```js
import {User} from './user.js';
// import {MyUser} won't work, the name must be {User}
```
But for unnamed default exports, we may end up like this
```js
import User from './user.js'; // works
import MyUser from './user.js'; // works too
// could be import Anything... and it'll still work
```
So team members may use different names to import the same thing, and that’s not good.

It is *best* to use single entity modules as much as possible and use consistent file name and module name

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
```

## Re-export
We can also re-export imported stuff when we write packages for public.
More details here
https://javascript.info/import-export#re-export

Syntax is as follows

```js
export {login, logout} from './helpers.js'; // re-export sayHi

export {default as User} from './user.js'; // re-export default


// It is exactly same as
// 📁 auth/index.js

// import login/logout and immediately export them
import {login, logout} from './helpers.js';
export {login, logout};

// import default as User and export it
import User from './user.js';
export {User};
```

