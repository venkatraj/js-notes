# Function binding

## Losing `this`
```js

  let user = {
    firstName: "John",
    sayHi() {
      alert(`Hello, ${this.firstName}!`);
    }
  };

  setTimeout(user.sayHi, 1000); // Hello, undefined!

```

## Solution1: Wrapping
```js

    let user = {
      firstName: "John",
      sayHi() {
        alert(`Hello, ${this.firstName}!`);
      }
    };

    setTimeout(() => user.sayHi(), 1000); // Hello, John!
    setTimeout(function() {
      user.sayHi();
    }, 1000); // Hello, John!

```

## Solution 2 Bind
```js

  let user = {
    firstName: "John",
    sayHi() {
      alert(`Hello, ${this.firstName}!`);
    }
  };

  setTimeout(user.sayHi.bind(user), 1000); // Hello, John!


```

## bindAll
```js

  let user = {
    firstName: "Venkat",
    sayHi() {
      console.log(`Hello, ${this.firstName}`);
    },
    sayBye() {
      console.log(`Bye, ${this.firstName}`);
    },
    command() {
      console.log(`Get back to work, Mr.${this.firstName}`);
    }
  }

  setTimeout(user.sayHi, 3000);
  setTimeout(user.command, 3000);
  setTimeout(user.sayBye, 3000);

  // Let's bindAll
  for(let key in user) {
    if (typeof user[key] == 'function') {
      user[key] = user[key].bind(user);
    }
  }

  setTimeout(user.sayHi, 3000);
  setTimeout(user.command, 3000);
  setTimeout(user.sayBye, 3000);

```

## No rebounding 

```js

  function f() {
    alert(this.name);
  }

  f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

  f();

```

## Custom properties are not available after bound

```js

  function sayHi() {
    alert( this.name );
  }
  sayHi.test = 5;

  let bound = sayHi.bind({
    name: "John"
  });

  alert( bound.test ); // what will be the output? why?

```

## Partial Functions
We can not only bind context, but can also bind arguments to fixed value.

```js
function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2);

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

This is called `partial function application` (in Comp. Sci.) – we create a new function by fi

## Going partial without context

```js
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}

// Usage:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// add a partial method with fixed time
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] John: Hello
```

## Exercises

### Bound function as a method
What will be the ouput?
```js
function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();

// In normal mode, window
// In strict mode, null
```

### Second bind
Can we change this by additional binding?
What will be the output?
```js
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();


// NO, no rebound 
// Output: John
```

### Fix a function that loses "this"

```js
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

askPassword(user.loginOk, user.loginFail);
```