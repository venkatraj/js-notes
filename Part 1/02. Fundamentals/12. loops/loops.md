# Loops: While, do..While and for (for primitive)

Computers are famous to do repetitive tasks tirelessly. Thats what loops are for.
Loops runs a block of code certain no. of times or until certain condition is met.

## The `While` loop
```js
while(condition) {
    // loop body
    // block of code that will run repeteadly until condition becomes false
}
```

```js
let count = 1;
while (count <= 100) {
    console.log(`It is ${count} and counting`);
    count++;
}
console.log("I'm done with counting");
```
A single execution of block of code is called `iteration` The above block of code iterate through 100 times.
```js
let i = 3;
// while (i != 0)
while (i) { // when i becomes 0, the condition becomes falsy, and the loop stops
    console.log( i );
    i--;
}
```
**BEWARE:** Explicit is better than implicit. What if `i` becomes a `NaN`, then `i` becomes `false` and loop exists.
For single statements, curly braces is not needed. But it is best practice to always use them.


## The `do...while` loop
While `while` loop start executing when the condition is true, this structure will excute atleast once and will continue only if condition is true
```js
do {
    // This block of code will be executed once regarless of condition's outcome
} while (condition)
```

```js
let wish = 0;
do {
    wish = prompt('Do you want to play?');
    if (wish == "yes") {
        // Code for your game
        console.log('Let us play')
    } else {
        console.log('You are missing a great game, that is learning');
    }
} while (wish == true);
```

## The `for` loop
`for` is used when no. of times iteration is needed is known
For example, if we want to go through week days, we know that we need to loop through for 7 times.
For months, it will be 12 times and so on. For such tasks, we use `for` loops

**Sytax**
```js
for (begin; condition; step) {
  // ... loop body ...
}
```

```js
for (let i = 1; i <= 12; i++) {
    // code to output month's name
}
```

### Skipping parts
You can skip any one of the 3 parts in a `for` loop
```js
let i = 0; // we have i already declared and assigned

for (; i < 3; ) { // no need for "begin" or "end"
    console.log( i ); // 0, 1, 2
    i++;
}
```
This is basically a while loop
```js
let i = 0;
while(i < 3) {
    console.log(i);
    i++;
}
```
If you write code like above mentioned `for` loop, it will make you look like a smart guy, but fellow programmers who read your code will hate you forever. Even better, if at later stage when there is a need to debug your code you will hate yourself. **REMEMBER** explicit is better than implicit.

## Break and Continue
Sometimes you may want to execute code based upon some conditions. 
```js
for(let i = 0; i < 10; i++) {
    if (i%2 == 0) continue;
    console.log(i);
}
```
```js
for(let i = 0; i < 10; i++) {
    if (i == 5) break;
    console.log(i);
}
```

For example, you write a program that gets your visitors favourite number and then prints only even numbers until his favourite number. Let us do this.
```js
let favourite_number = +prompt('Enter your favourite number');
let i = 0;
while(!isNaN(favourite_number)) {
    i++;
    if (i > favourite_number) break;
    if (i%2 != 0) continue;
    console.log(i);
}
```