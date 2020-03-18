# Recursion and stack
If you want to find out 2 power 4, then you can do it in two types
## Iterative method
You can multiply 2 with 2 for 4 types, like so
```js

    function power(x, n) {
        let result = 1;
        for(let i=1; i <= n; i++) {
            result *= x;
        }
        return result;
    }

    console.log(power(2,4)); // 16
    console.log(power(3,3)); // 27

```

Here you are looping through the step by desired times. 

## Recursive method
```js

    function power(x,n) {
        if (n === 1) return x;
        return x * power(x, n-1);
    }

    console.log(power(2,4)); // 16
    console.log(power(3,3)); // 27

```
Here you are calling the same function again and again by decrementing no. of times arguments

## The Execution Stack
To really understand how recursive calls work, we need to understand *execution context*

`Execution context` is a internal data structure used by JS Engine to hold details of program execution.
Each scope creates a execution content. In our case, our function `power` creates a execution context.
Execution context holds information such as where the control flow is, available variables, value of `this`, and few other internal details

Each function call creates one execution context, and this is what happening when making nested calls
1. Current function is paused.
2. Execution context associated with paused function is stored in a data structure called `execution context stack`
3. Nested call executes which creates its own context and stored in stack. Once the execution is completed, its context is removed from stack and resumed and control handed over to paused function and its execution context.

In other words the execution can be described as follows...
power(2,4)
At line 3 it becomes 2 * power(2,3)
At line 3 it becomes 2 * 2 * power(2,2)
At line 3 it becomes 2 * 2 * 2 * power(2,1)
At line 2 it becomes 2 * 2 * 2 * 2 
(Because now n is equal to 1 and hence it returns x i.e.2)

From the above example, you may wonder that why we need recursion, when looping solution is simple to understand and read, even though it is bit longer than the short, but complex recursive solution.

## Recursive traversal
Let us consider where actually recursive can come in handy. Say we have a company and has multiple departments and staff. Some departments may have sub departments and which in turn may have sub sub departments. Or take a most obvious example, our computers folder and file structure. Our hard disk root may contains files and folders. Folders in turn can contain sub folders and files and so on.

We can't really loop through these things as we don't have a finite structure. Looping can become incredibly complex when you don't know the structure.

Here recursion comes in handy. Our recursive function should check whether they are folders or just files. If files, it should just return it and if folders, it should call itself to further check, if it has just files or folders and so on.

## Linked Lists
With arrays, other than adding / deleting elements at the end is slow and time consuming. We can use a data structured called `Linked Lists` for efficient handling of ordered objects.

Linked list is a recursively defined object with two properties.
* Value
* Next

`value` property holds the value (can be any data type) and `next` property holds another object with two properties `value` and `next`

```js

    let list = {
    value: 1,
    next: {
        value: 2,
        next: {
        value: 3,
        next: {
            value: 4,
            next: null
        }
        }
    }
    };

```
Easy to read
```js

    let list = { value:1 };
    list.next = {value: 2};
    list.next.next = {value: 3};
    list.next.next.next = {value: 4};
    list.next.next.next.next = null;

```

Split this into 2 is easy

```js
    
    let secondList = list.next.next;
    list.next.next = null;

```

Joining lists

```js

    let firstList = {value: 1};
    firstList.next = {value: 2};

    let secondList = {value: 3};
    secondList.next = {value: 4};

    let wholeList = firstList;
    wholeList.next.next = secondList;

```

Adding and deleting

```js

    let list = { value: 1 };
    list.next = { value: 2 };
    list.next.next = { value: 3 };
    list.next.next.next = { value: 4 };

    // prepends the new value to the list
    list = { value: "new item", next: list };

    // Delete '3'
    list.next.next.next = list.next.next.next.next;