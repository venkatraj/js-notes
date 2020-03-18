# Property flags and descriptors
So far we knew that an object property is a `key-value` pair. But the fact is that a property has four attributes namely `configurable, enumerable, value and writable`.

It is like a property key itself is an object and has four properties (flags)
```js

  let user = {
    name: 'Venkat'
  };

  // Pseudo
  let user = {
    name: {
      configurable: true,
      enumerable: true,
      value: 'Venkat',
      writable: true
    }
  }

```
`writable` set to `true` means the property is writable and value can be changed in a program.
`enumerable` set to `true` means the property will be displayed in a for..in loop
`configurable` set to `true` means the other attributes can be set to `false`

By default all these 3 attributes are set to `true`

To see this in action we can use `Object.getOwnPropertyDescriptor` method like so

```js

  let user = {
    name: 'Venkat'
  };

  Object.getOwnPropertyDescriptor(user, "name");

```
The return value of `Object.getOwnPropertyDescriptor` is called `property descriptor object`


```js
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

To change the flag, we use `Object.defineProperty()` method

It syntax is 
```js

  Object.defineProperty(obj, propertyName, descriptorObj)
  
```

```js

  let user = {
    name: 'Venkat'
  };

  Object.defineProperty(user, "age", {
    value: 43,
    configurable: true,
    writable: false,
    enumerable: true
  });

  console.log(user.age); // 43
  user.age = 44; // Can't write.

  Object.defineProperty(user, 'profession', {
    value: 'Software Engineer'
  });

  user.profession = 'Web Developer';
  // Can't write because, when creating properties
  // If flags are not mentioned, then `false` is assumed

  Object.defineProperty(user, "name", {
    value: 'Venkat Raj'
  });

  user.name = 'N. Venkat Raj'; 
  // Can write, if flags are not provided in `descriptor object`
  // when updating them, they are intact. No change is made

  console.log(user);

```

## No redefining of configurable property flag

```js

    let user = {
      name: 'Venkat'
    };
    // By default `user` is configurable, so let's configure it

    Object.defineProperty(user, "name", {
      value: 'Venkat Raj',
      configurable: false
    });


    user.name = 'N. V'; // Can write, because writable and enumerable are still true
    console.log(user);

    Object.defineProperty(user, 'name', {
      configurable: true
    });
    // Not happening

    user.name = 'Venkat';

```

## Object.defineProperties

To change multiple properties flag, we use `Object.defineProperties`

Syntax is

```js

  Object.defineProperties(obj, {
    prop1: descriptorObj1,
    prop2: descriptorObj2,
    // and so on
  });

```

Real life example

```js

  let user = {
    name: 'Venkat',
    age: 44,
    profession: 'Software Developer'
  };

  // Let's make all properties non-writable
  Object.defineProperties(user, {
    name: { writable: false },
    age: { writable: false },
    profession: { writable: false }
  });

  user.name = 'Raj';
  user.age = 21;
  user.profession = 'Software Engineer';

  // Not working :(
  console.log(user);

```

## Object.getOwnPropertyDescriptors
To get property descriptor object, we used `Object.getOwnPropertyDescriptor` method
To get descriptors of all properties, we can use `Object.getOwnPropertyDescriptors` method

Syntax is

```js

    let descriptors = Object.getOwnPropertyDescriptors(obj);

```

Real life example

```js

  let user = {
    name: 'Venkat',
    age: 44,
    profession: 'Software Developer'
  };

  let nameDescriptor = Object.getOwnPropertyDescriptor(user, 'name');
  let descriptors = Object.getOwnPropertyDescriptors(user);

  console.log(JSON.stringify(nameDescriptor, null, 2));
  console.log(JSON.stringify(descriptors, null, 2));

```

## Sealing an object globally

### Forbid adding new properties
Syntax
```js

  Object.preventExtensions(obj);

```
Real life example

```js

  let user = {
    name: 'Venkat',
    age: 44,
    profession: 'Software Engineer'
  };

  Object.preventExtensions(user);

  // Not working. TypeError thrown only in strict mode
  user.isAdmin = true;
  console.log(user);

  // Can delete, only property addition is prevented
  delete user.age;
  console.log(user);

```

## Forbid Add/remove properties, set all existing properties `configurable: false`

```js

  let user = {
    name: 'Venkat',
    age: 44,
    profession: 'Software Engineer'
  };

  Object.seal(user);

  // Not working
  user.isAdmin = true;
  delete user.age;

  // This will work, because `writable` is still true
  user.name = 'Venkat Raj';

  console.log(user);

```

## Forbid add/remove/change properties. Sets `configurable` and `writable` to false

```js

  let user = {
    name: 'Venkat',
    age: 44,
    profession: 'Software Engineer'
  };

  // Not working
  user.isAdmin = true;
  user.age = 23;
  delete user.profession;

  console.log(user);

```

## Object.isExtensible

```js

  let user = {
    name: 'Venkat',
    age: 44
  };

  let admin = {
    name: 'Raj',
    isAdmin: true
  };

  Object.preventExtensions(admin);

  if (Object.isExtensible(user)) {
    user.isAdmin = false;
    console.log(user);
    console.log("Object 'user' is extensible");
  }


  if (false === Object.isExtensible(admin)) {
    admin.age = 23; // Not working
    console.log(admin);
    console.log("Object 'admin' is not extensible");
  }

```

## Object.isSealed(obj)

```js

  let user = {
    name: 'Venkat',
    isAdmin: false
  };

  let admin = {
    name: 'Raj',
    isAdmin: true
  };

  Object.seal(admin);

  if (false === Object.isSealed(user)) {
      console.log("We Can add or remove properties from 'user' object");
  }

  if (true === Object.isSealed(admin)) {
    console.log("Can't add or remove properties from 'admin' object");
  }

```

## Object.isFrozen(obj)

```js

  let user = {
    name: 'Venkat',
    isAdmin: false
  };

  let admin = {
    name: 'Raj',
    isAdmin: true
  };

  Object.freeze(admin);

  if (false === Object.isFrozen(user)) {
      console.log("We Can add or remove properties from 'user' object");
      console.log('We can also change property values');
  }

  if (true === Object.isFrozen(admin)) {
    console.log("Can't add or remove properties from 'admin' object");
    console.log("Can't change property value");
  }

```