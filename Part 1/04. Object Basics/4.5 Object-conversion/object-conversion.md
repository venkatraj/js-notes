# Object to primitive conversion

What happens when you add objects or subtract them? `obj1 + obj2` or
`obj1 - obj2`

We have already seen `Type Conversion` rules for primitive types. But haven't seen objects then. Now we know objects and methods, we can see object conversion as well.

All objects can be converted in to numberic and string, but not boolean because all objects are true 

## ToPrimitive
When an object is used where a primitive is expected, it is converted into a primitive value based on `ToPrimitive` algorithm. It converts to primitive based on 3 hints `string, number and default`

### String hint
```js

    // alert expects a string to echo
    alert(obj);

    // using object as a property key which should be a string
    anotherObj[obj] = 123;

```

### Number hint
```js

    // explicit conversion
    let num = Number(obj);

    // maths (*EXCEPT* binary plus, which is also str concatenation)
    let n = +obj; // unary plus
    let delta = date1 - date2;

    // less/greater comparison
    let greater = user1 > user2;

```

### Default hint
It occurs when operator is not sure what type to expect.
For example binary plus operator can work on both numbers and strings
`==` can work on number, string and symbol
```js

    // binary plus
    let total = car1 + car2;

    // obj == string/number/symbol
    if (user == 1) { ... };

```

All built-in objects implement `default` conversion same as `number` except `Date` object

**To do the conversion, JavaScript tries to find and call three object methods:**

1. Call obj[Symbol.toPrimitive](hint) if the method exists, 
2. Otherwise if hint is "string" try obj.toString() and obj.valueOf(), whatever exists.
3. Otherwise if hint is "number" or "default" try obj.valueOf() and obj.toString(), whatever exists.

## Symbol.toPrimitive
There’s a built-in symbol named Symbol.toPrimitive that should be used to name the conversion method, like this:
```js

    obj[Symbol.toPrimitive] = function(hint) {
    // return a primitive value
    // hint = one of "string", "number", "default"
    }

    "use strict"
    let user = {
        name: "John",
        money: 1000,

        [Symbol.toPrimitive](hint) {
            console.log(`hint: ${hint}`);
            return hint == "string" ? `{name: "${this.name}"}` : this.money;
        }
    };

    // conversions demo:
    alert(user); // hint: string -> {name: "John"}
    console.log(+user); // hint: number -> 1000
    console.log(user + 500); // hint: default -> 1500

```

## toString / valueOf
When there is no support for `Symbol` is in js, conversion took place using `toString` and `valueOf` methods

When context expects string, then `toString()` is called, if not exists `valueOf` is called.
When context expects number, then `valueOf()` is called, if not exists `toString` is called.

```js

    let user = {
    name: "John",
    money: 1000,

    // for hint="string"
    toString() {
        return `{name: "${this.name}"}`;
    },

    // for hint="number" or "default"
    valueOf() {
        return this.money;
    }

    };

    alert(user); // toString -> {name: "John"}
    alert(+user); // valueOf -> 1000
    alert(user + 500); // valueOf -> 1500

```

## Catch All => toString()
We can use `toString` method in object as "catch-all" for all primitive conversions

```js

    let user = {
    name: "John",

    toString() {
        return this.name;
    }
    };

    alert(user); // toString -> John
    alert(user + 500); // toString -> John500

```

```js

    let obj1 = {
    toString() { // toString handles all conversions in the absence of other methods
        return "2";
    }
    };

    console.log(obj1 * 2); // 4, ToPrimitive gives "2", then it becomes 2

    let obj2 = {
    toString() {
        return "2";
    }
    };

    console.log(obj2 + 2); // 22 (ToPrimitive returned string => concatenation)

    let obj3 = {
    toString() {
        return true;
    }
    };

    console.log(obj3 + 2); // 3 (ToPrimitive returned boolean, not string => ToNumber)

```