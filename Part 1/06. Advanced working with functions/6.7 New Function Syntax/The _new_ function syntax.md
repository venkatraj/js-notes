# The "new" Function syntax
Another way to create functions is to use `new` keyword.
Syntax is:
```js

    let func = new Function ([arg1[, arg2[, ...argN]],] functionBody)

```

Example:
```js

    let sum = new Function('a', 'b', 'return a + b');
    console.log(sum(1, 2));

    let hello = new Function("alert('Hello')"); // implicit return when only has function body
    hello();

```
Is exactly same as 
```js

    function sum(a,b) {
        return a + b;
    }

    console.log(sum(1,2));

    function hello() {
        alert('Hello');
    }

    hello();

```

What is the benefit of using `new` Function syntax?
You can receive function as string from server and then execute it
```js

    let str = ... receive the code from a server dynamically ...

    let func = new Function(str);
    func();

```

# Closure
Normally all js functions are closures meaning that it will remember where it is created and can access the variables from its outer scope. Given that, functions created with new function syntax are only capable accessing global variables.

It means that the lexical environment for function created with new keyword is global lexical environment, not the current one.

Consider this
```js

    let value = "Hi";
    
    function getFunc() {
    let value = "Hello";

    let func = new Function('alert(value)');

    return func;
    }

    getFunc()(); 

```

This will output "Hi" instead of "Hello". In fact, if there is no `value` in global, then it will through reference error.

Why this behavior? Because when we get function body from server or other source, it should be generic and reusable and it shouldn't be aware of local variables. Otherwise, we can write our own in the current scope itself.