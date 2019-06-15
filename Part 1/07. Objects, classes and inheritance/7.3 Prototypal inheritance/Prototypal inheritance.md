# Prototypal inheritance

In traditional OOP languages such as PHP, we can `extend` a class and have access to properties and methods of parent class. Similar feature, but unique to javascript is Prototypal Inheritance.

# [[Prototype]]
`[[Prototype]] is a hidden property that refers to either `null` or an object. That referred object is `a prototype`

For example, if we have a object `user` and want to create another object `admin` which has all properties and methods of user object with addtional properties such as `isAdmin`

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
In the above example both object shares some properties and methods which results in redudency. We can eliminate this by using prototypal interitance

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
    // JS enginer looks up further in prototype object
    // Finds it and retuns it. If prototype object doesn't have eats property
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
With data properties, if you read a property, it will be looked up in object and then in prototype.
If you write a property, a property will be created in referenced object, even though same named property exists in prototype object. It won't be overwrited, because chances are it is also prototype to another object. Think of `user` object as prototype to `admin`, `customer` and so on.

For `accessor` property, both reading and writing will look up in object and then in prototype.

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

    alert(admin.fullName); 
    admin.fullName = "Alice Cooper";

```

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