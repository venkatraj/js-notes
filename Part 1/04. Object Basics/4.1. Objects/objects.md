# Objects
Objects are collections of stored `key: value` pairs. All items in a object is called a property. That means every `key: value` pair is a property. `key` is called property name and `value` is called property value

There are two ways to create an object
1. Object constructor
2. Object literal

```js
let user1 = new Object();
user1.name = 'John';
user1.age = 30;

let user2 = {
  name: 'Venkat',
  age: 43
};
```

```js
let obj1 = new Object();
let obj2 = {};
```
With object literals, we can immediately start to add properties, like so.

```js
let user = {
  name: 'JavaScript',
  age: 22
}
console.log(user);
```

Where are with Object constructor, we do this
```js
let language = new Object();
language.name = "JavaScript";
language.age = 22;
console.log(language);
```

You can retrieve individual property values like this `console.log(language.age)`

Property value can be any of 8 types. Meaning that it is not restricted to number and string, but it can be boolean, undefined, null, symbol and object

You can delete a property using `delete` operator, like so `delete language.age`

Objects in javascript allows trailing commas as in php arrays.

```js
let job = {
  title: "Front End Developer",
  skills: "HTML, CSS, JS",
  salary: "6 digits",
}

delete job.salary;
```

```js
let complexObj = {
  id: 1,
  name: 'Complex Object',
  dependable: true,
  default: null,
  shouldNot: undefined,
  child: {
    title: "Front End Developer",
    skills: "HTML, CSS, JS",
    salary: "6 digits",
  }
  uniqueID: Symbol('unique'),
}
```
Please note that JSON objects don't allow trailing commas. Since they look same as JS, it can be easy to get confused. If you open user settings in Sublime Text editor (and like) what you see is not JS object, but its JSON object.

Property name can be more than a single word. In that case it should be quoted.
```js

  let programmer = {
    name: "John Doe",
    age: 30,
    "likes js": true  // multiword property name must be quoted
  };

  console.log(programmer["likes js"]); // true

  let fav = "likes js";
  console.log(programmer[fav]); // true

```
This presents a difficulty and opportunity.
To use dot notation to retrieve property values, the property name should be like variable name. i.e. It can't contain any special chars (like space) other than `_ and $` and should start with a alphabet, _ or $ (not number)

So we can't use like this `programmer.likes js`, instead we should use square brackets like this `programmer["likes js"]`

It presents an opportunity that we can mention a variable name instead quoted string in square brackets, like so.

```js
let fav = "likes js";
console.log(programmer[fav]); // true
```
This presents another opportunity to retrieve property values dynamically based on user's choice.

```js
let programmer = {
  name: "John",
  age: 30,
  fav: "JavaScript",
};

let key = prompt("What do you want to know about the programmer?", "fav");

// access by variable
console.log( user[key] ); // JavaScript (if enters "fav")
```

## Computed properties

Just like you can access properties with variables, you can define it too.
```js

  let fruit = prompt("Which fruit to buy?", "apple");

  let bag = {
    [fruit]: 5, // the name of the property is taken from the variable fruit
  };

  console.log( bag.apple ); // 5 if fruit="apple"

```


We can use more complex expressions inside square brackets:
```js

  let fruit = 'apple';
  let bag = {
    [fruit + 'Computers']: 5 // bag.appleComputers = 5
  };

```
Reserved words are allowed as property names, but it is best not to use and confuse.

## Property value shorthand
In real code we often use existing variables as values for property names.

For instance:
```js

  function makeUser(name, age) {
    return {
      name: name,
      age: age
      // ...other properties
    };
  }

  let user = makeUser("John", 30);
  console.log(user.name); // John

```

With special property value shorthand, instead of writing `name: name` we can just write `name`
```js

  function makeUser(name, age) {
    return {
      name, // same as name: name
      age   // same as age: age
      // ...
    };
  }

```

## Property names limitations
Property names should be either a string or symbol. That said, we can create an object like so,
```js
const someObj = {
  1: 'Number One',
  true: 'True?'
}

console.log(someObj["1"])
console.log(someObj[1])
console.log(someObj["true"])
console.log(someObj[true])
```

By looking at the above code, you can tell that the property name is automatically converted to a string. it also reveals that you can use reserved words as property names. But I highly recommend not doing so


## Existence Check
You can access any property of an object, even the one that doesn't exists. It just returns `undefined`
```js

  let programmer = {
    name: 'John Doe',
    age: 30
  };

  console.log(programmer.salary); // undefined

```

So to check existence of a property, you will do this
```js
let programmer = {
  name: 'John Doe',
  age: 30
};
if (programmer.salary === undefined) {
  console.log('No such property exists');
} else {
  console.log('Salary of ' + programmer.name + ' is ' + programmer.salary);
}
```
That presents a difficulty, consider this
```js
let programmer = {
  name: 'Jone Doe',
  age: 30,
  salary: undefined
};
```
Now the property exists, but undefined is assigned to it. It is rare case, we should usually use `null` to unknown, empty value not `undefined` but still this is what expected.

To overcome such issue, a special operator called `in` exists in JS.
```js

  let programmer = {
    name: 'Jone Doe',
    age: 30,
    salary: undefined
  };
  console.log("salary" in programmer); // true property exists
  console.log("company" in programmer); // false, property does not exists

```
Note that the property name should be a quoted string or a variable that contains the property name.
```js

  let programmer = {
    name: 'Jone Doe',
    age: 30,
  };

  console.log("name" in programmer); // true
  let key = "age"
  console.log(key in programmer); // true

```
Using variable as property name accompany with new `for..in` loop to iterate through a object's properties.

### `for...in` loop Syntax
```js
for(prop in object) {
  // this for loop iterates through object, get each property name and stores it in prop variable
}
```

### Practical Example:
```js

  let user = {
    name: "John",
    age: 30,
    isAdmin: true
  };

  for(let prop in user) {
    // properties
    console.log( prop );  // name, age, isAdmin
    // values for the properties
    console.log( user[prop] ); // John, 30, true
  }

```

The variable name `prop` can be anything (like key) but `prop` is widely used and explains that it holds property name.

## Are objects ordered?
Are objects will loop through its properties as they are added? Will there be a internal sorting happens?
Answer to above question is both `Yes` and `No`

```js
let codes = {
  "44": "Chennai",
  "11": "Delhi",
  "22": "Mumbai",
  "33": "Kolkata"
};

for(let code in codes) {
  console.log(code); // 1, 41, 44, 49
}

let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // add one more

// non-integer properties are listed in the creation order
for (let prop in user) {
  console.log( prop ); // name, surname, age
}
```
From the above examples you see that integer properties are sorted in ascending order and other property names are iterate as they were added.

By integer property name, We mean that, It can be converted to integer and then convert back to string with out changing values. If value is changed by conversion, then it is not integer property

Let us clarify it with an example
```js
// Math.trunc is a built-in function that removes the decimal part
console.log( String(Math.trunc(Number("49"))) ); // "49", same, integer property
console.log( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
console.log( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property
```
If you don't want to sort integer properties (like the phone code example, you need to cheat with _ or something else)
```js
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for(let code in codes) {
  console.log( +code ); // 49, 41, 44, 1
}
```
## Copying by reference
The difference between primitive types and objects is that primitive types are copy by value where as objects are copied by reference.

In other words. when you copy a primitive type to another variable, then the content are copied to another memory location and that location now has a new name.

With objects, only memory location's address it copied to another variable. This makes that both variables has same memory address and as result, both are pointing to same object data.

So If you change one variable's object, it will be reflected in another variable.

Let us see examples to clarify things
```js
let a = 10;
let b = 10;
alert(a); // 10
alert(b); // 10
a = 12;
alert(a); // 12
alert(b); // 10 unchanged. changing `a` won't affect `b`

let user = {
  name: 'John Doe',
  age: 30
}

let programmer = user;

alert(user);
alert(programmer);
user.name = 'Mark';
alert(user);
alert(programmer);
```

## Comparison by reference
two objects are equal and identical when they are pointing to same object in memory
```js
let a = {};
let b = a;
console.log(a == b); // true
console.log(a === b); // true

let c = {};
let d = {};
console.log( c == d ); // false
console.log( c === d ); // false
```
Last one is false because even though both `c` and `d` has empty objects they are point to diffent memory locations

## Const object
An object declared as const can be changed.
This is where mutable and immutable terms comes to place. mutable means you can reassign values, immutable means you can't reassign values.
`const` are immutables so you can't reassign values. This rule is simple with primitive data types. However, with object you can change object's content rather than object.

That means that you can't reassign another object to a const object, but you can change values of its properties. Let us see the example

```js
const user = {
  name: 'John Doe'
};

user.age = 25; // Perfectly valid. You are not changing object, only manipulating it
console.log(user.age); // 25

// This won't work
user = {
  name: 'Mark'
};
```

## Cloning and merging with Object.assign
If we want to copy an object by value. It is possible. It is called clone. There is no built-in method to clone objects in JS.

```js
let user = {
  name: "John",
  age: 30
};

let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}

// now clone is a fully independent clone
clone.name = "Pete"; // changed the data in it

console.log( user.name ); // still John in the original object
```
This is ok with simple objects. It means if object only has primitive data types, then this works. What if some properties has objects too? Sure you can do nested for loops, but you don't know how deep you should do.

Another method to clone object is to use `Object.assign`

The syntax is
```js
Object.assign(dest[, src1, src2, src3...]);
```
Properties of `src1, ... srcN` will be copied to `dest`
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);

// now user = { name: "John", canView: true, canEdit: true }
console.log(user);
```
You can also use `Object.assign` for simple clones
```js
let user = {
  name: "John",
  age: 30
};

let clone = Object.assign({}, user);
```
Here `user` object will be merged (cloned!) to empty object `{}`

Even `Object.assign` won't solve complex objects (i.e. objects as property values). To fix that we need, what is called `deep cloning`. You need `Structured cloning algorithm` to do it. But you don't have to write it yourself. JS library `lodash` has a method `_.cloneDeep(obj)` to do this.

```js
let myself = {
  name: 'Venkat',
  age: 43,
  skills: {
    js: "intermediate",
    php: "intermediate",
    reactjs: "beginner",
  },
  profession: "Web Developer"
}
```

You can also use `JSON serialization` like this
```js
const cloned = JSON.parse(JSON.stringify(original))
```

But the problem is, you will lose any Javascript property that has no equivalent type in JSON, like `Function` or `Infinity`. Any property that’s assigned to `undefined` will be ignored by JSON.stringify, causing them to be missed on the cloned object.

## Tasks
### Hello, object
Write the code, one line for each action:
1. Create an empty object user.
2. Add the property name with the value John.
3. Add the property surname with the value Smith.
4. Change the value of the name to Pete.
5. Remove the property name from the object.
```js
const user = {}
user.name = 'John'
user.surname = 'Smith'
console.log(user)
user.name = 'Pete'
console.log(user)
delete user.name
console.log(user)
```

### Check for emptiness
Write the function isEmpty(obj) which returns true if the object has no properties, false otherwise.

```js
function isEmpty(obj) {
  for (let prop in obj) {
    return false
  }
  return true
}
```

### Constant objects?
Is it possible to change an object declared with const? What do you think?
```js
const user = {
  name: 'John'
}

user.name = 'Pete'
```
Now `name` property will have `Pete` has value. because we are not reassigning a `const`, but just manipulating

### Sum object properties
We have an object storing salaries of our team:
```js
let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130,
}

// Answer
function sum(obj)  {
  let sum = 0;
  for (let prop in obj) {
    sum += obj[prop]
  }
  return sum
}

console.log(sum(salaries)) // 390
```

### Multiply numeric properties by 2
Create a function multiplyNumeric(obj) that multiplies all numeric properties of obj by 2.

```js
// before the call
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

console.log(menu)
// after the call
// menu = {
//   width: 400,
//   height: 600,
//   title: "My menu"
// };

// Answer
function multiplyNumeric(menu) {
  for (let prop in menu) {
    if (typeof menu[prop] == "number") {
      menu[prop] = menu[prop] * 2
    }
  }
}
