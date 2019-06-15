# Currying and partials
We know that we can bind context to function / method and not to loose `this`
`bind` can actually do more than that. It can not only bind `this` but can also bind function arguments.
For example, let say we have a function for multiplication
```js

    function multiply(a, b) {
        return a * b;
    }

```

Let us bind the first argument with `2` so that we can make a function called `double`
```js

    function multiply(a, b) {
        console.log(a * b);
        return a * b;
    }

    // Binding first argument of `multiply` function to value 2
    let double = multiply.bind(null, 2);
    double(2); // 4 => multiply(2, 2)
    double(10); // 20 => multiply(2, 10)

    let triple = multiply.bind(null, 3);
    triple(3); // 9 => multiply(3, 3)
    triple(4); // 12 => multiply(3, 4)

```

The above technique called `Partial application / Partial function application`

What it means is that
"Calling a function with fewer arguments than it expects and It returns a function that takes the remaining arguments. And this is called Partial Application of Functions.".

When will be `partial application` useful? Let's say we are building a chat application.
It has a `send` function which take 3 arguments.
```js

    send(from, to, message);

```

When using this function with a context of user object, we don't want to specify `from` every time we use it, instead we want it to take `from` from the context.

```js

    function sendTo(from, to, message) {
        console.log(`${message} has been sent to ${to} from ${from}`);
    }

    sendTo('loverboy@teens.com', 'lovergirl@teens.com', 'ILU');

    let user = {
        email: 'venkat@webulous.in',
        
    }

    user.send = sendTo.bind(user, user.email)
    console.log(user.send);

    user.send('hari@webulous.in', 'Hey son!');

        function sendTo(from, to, message) {
        console.log(`${message} has been sent to ${to} from ${from}`);
    }

    sendTo('loverboy@teens.com', 'lovergirl@teens.com', 'ILU');

    let user = {
        email: 'venkat@webulous.in',
        send: sendTo.bind(user, user.email)
    }

    console.log(user.send);

    user.send('hari@webulous.in', 'Hey son!');

    function sendTo(from, to, msg) {
        console.log(`${from} to ${to}: ${msg}`);
    }

    sendTo('Boy','Gal','143');

    let user = {
        name: 'John Doe'
    };

    user.send = sendTo.bind(user, user.name);
    user.send('someEmployer', 'Hire me');


    function sendTo(from, to, msg) {
        console.log(`${from} to ${to}: ${msg}`);
    }

    sendTo('Boy','Gal','143');

    let user = {
        name: 'John Doe',
        send(): sendTo.bind(user, user.name) 
    };

    user.send('someEmployer', 'Hire me');

    let user1 = {
        name: 'Pete',
        sayHi() {
            console.log(user1.name)
        }
    }

    user1.sayHi();

```
## Currying 
`Currying` is translating a function from callable as `f(a, b, c)` into callable as `f(a)(b)(c)`

```js

    function sum(a, b) {
        return a + b;
    }

    function curry(func) {
        return function(a) {
            return function(b) {
                return func(a, b);
            }
        }
    }

    let curriedSum = curry(sum);
    console.log(curriedSum(10)(20));
    console.log(curriedSum(10)(-5));

```

## Why use currying?
Currying allows us to use a function in different context. For example, we may have a function called `log` which takes, time, message type and message and log it.

Sometimes we have time first (before execution), then message type, then according to type we may need to investiage and get message and lastly log it. 


```js

    function log(date, importance, message) {
    alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
    }
    log = _.curry(log);
    // Normal way
    log(new Date(), "DEBUG", "some debug");

    // todayLog will be the partial of log with fixed first argument
    let todayLog = log(new Date());
    // Code to run and find type of message and message
    // Then use it
    todayLog("INFO", "message"); // [HH:mm] INFO message
    // Can also be called like this
    log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)

```

### Advanced Currying
This is our own implementation of `_curry()` from lodash library
```js

    function sum(a, b, c) {
        return a + b + c;
    }

    function curry(func) {
        return function curried(...args1) {
            if (args1.length >= func.length) {
                return func.call(this, ...args1);
            } else {
                return function(...args2) {
                    return curried.apply(this, args1.concat(args2));
                }
            }
        }
    }

    let curriedSum = curry(sum);
    console.log(curriedSum(1,2,3));
    console.log(curriedSum(10)(20)(30));
    console.log(curriedSum(5, 10)(15))