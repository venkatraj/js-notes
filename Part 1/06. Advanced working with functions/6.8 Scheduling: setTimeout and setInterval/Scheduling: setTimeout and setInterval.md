# Scheduling: setTimeout and setInterval
We may decide to execute a function not right now, but at a certain time later. That’s called “scheduling a call”.
For example, we may not want to execute a callback function immediately that is attached to a keypress. Because we don't know whether they have entered whole it put or not. So we may want to delay the execution for few microseconds to make sure that typing has been done and complete

There are two type of scheduling
1. One Time
2. Recurring
We use `setTimeout` to run a function once after the interval of time
We use `setInterval` to run a function repeatedly after set interval of time.

## setTimeout
The syntax:
```js

    let timerId = setTimeout(func|code, delay[, arg1, arg2...]);

```

Real world example
```js

    function sayHi() {
        alert('Hello');
    }
    setTimeout(sayHi, 1000);

    function sayHi(phrase, who) {
        alert( phrase + ', ' + who );
    }
    setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John

```

Variations
```js

    setTimeout("alert('Hello')", 1000);
    setTimeout(() => alert('Hello'), 1000);

```

## Canceling with clearTimeout
We may schedule a call, but based on certain conditions (result of data processing, server returned result, etc), we may want to cancel it or execute it. To do that, we use `clearTimeout` to cancel scheduled call.

```js

    let timerId = setTimeout(() => alert("never happens"), 1000);
    alert(timerId); // timer identifier

    clearTimeout(timerId);
    alert(timerId); // same identifier (doesn't become null after canceling)

    var [greeting, name] = // result of something, a server call
    function sayHi(phrase, who) {
        alert( phrase + ', ' + who );
    }
    setTimeout(sayHi, 1000, gettting, name);

    // We want to call the execution, if either greeting or name is undefined

    var [greeting, name] = // result of something, a server call
    function sayHi(phrase, who) {
        alert( phrase + ', ' + who );
    }
    let timerID = setTimeout(sayHi, 1000, greeting, name);

    if ("undefined" === typeof greeting || "undefined" === typeof name) {
        clearTimeout(timeID);
    }

```

## setInterval
```js

    // repeat with the interval of 2 seconds
    let timerId = setInterval(() => alert('tick'), 2000);

    // after 5 seconds stop
    setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);

```

## Recursive setTimeout

We know that `setInterval` runs given function repeatedly.
We can achieve the same with recursive `setTimeout`

```js

    /** instead of:
    let timerId = setInterval(() => alert('tick'), 2000);
    */

    let timerId = setTimeout(function tick() {
    alert('tick');
    timerId = setTimeout(tick, 2000); // (*)
    }, 2000);

```

The advantage of using recursive `setTimeout` over `setInterval` is we can change delay dynamically based on result of function call.
```js

    let delay = 5000;

    let timerId = setTimeout(function request() {
    ...send request...

    if (request failed due to server overload) {
        // increase the interval to the next run
        delay *= 2;
    }

    timerId = setTimeout(request, delay);

    }, delay);

```

Another difference is that Recursive setTimeout *guarantees* a delay between the executions, setInterval – *does not*.

```js

    let i = 1;
    setInterval(function() {
    func(i);
    }, 100);

    // setInterval Vs recursive setTimeout

    let i = 1;
    setTimeout(function run() {
    func(i);
    setTimeout(run, 100);
    }, 100);

```

## setTimeout(…,0)
What happens with the following code?

```js

    setTimeout(() => alert("World"), 0);
    alert("Hello");

```

Even though there is `0` delay to execute the arrow function, it will execute only after the current code.