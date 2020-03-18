# Methods for prototypes

As we seen in prototypal inheritance article, __proto__ exists for historical reasons. It is deprecated now. We should use
* Object.create(proto[, descriptors]) – creates an empty object with given proto as [[Prototype]] and optional property descriptors.
* Object.getPrototypeOf(obj) – returns the [[Prototype]] of obj.
* Object.setPrototypeOf(obj, proto) – sets the [[Prototype]] of obj to proto.

instead.

To understand that we need to know javascript evolving history

* The "prototype" property of a constructor function has worked since very ancient times.
* Later, in the year 2012, Object.create appeared in the standard. It gave the ability to create objects with a given prototype, but did not provide the ability to get/set it. So browsers implemented the non-standard __proto__ accessor that allowed the user to get/set a prototype at any time.
* Later, in the year 2015, Object.setPrototypeOf and Object.getPrototypeOf were added to the standard, to perform the same functionality as __proto__. As __proto__ was de-facto implemented everywhere, it was kind-of deprecated and made its way to the Annex B of the standard, that is: optional for non-browser environments.

## Very plain object

We wanted to use objects as dictionaries, we should consider Map objects
If we know what we are doing, we can create as follows.
Remember that you won't have any methods from `Object.prototype`

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