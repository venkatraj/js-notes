# Array Methods

## Add / Remove items
We already know these methods
* `push` - Add items to the end
* `pop` - Removes item from the end
* `unshift` - Adds items to the front
* `shift` - Removes item from the front

### Additional methods
**Splice**
To delete an element from array, you could use `delete` as you would do with Objects.
But `delete` only removes value and set it to `undefined` and will not reduce array length
```js

    let arr = ["I", "am", "toxic"];
    delete arr[2]; // remove "toxic"
    console.log( arr[2] ); // undefined
    // now arr = ["I", "am", empty];
    console.log( arr.length ); // 3

```

So we need a method to delete array itesm. `splice` comes to rescue. In fact, this powerful method can add, remove and insert elements.
Syntax is `arr.splice(index[, deleteCount, ele1, ele2, ..., eleN])`
* `index` - Starting position
* `deleteCount` - No. of elements to delete. 0 if you want to insert
* `ele1...` Elements to add. i.e. you can replace, if you delete one item and add one in its place

Let us see the examples, to make things clear
**Delete**
```js

    let arr = ['I','study','JavaScript'];
    arr.splice(1,1); // Start from index 1 i.e. `study` then delete 1 element. i.e. study
    console.log(arr); // ['I','JavaScript'];

```
**Replace**
```js

    let arr = ["I", "study", "JavaScript", "right", "now"];
    // remove 3 first elements and replace them with another
    arr.splice(0, 3, "Let's", "dance");
    console.log( arr ) // now ["Let's", "dance", "right", "now"]

```
**Return Value**
Splice returns an array of removed elements, if no elements are removed, then returns an empty array
```js

    let arr = ["I", "study", "JavaScript", "right", "now"];
    let isRemoved = arr.splice(arr.length,0,"ok");
    console.log(isRemoved); // [] - Empty array
    console.log(arr); // ["I", "study", "JavaScript", "right", "now", "ok"]
    let replaced = arr.splice(0,1,"You"); 
    // ["I"] - Even though 'I' is replaced with 'You', 'I' is first removed
    console.log(replaced);
    // ["You", "study", "JavaScript", "right", "now", "ok"]
    console.log(arr);
    // remove 2 first elements
    let removed = arr.splice(0, 2);
    console.log( removed ); // ["You", "study"] - array of removed elements
    console.log(arr); // ["JavaScript", "right", "now", "ok"];

```

**Negative Indexes**
```js

    let arr = [1, 2, 5];
    // from index -1 (one step from the end)
    // delete 0 elements,
    // then insert 3 and 4
    arr.splice(-1, 0, 3, 4);
    alert( arr ); // 1,2,3,4,5

```

**Array.slice**
`Array.slice` is similar to `String.slice` except that return value is an array instead of string
```js

    let lang = ['JavaScript','is','easy','to','learn'];
    let sliced = lang.slice(0,3); // Excluding 3 similar to str.slice
    console.log(sliced); //['JavaScript','is','easy'];

```

**Array.concat**
```js

    let arr = [1,2];
    console.log(arr.concat([3,4], [5,6]));
    console.log(arr.concat([3,4], 5,6));
    console.log(arr.concat(3,4,5,6));

```

Effect of `Symbol.isConcatSpreadable` property
```js

    let arr = [1, 2];
    let arrayLike = {
        0: "something",
        length: 1
    };
    console.log( arr.concat(arrayLike) ); // 1,2,[object Object]

```

Concatenating an object properties
```js

    let arr = [1,2];
    let programmer = {
        0: 'John',
        1: 'JavaScript',
        [Symbol.isConcatSpreadable]: true,
        length: 2
    };
    let newArr = arr.concat(programmer); // [1,2,'John','JavaScript']

```

## Searching in array
Methods available for searching array
* `indexOf(item, from)` - Searches for specified `item`, `from` specified position. Returns position if found. -1 if not found
* `lastIndexOf(item, from) - Same as `indexOf` but in reverse
* `includes(item)` - Returns true or false

These are essential same as their `String` counter parts

```js

    let arr = ['html','css','javascript','php','mysql','java','switft','c#','c','c++','kotlin','python'];

    if (-1 !== arr.indexOf('javascript')) {
        console.log('I found JS');
    }

    if (-1 !== arr.indexOf('javascript',6)) {
        console.log('JS is in the last 6 items');
    } else {
        console.log('JS is not in the last 6 items');
    }

    console.log(arr.indexOf('kotlin'));

    console.log(arr.includes('Objective C'));
    
```

## find and findIndex
If we have an array of objects and want to find an object with certain conditions, then we can use `Array.find` method
**Syntax**
```js

    let arr = []; // Array of object, no content specified for brevity

    let result = arr.find(function(item, index, array)) {
        // Write logic to find desired object and return true
    }

```

* `item` is the element (one object in the array of objects)
* `index` index of the element
* `array` array itself for doing calculations / helping with logic

Let us see a practical example:
```js

    let users = [
        {id: 1, name: "John"},
        {id: 2, name: "Pete"},
        {id: 3, name: "Mary"}
    ];

```
You want to find the object whose id is `2`, then you'll write something like this

```js

    let user = users.find(item => item.id == 2);
    console.log(user.name); // Pete

```

# Array.filter
While `find` and `findIndex` helps to find a single object in array, sometimes we need to get a set of object based on some conditions. Say, you have an array of students and you want to get a set of student who did really well in Programming. `Array.filter` helps you to do just that.

**Syntax**
```js

    let results = students.filter(function(item, index, array)) {
        // should return true if the condition is passed
    }

```

Practical example:

```js

    let students = [
        {id: 1, name: 'Anand', programming: 90 },
        {id: 2, name: 'Kalaivani', programming: 35},
        {id: 3, name: 'Manikandan', programming: 75},
        {id: 4, name: 'Poornima', programming: 81},
        {id: 5, name: 'Baskar', programming: 42},
    ];

    let programming_students = students.filter(student => student.programming > 80);
    console.log(programming_students)

```

## Array.map
**Syntax**
```js

    let results = arr.map(function(item, index, array)) {
        // logic to transform array and return new value
    }

```

Practical Example:
```js

    let nums = [1,2,3,4,5];
    let names = ['Jaime','Tyrion','Tywin','Eddard','Jon','Sansa','Robb','Brandon'];

    let squareRoots = nums.map(item => item * item);
    console.log(squareRoots);

    let nameLengths = names.map(name => name.length);
    console.log(nameLengths);

```

## Array.sort

Some times you may want to sort the array, you are using for which you can use `sort` method
**Syntax**
```js

    let arr = [ 1, 2, 15 ];

    // the method reorders the content of arr (and returns it)
    arr.sort();
    console.log(arr); // [1,15,2];

    arr.sort((num1, num2) => num1 > num2);
    console.log(arr); // [1,2,15];

```

## Array.reverse

This method reverses the order of elements in an array
```js

    let arr = [1, 2, 3, 4, 5];
    arr.reverse();
    console.log( arr ); // 5,4,3,2,1

```

## Array.join
```js
    
    let userNames = "Tyrion, Jon, Brandon";
    let users = userNames.split(',');
    console.log(users); // ['Tyrion','Jon','Brandon'];
    users[0] = users[0] + ' Lannister';
    users[1] = users[1] + ' Snow aka Aegon Targeryan';
    users[2] = users[2] + ' Stark';
    console.log(users); // ['Tyrion Lannister','Jon Snow aka Aegon Targeryan','Brandon Stark'];

    let updatedUserNames = users.join(', ');
    console.log(updatedUserNames); // 'Tyrion Lannister, Jon Snow aka Aegon Targeryan, Brandon Stark;

```

## Difference between `.forEach` and `map`
Both iterate through every element of an array.
The difference is `map` returns a new modified array, where as forEach returns `undefined` it just executes specified function on each element. Also `map` is faster than `forEach`

```js

    let arr1 = [1,2,3,4,5];

    let result = arr1.forEach(function(element, index, arr) {
        console.log(element * 2); // 2, 4, 6, 8, 10
    });

    console.log(result); // undefined

    let modifiedArr = arr1.map(function(element, index, arr) {
        return element * 2;
    });

    console.log(modifiedArr); // [2,4,6,8,10]