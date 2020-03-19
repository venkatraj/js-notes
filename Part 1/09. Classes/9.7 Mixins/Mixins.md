# Mixins
A mixin is a class that contains methods and to be used by other classes without being a parent class of those classes. We don't use Mixin classes independently
## A mixin example
```js
let speechMixin = {
    sayHi() {
        console.log(`Hello, ${this.name}`);
    },
    sayBye() {
        console.log(`Bye ${this.name}`);
    }
};

class User {
    constructor(name) {
        this.name = name;
    }
}

Object.assign(User.prototype, speechMixin);

let myself = new User('Venkat');
myself.sayHi();
myself.sayBye();
```
There is no inheritance here, only method copying with `Object.assign`.
Actually User can be inherited from other class and still use mixin methods
```js
class User extends Person {
    // ...
}
Object.assign(User.prototype, speechMixin);
```
Mixins can use inheritance inside themselves
```js
let speechMixin = {
    say(phrase) {
        console.log(phrase);
    }
};
let greetingsMixin = {
    __proto__: speechMixin,
    sayHi() {
        super.say(`Hello, ${this.name}`);
    },
    sayBye() {
        super.say(`Bye ${this.name}`);
    }
};
class User {
    constructor(name) {
        this.name = name;
    }
}
Object.assign(User.prototype, greetingsMixin);
let myself = new User('Venkat');
myself.sayHi();
myself.sayBye();

// With classes
class SpeechMixin {
    say(phrase) {
        console.log(phrase);
    }
}

class GreetingsMixin extends SpeechMixin {
    sayHi() {
        super.say(`Hello, ${this.name}`);
    }
    sayBye() {
        super.say(`Bye ${this.name}`);
    }
}

class User {
    constructor(name) {
        this.name = name;
    }
}
let mixinObj = new GreetingsMixin();
Object.assign(User.prototype, mixinObj.__proto__);

let myself = new User('Venkat');
myself.sayHi();
myself.sayBye();
// This won't work, because  Object.assign will only copy own enumerable properties
// Where as methods of a class / inherited class are are non enumerable
```
## Event Mixin
```js
let eventMixin = {
    on(eventName, handler) {
        if(!this._eventHandlers) this._eventHandlers = {};
        if (!this._eventHandlers[eventName]) this._eventHandlers[eventName] = [];
        this._eventHandlers[eventName].push(handler);
    },
    off(eventName, handler) {
        if(!this._eventHandlers || !this._eventHandlers[eventName]) return;
        let handlers = this._eventHandlers[eventName];
        handlers = handlers.filter(handlerFunc => handlerFunc !== handler);
    },
    trigger(eventName, ...args) {
        if (!this._eventHandlers || !this._eventHandlers[eventName]) return;
        let handlers = this._eventHandlers[eventName];
        handlers.forEach(handler => handler.apply(this, args));
    }
}
class Menu {
    choose(value) {
        this.trigger('select', value);
    }
}
Object.assign(Menu.prototype, eventMixin);
let menu = new Menu();
menu.on('select', value => console.log(`${value} is selected`));
menu.choose('123');

```
