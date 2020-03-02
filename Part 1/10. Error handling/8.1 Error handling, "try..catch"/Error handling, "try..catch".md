# Error handling, "try..catch"
When an error happens in javascript program, it simply dies.
To prevent that from happening and handle the error programatically, we can use 
`try..catch` block.

Basically we standard program will be in `try` block. It executes. If an error happens,
rest of the code in try block won't be executed and the execution flow jumps to `catch` block, then it is executed. If no error occured catch block is skipped.

```js
// No error try block
try {
    console.log('Start of try block');
    console.log('End of try block');
} catch (err) {
    console.log(err);
    console.log('Catch block executed');
}
console.log('Program continues it execution');

// Err.
try {
    console.log('Start of try block');
    err
    console.log('End of try block');
} catch (err) {
    console.log(err);
    console.log('Catch block executed');
}
console.log('Program continues it execution');
```
## try..catch works synchronously
If an error occurs in a scheduled code, then try..catch won't work.
Because a scheduled code is executed later the execution of try..catch block is completed,
it can't catch the error. For such scheduled code, the try..catch blocks should be implemented in the scheduled code itself.

```js
try {
    console.log('Start of try block');
    setTimeout(() => {
        nosuchVar;
        console.log('Scheduled Code, error won\'t be catched');
    }, 1000);
    console.log('End of try block');
} catch (err) {
    console.log(err);
    console.log('Catch block executed');
}
console.log('Program continues it execution');
try {
    console.log('Start of try block');
    setTimeout(() => {
        try {
            nosuchVar;
            console.log('Scheduled Code');
        } catch(err) {
            console.log('Error catched in scheduled code');
        }
    }, 1000);
    console.log('End of try block');
} catch (err) {
    console.log(err);
    console.log('Catch block executed');
}
console.log('Program continues it execution');
```

## Error Object
JS throws an error object to catch block which has following properties.
`name` name of the error such as TypeError, ReferenceError, SyntaxError and so on.
`message` error message
`stack` backtrace of what error happend and on which line, etc

```js
try {
    console.log('Start of try block');
    noSuchVar;
    console.log('End of try block');
} catch (err) {
    console.log(err);
    console.log(err.name);
    console.log(err.message);
    console.log(err.stack);
    console.log('Catch block executed');
}
console.log('Program continues it execution');
```

## Real life use for try..catch
When we process data from database, user input or from other service, there is a high chance that the data is not in desired format by our program. Such as real life use cases for try..catch blocks. For example, what happens when a JSON encoded data isn't parsable in our program? a error occured and script dies. Such situations are ideal for try..catch

```js
try {
    let json = '{"name":"Venkat","lang":"JavaScript"}';
    let user = JSON.parse(json);
    console.log(user.name);
    let json1 = '{bad data}';
    let data = JSON.parse(json1);
    console.log(data.message);
} catch (err) {
    console.log(err);
    console.log('Catch block executed');
}
console.log('Program continues it execution');
```
## Throwing our own errors, throw operator and built-in error objects
We can also throw our own errors depends on processing data and results.
There are many built-in error objects in JS
* Error
* SyntaxError
* ReferenceError
* TypeError
* and so on...

We use `throw` operator to throw such error object to catch blocks

```js
try {
    let json = '{"lang":"JavaScript"}';
    let user = JSON.parse(json);
    if ('undefined' === typeof user.name) {
        throw new SyntaxError('Users should have a name');
    }
} catch (err) {
    console.log(err.name);
    console.log(err.message);
    console.log('Catch block executed');
}
console.log('Program continues it execution');
```

## Rethrowing
If our catch block is indend to deal with a single problem such as bad json format, but another error occurs in try block, then our catch block should rethrow the error object that it can't handle. Another catch all kind of catch block should handle the rethrown error.
```js
function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
    blabla(); // error!
  } catch (e) {
    // ...
    if (e.name != 'SyntaxError') {
      throw e; // rethrow (don't know how to deal with it)
    }
  }
}

try {
  readData();
} catch (e) {
  alert( "External catch got: " + e ); // caught it!
}
```

## try..catch..finally
Similar to ajax calls callbacks `then, fail and always` we can use a `finally` block
It is useful in case we have code to be executed regarless of which block(try or catch) is executed. For example, speed profiling code, cleanup, etc

There is an important difference between writing code after catch block and in final block. consider this
```js
function func() {
  try {
    return 1;

  } catch (e) {
    /* ... */
  } finally {
    alert( 'finally' );
  }
}
```
As you can see final block is executed even after the func executed `return`, if we write the same code after catch block and not in finally block, it won't happen. The function just returns the control flow to called code after it encounters `return` statement.

### Variables are local inside try..catch..finally
Variables inside these blocks are have block level scope.