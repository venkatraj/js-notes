# 5.11 JSON Methods, toJSON
It is easy to send data in string format over internet than in object format. So we need to convert our object (say, a user object) into string format to send it over network.

There is a standard for this called JSON (Javascript object notation). This standard becomes popular and over took XML for data exchanges between applications.

To convert an object into a string we'll use `JSON.stringify`
```js

  let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    wife: null
  };

  let json = JSON.stringify(student);

  console.log(typeof json); // we've got a string!

  console.log(json);
  /* JSON-encoded object:
  {
    "name": "John",
    "age": 30,
    "isAdmin": false,
    "courses": ["html", "css", "js"],
    "wife": null
  }
  */

  ```

  ```js

    console.log(JSON.stringify(1)); // "1"
    console.log(JSON.stringify('Venkat')); // "Venkat"
    console.log(JSON.stringify(true)); // "true"
    console.log(JSON.stringify(null)); // "null"
    console.log(JSON.stringify(undefined)); // undefined
    console.log(JSON.stringify(Symbol('id'))); // undefined

```

Since JSON is used to exchange data between applications of different platform (languages), following properties are skipped

* Function properties (methods).
* Symbolic properties.
* Properties that store undefined.


```js

  let user = {
    sayHi() { // ignored
      alert("Hello");
    },
    [Symbol("id")]: 123, // ignored
    something: undefined // ignored
  };

  console.log( JSON.stringify(user) ); // {} (empty object)

```

## Converting nested objects.
It is possible to convert complex nested objects into JSON format

```js

  let meetup = {
    title: "Conference",
    room: {
      number: 123,
      participants: ["john", "ann"]
    }
  };

  console.log( ( JSON.stringify(meetup) );
  // {"title":"Conference","room":{"number":123,"participants":["john","ann"]}}

```

There is an **important limitation** There should be no circular reference

```js

  let room = {
    number: 23
  };

  let meetup = {
    title: "Conference",
    participants: ["john", "ann"]
  };

  meetup.place = room;       // meetup references room
  room.occupiedBy = meetup; // room references meetup

  JSON.stringify(meetup); // TypeError: cyclic object value

```

## Excluding and transforming: replacer
In the previous example, we saw that `JSON.stringify()` won't work for objects with circular reference. We may still want to send that object to remote server, by excluding that circular reference. `JSON.stringify()` provides a way to do it.

**Full Syntax**
```js
let json_encoded = JSON.stringify(value[, replacer, space])
```
### replacer
Here the second argument `replacer` can be used to eliminate the unwanted properties or transform it.
To eliminate, we will provide an array of properties, only those properties will be stringified. To transform we will provide a mapping function `function(key, value)`

### space
Amount of space to use for formatting

Let us see examples.
```js

  let room = {
    number: 23
  };

  let meetup = {
    title: 'Conference',
    participants: [{name: 'John'}, {name: 'Doe'}],
    place: room // meetup reference room
  };

  room.occupiedBy = meetup; // room references meetup

  // Here we want to stringify meetup object, but this has circilar reference. Let's remove it by using `replacer` argument

  // We only want two properties and exclude `place` property
  console.log(JSON.stringify(meetup, ['title', 'participants'])); 

```
The above code excludes `place` but it also excludes `name` property and leaving participants an array of empty objects. Let's fix that

```js

  let room = {
    number: 23
  };

  let meetup = {
    title: 'Conference',
    participants: [{name: 'John'}, {name: 'Doe'}],
    place: room // meetup reference room
  };

  room.occupiedBy = meetup; // room references meetup

  // We only want to exclude `place` property
  console.log(JSON.stringify(meetup, ['title', 'participants','name','place','number'])); 

```

The above code works fine for our example object. But it becomes an issue we have a complex object with 10s and 100s of properties. We can't list every property in array and it will be hard to maintain. Fortunately, we can use mapping function in place of the array. So let's use that.
A mapping function take `key, value` pair and transforms and returns it. If this particular use case, we only want to exclude circular reference. So the mapping function should return `value` as it is and return `undefined` for excluded properties.

```js

  let room = {
    number: 23
  };

  let meetup = {
    title: 'Conference',
    participants: [{name: 'John'}, {name: 'Doe'}],
    place: room // meetup reference room
  };

  room.occupiedBy = meetup; // room references meetup

  let json_encoded = JSON.stringify(meetup, (key, value) => {
    console.log(`${key}: ${value}`);
    return key === 'occupiedBy' ? undefined: value;
  });

/*
: [object Object]
title: Conference
participants: [object Object],[object Object]
0: [object Object]
name: John
1: [object Object]
name: Doe
place: [object Object]
number: 23
occupiedBy: [object Object]
*/

console.log(json_encoded);
/*
{"title":"Conference","participants":[{"name":"John"},{"name":"Doe"}],"place":{"number":23}}
*/

```
As you can see from the above example the mapping function is called by every property. i.e. If the property has a value that is object itself, then it is called recursively.

The value of `this` inside replacer is the object that contains the current property.

As you can see from the output, the first call is special. It has an empty key.
i.e. the whole value `meetup` is wrapped in an object like this
`{"": meetup}` JS does so that mapping function has full power, now it can even do transform or skip the whole object if necessary.

## Formatting: Spacer
The third argument is only used for debugging / logging encoded json.
Without it, the object is stringified without spaces or indents. It is fine to send the object over network. However, if we would like to inspect the encoded json, it should be printed nicely, so that we can see the nested objects and like. We use the 3rd argument spacer for that (and we can omit replacer functionality by supplying `null` as 2nd argument)

```js

let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/* two-space indents:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* for JSON.stringify(user, null, 4) the result would be more indented:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/

```

## Custom `toJSON`
Similar to `toString`, objects can implement its own JSON convertion methods.
In fact some built in object's like `Data` have its own implementation of `toJSON`. When we pass such object's to `JSON.stringify`, it is called automatically.

```js

  let dob = new Date('1974/04/30');
  console.log(dob); // prints object
  console.log(JSON.stringify(dob)); // "1974-04-29T18:30:00.000Z"

```

Let's take this example
```js

  let room = {
    number: 23
  };

  let meetup = {
    title: "Conference",
    date: new Date(Date.UTC(2017, 0, 1)),
    room
  };

  alert( JSON.stringify(meetup) );
  /*
    {
      "title":"Conference",
      "date":"2017-01-01T00:00:00.000Z",  // (1)
      "room": {"number":23}               // (2)
    }
  */

```
Here the date is converted to JSON using it own `toJSON` method.
But having value of object `{number: 23}` for `room` property doesn't make any sense. It could be just `23`. Let us achieve that by using custom `toJSON` method in `room` object

```js

  let room = {
    number: 23,
    toJSON() {
      return this.number;
    }
  };

  let meetup = {
    title: "Conference",
    date: new Date(Date.UTC(2017, 0, 1)),
    room
  };

  console.log( JSON.stringify(meetup) );
  /*
    {
      "title":"Conference",
      "date":"2017-01-01T00:00:00.000Z",
      "room":23
    }
  */

  ```

  ## JSON.parse
  We use `JSON.stringify` to encode objects into JSON format, so that we can send it over network. The reverse is necessary as well. When we receive an JSON encoded string, we need to convert it back to object to be used in our application. For that we can use `JSON.parse` which decodes JSON encoded object (i.e. stringified object) into real object.

  **Syntax**
  ```js

    let obj = JSON.parse(str[, reviver]);

  ```
  Here the stringied object is first argument and mapping function is 2nd argumnet, if needed.
  ### str
  JSON string to parse
  ### reviver
  Optional mapping function (key, value)

  ```js

    let user = {
      name: 'John',
      age: 30
    };

    let stringifiedUser = JSON.stringify(user);
    console.log(stringifiedUser);
    /* {"name":"John","age":30} */

    let userObject = JSON.parse(stringifiedUser);
    console.log(userObject);
    /* Object { name: "John", age: 30 } */

```

Works for nested objects too

```js

  let user = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

  user = JSON.parse(user);
  console.log(user);
  /*
  Object { name: "John", age: 35, isAdmin: false, friends: […] }
  */

```

If we are to write handwritten JSON for debugging purpose, we should be careful with syntax as all keys should be double quoted and no expressions are allowed. Remember `JSON is a data only cross platform specification`

```js

  let json = `{
    name: "John",        // mistake: property name without quotes
    "surname": 'Smith',  // mistake: single quotes in value (must be double)
    'isAdmin': false     // mistake: single quotes in key (must be double)
    "birthday": new Date(2000, 2, 3), 
    // mistake: no "new" is allowed, only bare values
    "friends": [0,1,2,3] // here all fine
  }`;

  let json = `{
    name: "John",        
    "surname": 'Smith',  
    'isAdmin': false     
    "birthday": new Date(2000, 2, 3),     
    "friends": [0,1,2,3] 
  }`;

```
And comments are not allowed and it makes json invalid (`data-only`)


## riviver
make this work
```js

  let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
  let meetup = JSON.parse(str);
  console.log( meetup.date.getDate() ); // Error!

```

```js

  let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
  let meetup = JSON.parse(str, (key, value) => { return key === 'date' ? new Date(value) : value});
  alert( meetup.date.getDate() ); // Works

```
