# Switch
If we need to make a predefined set of choice, we will use `switch`
For example, if we run certain block of code for each week day, we can use `switch`
Sure, you can do that using `if`
```js
let day = 3;
if(day == 0) {
    console.log('Sunday');
}
if (day == 1) {
    console.log('Monday');
}
if (day == 2) {
    console.log('Tuesday');
}
if (day == 3) {
    console.log('Wednesday');
}
if (day == 4) {
    console.log('Thursday');
}
if (day == 5) {
    console.log('Friday');
}
if (day == 6) {
    console.log('Saturday');
}
if (day > 6 && day < 0) {
    console.log('No such day');
}
```

Using `switch`
```js
let day = 3;
switch(day) {
    case 0:
        console.log('Sunday');
        break;
    case 1:
        console.log('Monday');
        break;
    case 2:
        console.log('Tuesday');
        break;
    case 3:
        console.log('Wednesday');
        break;
    case 4
        console.log('Thursday');
        break;
    case 5:
        console.log('Friday');
        break;
    case 6:
        console.log('Saturday');
        break;
    default:
        console.log('No such day');
}
```

```js
let a = "1";
let b = 0;

switch (+a) { // + type cast "1" to number 1
  case b + 1:
    alert("this runs, because +a is 1, exactly equals b+1");
    break;

  default:
    alert("this doesn't run");
}
```

```js
let arg = prompt("Enter a value?");
switch (arg) {
  case '0':
  case '1':
    alert( 'One or zero' );
    break;

  case '2':
    alert( 'Two' );
    break;

  case 3: // Because `prompt` returns string type value, not number
    alert( 'Never executes!' );
    break;
  default:
    alert( 'An unknown value' )
}
```