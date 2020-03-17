# Arrays
Arrays are objects, but used to store ordered collection. JS Engine has powerful optimizations to make this work fast for such data.

## Declaration
```js

    let arr1 = new Array();
    let arr2 = [];

```
This is similar to Object creation. Using constructor and literal.

### Declare and initialize
```js

    let fruits = new Array("Banana", "Mango");
    let veggies = ['Carrot', 'Tomato'];

```

### Add elements
```js

    let fruits = ['Banana'];
    fruits[1] = 'Mango';
    fruits[2] = 'Guava';

```

### Retrieve elements
```js

    let fruits = ['Banana', 'Mango', 'Guava'];
    console.log(fruits[1]); // Mango

```

### Replace elements

```js

    let fruits = ['Banana', 'Mango', 'Guava'];
    fruits[2] = 'Apples';
    console.log(fruits[2]); // Apples

```

### No. of elements in an array
```js

    let fruits = ['Banana', 'Mango', 'Guava'];
    console.log(fruits.length); // 3

```

### Arrays can store any type of elements
```js

    // mix of values
    let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];

    // get the object at index 1 and then show its name
    alert( arr[1].name ); // John

    // get the function at index 3 and run it
    arr[3](); // hello

```

## Queue
In computer science, Queue is a data structure that serves First In First Out (FIFO). It should support two operations
* `push` appends an element to the end of queue
* `shift` get an element from the begining of queue
```js

    let movieTicketQueue = [];
    movieTicketQueue.push('Venkat'); // First person form a queue
    movieTicketQueue.push('Siva'); // Another person in queue
    movieTicketQueue.push('Premalatha'); // Queue grows
    // Open ticket counter and serve tickets
    console.log(movieTicketQueue.shift()); // Venkat - Person removed and ticket issued
    console.log(movieTicketQueue); // ['Siva', 'Premalatha'] - Remaining queue to be served

```
## Stack
In computer science, Stack is a data structure that serves First In Last Out (FIFO). It should support two operations
* `push` appends an element to the top of stack
* `pop` get an element from the top of stack
```js

    let aBookStack = [];
    aBookStack.push('Javascript For Beginners'); // Place a book on table
    aBookStack.push('Advanced JavaScript'); // Placing another book on top of previous book
    aBookStack.push('Beginning React JS'); // Another book placing top of `Advanced JavaScript`
    // Now If you want to take a book, you normally take the book which it at top
    console.log(aBookStack.pop()); // 'Beginning React Js' Book removed from stack
    console.log(aBookStack); // ['JavaScript for Beginners', 'Advanced JavaScript'] Books that remain in stack

```

## Unshift
```js

    let fruits = ["Orange", "Pear"];
    fruits.unshift('Apple');
    console.log( fruits ); // Apple, Orange, Pear

```

## Adding multiple elements
```js

    let fruits = ["Apple"];

    fruits.push("Orange", "Peach"); // Add to end. i.e. after 'Apple'
    fruits.unshift("Pineapple", "Lemon"); // Adds to begining i.e. Before 'Apple'

    // ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
    console.log( fruits );

```

## Copied by reference
```js

    let fruits = ["Banana"]
    let arr = fruits; // copy by reference (two variables reference the same array)
    console.log( arr === fruits ); // true
    arr.push("Pear"); // modify the array by reference
    console.log( fruits ); // Banana, Pear - 2 items now

```

## Benefits of Array
Arrays are objects. Its square bracket notation comes from objects and indexes are numbric property names.
If both are same, what is the use and benefits of Arrays?

Internally, JS tried to store array elements in contiguous memory locations and does other optimizations to make it work really fast compared to plain Objects. This makes working with ordered collection FAST.

But everything will go in vein if you do this kind of coding...

```js

    let fruits = []; // make an array
    fruits[99999] = 5; // assign a property with the index far greater than its length
    fruits.age = 25; // create a property with an arbitrary name

```

## Arrays and loops
There are 3 ways to loop through arrays
* `for` loop
* `for..of` loop
* `for..in` loop

```js

    let arr = ["Apple", "Orange", "Pear"];
    for (let i = 0; i < arr.length; i++) {
        console.log( arr[i] );
    }

    let fruits = ["Apple", "Orange", "Plum"];
    // iterates over array elements
    for (let fruit of fruits) {
        console.log( fruit );
    }

    let arr1 = ["Apple", "Orange", "Pineapple"];
    for (let key in arr) {
        console.log( arr[key] ); // Apple, Orange, Pineapple
    }

```
If you knew `php`, `for` loop is same. `for..of` is like foreach($array as $value) and `for..in` is like foreach($array as $key => $value)

### Length property
`length` property does not return count of elements, but greatest numeric index + 1

```js

    let fruits = [];
    fruits[123] = 'Apple';
    console.log(fruits.length); // 124

```

### Length is writable property

```js

    let arr = [1, 2, 3, 4, 5];
    arr.length = 2; // truncate to 2 elements
    console.log( arr ); // [1, 2]
    arr.length = 5; // return length back
    console.log( arr[3] ); // undefined: the values do not return

```
## new Array tricker part
```js

    let arr = new Array(2); // Creates an array of length 2, not with 2 as item
    console.log( arr[0] ); // So first element is `undefined`
    console.log( arr.length ); // 2

```

## Multidimensional arrays

```js

    let matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    console.log( matrix[1][1] ); // 5, the central element

```

## toString
Arrays have their own implementation of toString method that returns a comma-separated list of elements. It doesn't have `Symbol.toPrimitive` or `valueOf` methods

```js

    let arr = [1, 2, 3];
    console.log( arr ); // 1,2,3
    console.log( String(arr) === '1,2,3' ); // true

```

```js

    console.log( [] + 1 ); // "1"
    console.log( [1] + 1 ); // "11"
    console.log( [1,2] + 1 ); // "1,21"
    console.log( "" + 1 ); // "1"
    console.log( "1" + 1 ); // "11"
    console.log( "1,2" + 1 ); // "1,21"

```