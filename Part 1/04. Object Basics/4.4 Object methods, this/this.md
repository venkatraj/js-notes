# Object methods and `this`
Consider this object
```js
let user = {
  name: 'John Doe',
  age: 30
};
```

If we have this user object in our application then this user should be able to do some action such as log in, log out, add to cart, place order, make comment, etc

Such actions are represented in objects as functions in property name.

```js
let user = {
  name: 'John Doe',
  age: 30
};

user.sayHi = function() {
  console.log("hello")
};
user.sayHi(); // hello
```

As object literal
```js
let user = {
  name: 'John Doe',
  age: 30
  sayHi: function() {
    console.log("Hello");
  }
};
user.sayHi(); // Hello
```
In objects, a property with a function value is called `method`

Now we have `sayHi` method in `user` object.

## Method shorthand
```js

  // these objects do the same
  let user = {
    sayHi: function() {
      console.log("Hello");
    }
  };

  // method shorthand looks better, right?
  let user = {
    sayHi() { // same as "sayHi: function()"
      console.log("Hello");
    }
  };

```
## `this` in methods
Say we need a user object that can say its username. Sure we can write a `sayName` method in the `user` object, but how can that method access `name` property? To access its own properties, an object uses `this` keyword

Let us see an example
```js

  let user = {
    name: "John",
    age: 30,

    sayName() {
      console.log(`My name is ${this.name}`);
    }

  };
  user.sayName(); // My name is John

  let user = new Object()

```
During execution and with in method, `this` is same as refer `user.name` out side of object

Sure we can just use `user.name` inside of method too. Let us try that
```js
let user = {
  name: "John",
  age: 30,

  sayName() {
    console.log(`My name is ${user.name}`);
  }

};
user.sayName(); // My name is John
```

Code runs without any error. So what is the issue? Why `this` is needed? Consider this
```js
let user = {
  name: "John",
  age: 30,
  sayName() {
    console.log(`My name is ${user.name}`);
  }
};
let admin = user;
user.sayName(); // My name is John
admin.sayName(); // undefined. Because there is no `user.name` within `admin` object
```

## `this` is not bound
The value of `this` is determined during run time. The context decide the value of `this`
```js
function sayName() {
  console.log(this.name);
}
sayName(); // undefined
```
Here there is no `this` and no `name` property
Now consider this
```js

  var name = 'JavaScript'
  let user = { name: "John" };
  let admin = { name: "Admin" };

  function sayHi() {
    console.log( this.name );
  }

  // use the same functions in two objects
  user.f = sayHi;
  admin.f = sayHi;

  // these calls have different this
  // "this" inside the function is the object "before the dot"
  user.f(); // John  (this == user)
  admin.f(); // Admin  (this == admin)

  admin['f'](); // Admin (dot or square brackets access the method – doesn't matter)
  sayHi();

```

```js

  var name = 'Venkat';
  function sayHi() {
    console.log(`My name this ${this.name}`);
  }

  sayHi(); // My name is Venkat

```  
Consider below code and understand why `this` is unbound and its consequences.

```js

  "use strict"
  let user = {
    name: "John",
    hi() { console.log(this.name); },
    bye() { console.log("Bye"); }
  };

  user.hi(); // John (the simple call works)

  // now let's call user.hi or user.bye depending on the name
  (user.name == "John" ? user.hi : user.bye)(); // Error!

```

## Arrow functions have no `this`
It takes from outer function
```js

  let user = {
    firstName: "Ilya",
    sayHi() {
      let arrow = () => console.log(this.firstName);
      arrow();
    }
  };

  user.sayHi(); // Ilya

```
```js

  let ladder = {
    step: 5,
    up() {
      this.step++;
      return this;
    },
    down() {
      this.step--;
      return this;
    },
    showStep: function() { // shows the current step
      console.log( this.step );
      return this;
    }
  };

  ladder.up().up().down().showStep();
