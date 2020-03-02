# Native prototypes
All javascript built in objects has its own prototype.

```js

    let obj = {};
    let obj = new Object();

```
is exactly same as 
```js

    let obj = new Object();

```
So, `obj.__proto__` is equal to `Object.prototype` which has `toString` and many other methods.

```js

    let obj = {};

    console.log(obj.__proto__ === Object.prototype);
    console.log(obj.toString == obj.__proto__.toString);
    console.log(obj.__proto__.toString == Object.prototype.toString);
    console.log(Object.prototype.__proto__);

```

## Other built-in prototypes

```js

    let arr = [1,2,3];
    console.log(arr.__proto__ === Array.prototype);
    console.log(arr.__proto__.__proto__ === Object.prototype);
    console.log(Array.prototype.protoype === Object.prototype);
    console.log(Array.prototype.__proto__ === Object.prototype);

    let func = function(a,b) {
        return a + b;
    };
    console.log(func.__proto__ === Function.prototype);
    console.log(func.__proto__.__proto__ === Object.prototype);
    console.log(Function.prototype.prototype === Object.prototype);
    console.log(Function.prototype.__proto__ === Object.prototype);

    let today = new Date();
    console.log(today.__proto__ === Date.prototype);
    console.log(today.__proto__.__proto__ === Object.prototype);
    console.log(Date.prototype.prototype === Object.prototype);
    console.log(Date.prototype.__proto__ === Object.prototype);

    let num = 10;
    console.log(num.__proto__ === Number.prototype);
    console.log(num.__proto__.__proto__ === Object.prototype);
    console.log(Number.prototype.prototype === Object.prototype);    
    console.log(Number.prototype.__proto__ === Object.prototype);

```

```js

function f() {
  alert("Hello!");
}
Function.prototype.defer = function(ms) {
    setTimeout(() => this.call(), ms);
}

f.defer(1000); // shows "Hello!" after 1 second


function f(a, b) {
  alert( a + b );
}

Function.prototype.defer = function(ms) {
    let that = this;
    return function() {
        setTimeout(() => that.apply(this, arguments), ms);
    }
}

f.defer(1000)(1, 2); // shows 3 after 1 second
