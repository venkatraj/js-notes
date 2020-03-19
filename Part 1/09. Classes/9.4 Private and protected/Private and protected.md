# Private and protected properties and methods
Traditional OOP languages has access modifiers such as 
* public
* protected 
* private

`public` properties and methods can be accessed from anywhere

`protected` properties and methods can be accessed inside that class and classes which inherits that class

`private` properties and methods can be accessed ONLY inside that class

Historically, javascript only HAD `public` properties and methods.

Developers emulated `protected` properties and methods by using a convention of prefixing properties and methods with `_` 
We have seen it in action in our `7.2 Property getters and setters` article

RECENTLY, javascript language has added `private` and it still need to be implemented by even modern JS Engines and needs polyfills and transpilers like babeljs to work.

You need to prefix `private` properties and methods with `#`

```js
class CoffeeMachine {
  #waterLimit = 200;
  _test = 'Ok';

  #checkWater(value) {
    if (value < 0) throw new Error("Negative water");
    if (value > this.#waterLimit) throw new Error("Too much water");
  }

}

let coffeeMachine = new CoffeeMachine();

// can access emulated protected property
coffeeMachine._test = 'Tested'
console.log(coffeeMachine._test); // Tested
// can't access privates from outside of the class
coffeeMachine.#checkWater(); // Error
coffeeMachine.#waterLimit = 1000; // Error

class MegaCoffeeMachine extends CoffeeMachine {
  method() {
    alert( this.#waterAmount ); // Error: can only access from CoffeeMachine
  }
}

```

As you can see from the example code above, `private` properties can't be access outside of class or the class that extends it. It is `enforced` by the language itself. Where as `protected` properties and methods (prefixed with `_`) are conventions followed by developers and not enforced by language itself.

### Private fields are not available as this[name]

```js
class User {
  name = 'Venkat'
  #age = '45'
  sayHi() {
    let fieldName1 = "name";
    let fieldName2 = '#age';
    // this[#age] won't work
    console.log(`Hello, ${this[fieldName1]}, are you ${this[fieldName2]} years old?`);
  }
}

const myself = new User();
myself.sayHi(); // Hello, Venkat, are you `undefined` years old?
```