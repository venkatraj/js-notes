# Object.keys(), values() and Entries()
```js

  let user = {
    name: "John",
    age: 30
  };

```

```js

  let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
  };

  alert( sumSalaries(salaries) ); // 650

  function sumSalaries(arr) {
    let salaries = Object.values(arr);
    let sum = 0;
    for(let salary of salaries) {
        sum += salary
    }

    return sum;
  }