# Property getters and setters
There are two kinds of properties
1. data properties
2. accessor properties
`accessor`properties are functions which work on getting and setting a value.

## Getters and Setters

```js

    let user = {
        name: "John",
        surname: "Smith"
    };

    let user = {
        name: 'John',
        surname: 'Smith',
        get fullName() {
            return `${this.name} ${this.surname}`;
        },
        set fullName(value) {
            [this.name, this.surname] = value.split(' ');
        }
    }

    console.log(user.fullName); // 'John Smith'
    user.fullName = "Awesome Dude";
    console.log(user.name); // 'Awesome'
    console.log(user.surname); // 'Dude'
    console.log(user.fullName); // 'Awesome Dude'

```

## Accessor descriptors

Accessor property descriptors are same as data property descriptors, except that there is no `value` and `writable` flags in accessor. Instead they have `set` and `get`

We can rewrite the above example with `Object.defineProperty()` method

```js

    let user = {
        name: 'John',
        surname: 'Smith'
    };

    Object.defineProperty(user, 'fullName', {
        get() {
            return `${this.name} ${this.surname}`;
        },
        set(value) {
            [this.name, this.surname] = value.split(' ');
        },
        enumerable: true
    });

    for(let key in user) console.log(key);

```


```js

    let user = {
        name: 'Venkat',
        get lang() {
            return 'js';
        }
    };

    user.lang; // "js"
    user.lang = 'JavaScript'; // Won't work
    // 'lang' can't be both data and accessor property

    // TypeError: Invalid property descriptor.

    Object.defineProperty({}, 'prop', {
        get() {
            return 1
        },

        value: 2
    });

```

## Smart getters and setters

As we know a property can't be both data and accessor properties.
What if we want to validate value before setting it? The `setter` is a function and can handle this. Unfortunately it can't store a value of its own. In the previous example, the `fullName` handles the calculation, but it can't store a value.

To do just that we have smart getters and setters. For example, let us say we want to check the length of `name` property before setting it. For that we can use `_name` as data property and `name` as accessor property

```js

    let user = {
        set name(value) {
            if (value.length < 4) {
                alert("Name can't be less than 4 characters");
                return;
            }
            this._name = value;
        },
        get name() {
            return this._name;
        }
    };

    user.name = 'raj'; // error
    user.name = 'Venkat';
    console.log(user);

```