# Closure
A closure (general programming term) is a function that remembers its outer variables and can access them. In javascript all functions are closures. That means that all functions remembers its outer variables and can access them.
To understand how this is possible, we need to know about the program execution flow.

## Lexical Environment
When ever a block of code / function / global starts executing a lexical environment is created and stored in an object called `Lexical Environment Record`
The Lexical Environment object consists of two parts:

1. Environment Record – an object that has all local variables as its properties (and some other information like the value of this).
2. A reference to the outer lexical environment, usually the one associated with the code lexically right outside of it (outside of the current curly brackets).

When a program executes it creates `global lexical environment`. All declarations (var, let, const, function, function*, class) are "hoisted" and become properies of global lexical environment object (Environment Record)

The difference between `var/function/function* declarations` and `let/const/class` declara­tions is the initialisation.
`var` is initialized with `undefined` and `fun*` are initalized with (generator) function whereas `let/const/class` are not initialized and as a result of that will throw `ReferenceError` when you try to access it before it get initialized in code.

Consider this example, if it is not hostinged `x` could reference global one, but it is not.
```js
x = "global";
// function scope:
(function() {
    x; // not "global"

    var/let/… x;
}());
// block scope (not for `var`s):
{
    x; // not "global"

    let/const/… x;
}
```
When a variable / function is referenced in code execution, it looks for that variable / function in current lexical environment. If found it is used, else it will continue the search in outer lexical environment and so on. If it is not found in any lexical environment including outer most, then it throw reference error.

All functions “on birth” receive a hidden property [[Environment]] with a reference to the Lexical Environment of their creation.

