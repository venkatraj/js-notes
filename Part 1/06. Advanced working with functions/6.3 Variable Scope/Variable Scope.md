# Variable Scope

## Var, Let and Const
`var` and `function` declarations are hoisted. Where as `let` and `const` are not. It means that when execution starts JS Engines knows that variables are available (let and const)  and are not usable (throws error). It is called `Temporal dead zone` where as we can use `var` but its value will be undefined.

```js
    console.log(test) // undefined
    console.log(err)  // Uncaught ReferenceError: err is not defined

    var test = 'Test'

    console.log(name); // Uncaught ReferenceError: Cannot access 'name' before initialization
    let name = 'Venkat'
```

## Closure
A closure (general programming term) is a function that remembers its outer variables and can access them. In javascript all functions are closures. That means that all functions remembers its outer variables and can access them. To understand how this is possible, we need to know about the program execution flow.

## Lexical Environment
When ever a block of code / function / global starts executing a lexical environment is created and stored in an object called `Lexical Environment Record`
The Lexical Environment object consists of two parts:

1. Environment Record – an object that has all local variables as its properties (and some other information like the value of this).
2. A reference to the outer lexical environment, usually the one associated with the code lexically right outside of it (outside of the current curly brackets).

When a program executes it creates `global lexical environment`. All declarations (var, let, const, function, function*, class) are "hoisted" and become properties of global lexical environment object (Environment Record)

The difference between `var/function/function* declarations` and `let/const/class` declara­tion is the initialization process.
`var` is initialized with `undefined` and `fun*` are initialized with (generator) function whereas `let/const/class` are not initialized and as a result of that will throw `ReferenceError` when you try to access it before it get initialized in code.

When a variable / function is referenced in code execution, it looks for that variable / function in current lexical environment. If found it is used, else it will continue the search in outer lexical environment and so on. If it is not found in any lexical environment including outer most, then it throw reference error.

All functions “on birth” receive a hidden property [[Environment]] with a reference to the Lexical Environment of their creation.


*NOTE:* When using `let` and `const` inside block of code `{}` it creates a new lexical environment

## Exercises

### Does a function pickup latest changes?
```js
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete";

sayHi(); // what will it show: "John" or "Pete"?

// Solution
// Yes. It picks up and shows "Pete"
```

### Which variables are available?
```js
function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

// create a function
let work = makeWorker();

// call it
work(); // what will it show?

// SOLUTION
// it will show "Pete"
// Because in `makeWorker` lexical environment `work` variable is closer
// compared to `work` variable in `global` lex. env.
```

### Are counters independent?
```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

alert( counter2() ); // ?
alert( counter2() ); // ?

// SOLUTION:
// Yes. because each function call (execution) creates a new lex. env.
```

### Counter object
```js
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?

// SOLUTION
// Nothing tricky here. will display 1, 2, 1
```

### Function in if
```js
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

sayHi();

// SOLUTION:
// IN STRICT MODE
// Produces error. because `if` block create own lexical env. and sayHi is available there
// but not in global lex. env
```

### Sum with closures
```js

function sum(num1) {
    return function(num2) {
        return num1 + num2
    }
}

console.log(sum(1)(2) == 3) // true
console.log(sum(5)(-1) == 4) // true
```

### Is variable visible?
```js
let x = 1;

function func() {
  console.log(x); // ?

  let x = 2;
}

func();

// SOLUTION:
// No. ReferenceError can't be used before initialization
// Because `x` is in temporal dead zone, until it meets `let x = 2`
```

### Filter through function
```js
/* .. your code for inBetween and inArray */
function inBetween(from, to) {
    return function(ele) {
        return (ele >= from && ele <= to) ? true : false
    }
}

function inArray(arr) {
    return function(ele) {
        return arr.includes(ele)
    }
}

// Problem
let arr = [1, 2, 3, 4, 5, 6, 7];

console.log( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

console.log( arr.filter(inArray([1, 2, 10])) ); // 1,2
```

### Sort by field
```js
    let users = [
      { name: "John", age: 20, surname: "Johnson" },
      { name: "Pete", age: 18, surname: "Peterson" },
      { name: "Ann", age: 19, surname: "Hathaway" }
    ];

    function byField(fieldName) {
      return function(e1, e2) {
        return e1[fieldName] > e2[fieldName] ? 1 : -1
      }
    }

    users.sort(byField('name'))
    users.forEach(user => console.log(user.name))

    users.sort(byField('surname'))
    users.forEach(user => console.log(user.surname))
    
    users.sort(byField('age'))
    users.forEach(user => console.log(user.age))

```

### Army of functions
```js
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // shooter function
      alert( i ); // should show its number
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // the shooter number 0 shows 10
army[5](); // and number 5 also outputs 10...
// ... all shooters show 10 instead of their 0, 1, 2, 3...

// Because closures always picks up latest changes in outer lexical env.
// SOLUTION: is to make a inner lexical environment for shooter function
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let j = i;
    let shooter = function() { // shooter function
      alert( j ); // should show its number
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5

// OR
// BECAUSE `for` creates a own lex. env. with `i` in it, as it has block scope
function makeArmy() {
  let shooters = [];

  for (let i = 0; i < 10; i++) {
    let shooter = function() { // shooter function
      alert( i ); // should show its number
    };
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```