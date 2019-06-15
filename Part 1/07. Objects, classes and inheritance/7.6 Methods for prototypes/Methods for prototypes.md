# Methods for prototypes

```js

    // obj.__proto__ is Object.prototype
    let obj = {};
    
    // No obj.__proto__ can be used as associative array. 
    // Even we can use a "__proto__" keyword
    let veryPlainObj = Object.create(null);

    // Create a very plain object with non enumerable toString method
    let dictionary = Object.create(null, {
        toString: { // define toString property
            value() { // the value is a function
                return Object.keys(this).join();
            }
        }
    });

    dictionary.apple = "Apple";
    dictionary.__proto__ = "test";
    // comma-separated list of properties by toString
    alert(dictionary); // "apple,__proto__"

```

Exact copy of an object

```js

    let user = {
        name: 'Venkat'
    };

    Object.defineProperty(user, 'age', {
        value: 44
    });

    let admin = Object.create(Object.getPrototypeOf(user), Object.getOwnPropertyDescriptors(user));
    console.log(admin);


let id = Symbol('id');

let user = {
    [Symbol('id')]: 1,
    name: 'Venkat',
    age: 44
};

console.log(Object.keys(user));


let id = Symbol('id');

let user = {
    [id]: 1,
    name: 'Venkat',
    age: 44
};

console.log(Object.values(user));


let user1 = {
    [Symbol('id')]: 1,
    name: 'Venkat',
    age: 21
};

console.log(Object.entries(user1));

    let id = Symbol('id');
    let user2 = {
        [id]: 2,
        name: 'Raj',
        age: 22
    };
    console.log(Object.entries(user2));


```

Excercise 1
```js

    let dictionary = Object.create(null, {
        toString: {
            value() {
                return Object.keys(this).join(', ');
            }
        }
    });

    // add some data
    dictionary.apple = "Apple";
    dictionary.__proto__ = "test"; // __proto__ is a regular property key here

    // only apple and __proto__ are in the loop
    for(let key in dictionary) {
        alert(key); // "apple", then "__proto__"
    }

    // your toString in action
    alert(dictionary); // "apple,__proto__"

```