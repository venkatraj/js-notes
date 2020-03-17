# Destructuring assignments
Arrays and Objects hold many information as single entity. It is sometimes useful to have those information in separate variables. Destructuring assignment is the way to `unpack` arrays or objects into a bunch of variables.

## Array destructuring
To destructuring an array you'll write code like so,

```js

    let arr = ['Venkatraj', 'Nagarajan'];
    let [firstName, lastName] = arr;
    console.log(firstName);
    console.log(lastName);

```

It works with array returning methods as well. To destructuring a string you'll write code like so..

```js

    let name = 'Venkatraj Nagarajan';
    let [firstName, lastName] = name.split(' ');
    console.log(firstName);
    console.log(lastName);

```

### “Destructuring” does not mean “destructive”
Meaning that by doing destructuring assignments, the array or string itself won't change.
This is just a shorter method for following code

```js

    let arr = ['Venkatraj', 'Nagarajan'];
    let firstName = arr[0];
    let lastName = arr[1];
    console.log(firstName);
    console.log(lastName);

```

## Ignore elements in destructuring
Suppose you only want the 2nd element in an array and want to ignore 0, 1 elements, 
then you will write so...

```js

    // first and second elements are not needed
    let arr = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
    let [, , title] = arr;
    console.log( title ); // Consul

```

## Works with any iterable on the right-side
```js

    let [a, b, c] = "abc"; // "a", "b", "c"
    let [one, two, three] = new Set([1, 2, 3]); // 1,2,3

```
## Assign to anything at the left-side
We can use any “assignables” at the left side.
For instance, an object property:
```js

    let user = {};
    let programmer = ['Govind'];
    [user.name, programmer[1]] = "Venkat Raj".split(' ');
    console.log(user.name); // Venkat
    console.log(programmer[1]); // Raj

```
## Looping with .entries()
```js

    let user = {
        name: 'John',
        age: 30
    };

    for(let [prop, value] of Object.entries(user)) {
        console.log(`${prop}: ${value}`);
    }

    let userMap = new Map();
    userMap.set('name','John');
    userMap.set('age',30);
    for(let [prop, value] of userMap.entries()) {
        console.log(`${prop}: ${value}`);
    }    

```

## The rest `...`
As we saw, we can ignore first items with commas, similarly you can grasp all the rest of the elements / properties in a single variable as array
```js

    let arr = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
    let [name1, name2, ...rest] = arr;

    console.log(name1); // Julius
    console.log(name2); // Caesar
    console.log(rest[0]); // Consul
    console.log(rest[1]); // of the Roman Republic
    console.log(rest.length); // 2

```

## Default values
If there is fewer / no values in the array than the variables, then you'll get `undefined`
You can also provide default values, which is not just literals but can be expressions too.
Expressions will be executed only if there is no value in array

```js

    let [firstName, lastname] = [];
    console.log(firstName); // undefined

    // default values
    let [name = "Guest", surname = "Anonymous"] = ["Julius"];
    console.log(name);    // Julius (from array)
    console.log(surname); // Anonymous (default used)

    // runs only prompt for surname
    let [name1 = prompt('name?'), surname1 = prompt('surname?')] = ["Julius"];
    console.log(name1);    // Julius (from array)
    console.log(surname1); // whatever prompt gets

```

## Object destructuring
**Syntax** is
```js

    let {var1, var2} = {prop1: value1, prop2: value2};

```

```js

    let options = {
        title: "Menu",
        width: 100,
        height: 200,
        speak() {
            console.log('Hello, World')
        }
    };

    let {title, width, height, speak} = options;
    console.log(title);
    console.log(width);
    console.log(height);
    speak(); // Hello, World

```

### Property mapping
```js

    let options = {
        title: "Menu",
        width: 100,
        height: 200,
        speak() {
            console.log('Hello, World')
        }
    };

    let {one, two, three} = options;

    console.log(one); // undefined
    console.log(two); // undefined
    console.log(three); // undefined

    let options = {
        title: "Menu",
        width: 100,
        height: 200,
        speak() {
            console.log('Hello, World')
        }
    };
    let {title: one, width: two, height: three} = options;
    console.log(one); // "Menu"
    console.log(two); // 100
    console.log(three); // 200    

```

## Default values

```js

    let options = {
        title: "Menu"
    };

    let {width = 100, height = 200, title} = options;
    console.log(title);  // Menu
    console.log(width);  // 100
    console.log(height); // 200

    let options = {
      title: "Menu"
    };

    let {width = prompt("width?"), title = prompt("title?")} = options;
    console.log(title);  // Menu
    console.log(width);  // (whatever you the result of prompt is)

    let options = {
        title: "Menu"
    };

    let {width: w = 100, height: h = 200, title} = options;
    console.log(title);  // Menu
    console.log(w);      // 100
    console.log(h);      // 200

```

## The rest pattern '...'

```js
    
    let user = {
        name: 'Venkat',
        designation: 'Programmer',
        salary: null,
        wishes: 'A lot, needs another object of its own'
    };

    let {name, ...rest} = user;
    console.log(name); // Venkat
    console.log(rest.wishes); // A lot, needs another object of its own

```

### Existing Variables
If we want to use existing variables in destructuring, it won't work
```js

    let title, width, height;
    // Uncaught SyntaxError: Unexpected token =
    {title, width, height} = {title: "Menu", width: 200, height: 100};

```

This is because JS treats `{}` as block of code and you can't assign values to block of code
So, you need to tell JS engine, it is not block of code. You can do so, like so..

```js

    let title, width, height;
    ({title, width, height} = {title: "Menu", width: 200, height: 100});
    console.log( title ); // Menu

```

## Nested destructuring
We can also destructuring nested objects and arrays.

```js

    let options = {
        name: 'Complex',
        size: {
            width: 100,
            height: 200
        },
        items: ["Cake", "Donut"],
        extra: true    // something extra that we will not destruct
    };

    // destructuring assignment on multiple lines for clarity
    let {
    size: { // put size here
        width,
        height
    },
    items: [item1, item2], // assign items here
    title = "Menu" // not present in the object (default value is used)
    } = options;

    console.log(name);   // empty string
    console.log(title);  // Menu
    console.log(width);  // 100
    console.log(height); // 200
    console.log(item1);  // Cake
    console.log(item2);  // Donut
    
    // take size as a whole into a variable, ignore the rest
    let { size } = options;

```

## Destructuring in function parameter
```js

    // we pass object to function
    let options = {
        title: "My menu",
        items: ["Item1", "Item2"]
    };

    // ...and it immediately expands it to variables
    function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
        // title, items – taken from options,
        // width, height – defaults used
        alert( `${title} ${width} ${height}` ); // My Menu 200 100
        alert( items ); // Item1, Item2
    }

    showMenu(options);

```

**Write a function with destructuring with mapping parameter**
```js

    let options = {
        title: "My menu",
        items: ["Item1", "Item2"]
    };

    function showMenu({
        title = "Untitled",
        width: w = 100,  // width goes to w
        height: h = 200, // height goes to h
        items: [item1, item2] // items first element goes to item1, second to item2
    }) {
        alert( `${title} ${w} ${h}` ); // My Menu 100 200
        alert( item1 ); // Item1
        alert( item2 ); // Item2
    }

    showMenu(options);

    // syntax
    function({
        incomingProperty: varName = defaultValue
    })

```

Optional destructuring parameter
```js

    function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
    alert( `${title} ${width} ${height}` );
    }

    showMenu({});

    function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
    alert( `${title} ${width} ${height}` );
    }

    showMenu(); // Menu 100 200

```

## Exercises

### Destructuring assignment

```js
let user = { name: "John", years: 30 };

// your code to the left side: (SOLUTION)
let { name, years: age, isAdmin = false } = user

console.log( name ); // John
console.log( age ); // 30
console.log( isAdmin ); // false

```

### The maximal salary
```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

console.log(topSalary(salaries))

function topSalary(salaries) {
    if (0 === Object.keys(salaries).length) return null;
    let topSalary = 0,
        topPaidPerson = '';
    for (let [person, salary] of Object.entries(salaries) ) {
        if (salary > topSalary) {
            topSalary = salary;
            topPaidPerson = person;
        }
    }

    return topPaidPerson;
}
```