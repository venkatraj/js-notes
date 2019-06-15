# Constructor, Operator "new"
Object literals allows you to create a single object. If you want to create multiple objects of same type, you need `Constructor functions` and `new` operator

## Constructor function
It is same as regular function with 2 conventions.
1. Function name begins with Capital letter
2. Should be called with `new` operator

For example:
```js

    function User(name) {
        this.name = name;
        this.isAdmin = false;
    }

    let user = new User("Jack");

    console.log(user.name); // Jack
    console.log(user.isAdmin); // false

```

We can rewrite the above function like below to illustrate what is going on.

```js

    function User(name) {
        // this = {} (implicit operation)
        this.name = name;
        this.isAdmin = false;
        // return this; (implicit operation)
    }

```

So the result of new User("Jack") is the same object as:
```js

    let user = {
        name: "Jack",
        isAdmin: false
    };

```

The main purpose of constructors are to implement reusable object creation code.

## Dual-syntax constructors: new.target
Inside a function, we can check whether it was called with new or without it, using a special new.target property.

It is empty for regular calls and equals the function if called with new:
```js

    function User() {
        console.log(new.target);
    }

    // without new:
    User(); // undefined

    // with new:
    new User(); // return an empty object of type User { ... }

```
That can be used to allow both new and regular syntax to work the same:
```js

    function User(name) {
    if (!new.target) { // if you run me without new
        return new User(name); // ...I will add new for you
    }

    this.name = name;
    }

    let john = User("John"); // redirects call to new User
    console.log(john.name); // John

```

## Return from constructors
Usually, there will be no return statement in constructor functions. It will return `this` by default.

If there is an explicit `return` statement in constructor function, then it follows these rules
1. If return is called with object, then it is returned instead of this.
2. If return is called with a primitive, it’s ignored.

Constructor function with return statement will return object, if associate with object or return `this`

```js

    function BigUser() {
        this.name = "John";
        return { name: "Godzilla" };  // <-- returns an object
    }
    console.log( new BigUser().name );  // Godzilla, got that object ^^

    function SmallUser() {
        this.name = "John";
        return; // finishes the execution, returns this
    }
    console.log( new SmallUser().name );  // John

```

## Methods in constructor
You can add methods to constructor function in the same way you do in object literals
```js

    function User(name) {
        this.name = name;
    
        this.sayHi = function() {
            alert( "My name is: " + this.name );
        };
    }

    let john = new User("John");
    john.sayHi(); // My name is: John

```