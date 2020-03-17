# Date and time
**Date** is a built in object to assist with date and time calculations

## Creating Dates
To create a new date, you'll call `new Date()`

```js

    let now = new Date();
    console.log(now);

```

You could also pass no. of milliseconds to `Date` constructor function.
Which will return a date that is `Jan 1st 1970 UTC+0` + the milliseconds

```js

    // 0 means 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // now add 24 hours, get 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );

```

You can also create a date with date string, but it should be recognizable with `Date.parse()` algorithm

```js

    let date = new Date('2018-03-15');
    console.log(date);

```

You can also create date, if you know the year, month and date and hours/minutes/seconds and milliseconds.
If date is missing then 1 is assumed, for time all parameters have default value 0.
**PS:** month starts with 0 and december is 11

```js

    new Date(year,month,date,hours,minutes,seconds,ms);

    let dob1 = new Date(1974, 03, 30, 08, 20, 0, 0);
    let dob2 = new Date(1974, 03, 30);
    let newYear = new Date(2019,01);

    console.log(dob1);
    console.log(dob2);
    console.log(newYear);

```

Refer: https://javascript.info/date
and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

You don't need to memories or learn it now. Get back to it when you work with date

