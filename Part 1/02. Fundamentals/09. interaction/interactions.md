# Interaction: Alert, Prompt and Confirm

## Alert
Used to show a message in modal window and pause script execution until user presess 'ok'

```js
alert(message);
```
**Modal Window* means user can't interact with rest of the page until he preses ok on window.

## Prompt
This shows a input text field with title and optional placeholder in a modal window and returns user entered text.

```js
result = prompt(title,[default]);
```
Practical example:
```js
let age = prompt('How old are you?', 18);
if (age > 18) {
  console.log('You are an adult');
} else {
  console.log('You are still a kid');
}
```
## Confirm
Used to get yes/no response from user for a question. 

```js
let toDelete = confirm('Are you sure you want to delete this?');
if (true == toDelete) {
  console.log('Code to delete');
}
```



