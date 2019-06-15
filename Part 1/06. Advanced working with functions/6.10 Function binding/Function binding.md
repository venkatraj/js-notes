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