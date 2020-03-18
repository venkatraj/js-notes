# Prototypal inheritance

In traditional OOP languages such as PHP, we can `extend` a class and have access to properties and methods of parent class. Similar feature, but unique to javascript is Prototypal Inheritance.

# [[Prototype]]
`[[Prototype]] is a hidden property that refers to either `null` or an object. That referred object is `a prototype`

For example, if we have a object `user` and want to create another object `admin` which has all properties and methods of user object with additional properties such as `isAdmin`

```js

    let user = {        
        set name() {
            this._name = name;
        },
        get name() {
            return this._name
        },
        login() { /* code to login */ },
        logout() { /* code to logout */ }
    };

    let admin = {        
        set name() {
            this._name = name;
        },
        get name() {
            return this._name
        },
        login() { /* code to login */ },
        logout() { /* code to logout */ },
        isAdmin: true
    };

```
In the above example both object shares some properties and methods which results in redundancy. We can eliminate this by using prototypal inheritance

```js

    let user = {        
        set name(name) {
            this._name = name;
        },
        get name() {
            return this._name
        },
        login() { /* code to login */ },
        logout() { /* code to logout */ }
    };

    let admin = {        
        isAdmin: true,
        __proto__: user
    };

    admin.name = 'admin';
    console.log(admin.name);
    console.log(admin);

```

*NOTE:* __proto__ is a historical getter/setter for [[Prototype]]
Specification says only browser env. supports it, but in practice server side env. also supports it. A better approach is to use
`Object.setPrototypeOf(obj)` and `Object.getPrototypeOf(obj)`

Prototypal inheritance examples
```js

    let animal = {
        eats: true
    };

    let rabbit = {
        jumps: true
    };

    rabbit.__proto__ = animal;

    // we can find both properties in rabbit now:
    alert( rabbit.jumps ); // true - Property exists in object itself
    alert( rabbit.eats ); // true - Property doesn't exists in object
    // JS engine looks up further in prototype chain
    // Finds it and returns it. If prototype object doesn't have eats property
    // or it is null value, then undefined is returned.

```

Prototype chain can be longer

```js

let animal = {
  eats: true,
  walk() {
    alert("Animal walk");
  }
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

let longEar = {
  earLength: 10,
  __proto__: rabbit
}

// walk is taken from the prototype chain
longEar.walk(); // Animal walk
alert(longEar.jumps); // true (from rabbit)

```
### Limitations
1. Can't have circular references
2. __proto__ should be an object or null. Other values are ignored


## Read/Write Rules
With data properties, if you read a property, it will be looked up in object and then in prototype chain.
If you write a property, a property will be created in referenced object, even though same named property exists in prototype object. It won't be overwrote, because chances are it is also prototype to another object. Think of `user` object as prototype to `admin`, `customer` and so on.

For `accessor` property, both reading and writing will look up in object and then in prototype. Setter creates new properties in referenced objects

```js

    let user = {
        name: 'Venkat'
    };

    let admin = {
        isAdmin: true,
        __proto__: user
    };

    console.log(admin.name);
    admin.name = 'Admin'; 
    
    // name property created in admin object

    
    let user = {
        name: "John",
        surname: "Smith",
        set fullName(value) {
            [this.name, this.surname] = value.split(" ");
        },
        get fullName() {
            return `${this.name} ${this.surname}`;
        }
    };

    let admin = {
        __proto__: user,
        isAdmin: true
    };

    console.log(admin.fullName); 
    admin.fullName = "Alice Cooper";
    console.log(user)
    console.log(admin)

```

In the above example, name and surname properties are created in `admin` object because of the `fullName` setter which is in `user` object. It leaves values of `name` and `surname` properties of `user` object intact.

## The value of `this`

```js

    let animal = {
        walk() {
            if (!this.isSleeping) {
            alert(`I walk`);
            }
        },
        sleep() {
            this.isSleeping = true;
        }
    };

    let rabbit = {
        name: "White Rabbit",
        __proto__: animal
    };

    rabbit.sleep();
    console.log(rabbit.isSleeping); // true
    console.log(animal.isSleeping); // undefined 

```

Again, even when using `this` any property creation will happen only on referenced object, not in objects that are in prototype chain.

## for...in loop
for...in loop displays inherited properties too. To filter out inherited properties, we need to use `obj.hasOwnProperty(key)` method.

```js
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

for(let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    alert(`Our: ${prop}`); // Our: jumps
  } else {
    alert(`Inherited: ${prop}`); // Inherited: eats
  }
}
```

Actually, neither `rabbit` nor `animal` has `hasOwnProperty` method but it is still available. Because `animal` object's prototype is `Object.prototype`

In a `for...in` Object.prototype properties are not displayed because they are non enumerable.

`rabbit.__proto__ => animal.__proto__ => Object.prototype.__proto__ => null` 

Almost all other key/value-getting methods ignore inherited properties, like `Object.keys` and `Object.values`

## Exercises

### Working with prototype
Here’s the code that creates a pair of objects, then modifies them.
Which values are shown in the process?

```js
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

console.log( rabbit.jumps ); // ? (1) => true
delete rabbit.jumps;

console.log( rabbit.jumps ); // ? (2) => null
delete animal.jumps;

console.log( rabbit.jumps ); // ? (3) => undefined
```

### Searching algorithm
The task has two parts.
Given the following objects:
```js
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
```

1. Use __proto__ to assign prototypes in a way that any property lookup will follow the path: pockets → bed → table → head. For instance, pockets.pen should be 3 (found in table), and bed.glasses should be 1 (found in head).

2. Answer the question: is it faster to get glasses as pockets.glasses or head.glasses? Benchmark if needed.
**SOLUTION**
```js
let head = {
  glasses: 1
};

let table = {
  pen: 3,
  __proto__: head,
};

let bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table,
};

let pockets = {
  money: 2000,
  __proto__: bed,
};
// Accessing head.glasses is faster than pockets.glasses (theory)
// But In modern engines, performance-wise, there’s no difference whether we take a property from an object or its prototype. 
```

### Where does it write?
We have rabbit inheriting from animal.
If we call rabbit.eat(), which object receives the full property: animal or rabbit?

```js
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
// Answer: rabbit
```

### Why are both hamsters full?
We have two hamsters: speedy and lazy inheriting from the general hamster object.

When we feed one of them, the other one is also full. Why? How can we fix it?

```js
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
    // or fix by using below
    // this.stomach = [food]
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// This one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// This one also has it, why? fix please.
alert( lazy.stomach ); // apple

// Because `this.stomach.push('apple')` is not same as `this.stomach = 'apple', so the value `apple` is pushed to stomach property of basic hamster object.

// To fix, we may add `stomach: []` to both speedy and lazy hamsters
```