# Hello, World    
It is a tradition to learn a programming language by first making it say "Hello, World!". We follow tradition here.

## Ways to include JS in HTML
There are two ways to include javascript in a HTML file.
* Inline JS
* External JS file

For both method, we use `script` tag
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script

## Inline JS
```html
<script>
    alert('Hello, World!');
</script>
```

## External JS
If you decide to put your javascript code in an external js file (which is good practice and efficient), you don't need `<script>` tag in that file. Instead you'll use it, when you include that file in your HTML page.

Let us say, we have `script.js` file in `js` folder, we'll include it in `index.html` file which is in root like below
```html
<script src="js/script.js"></script>
```

Use simple js in HTML and complex in external file. Because it is cached and reduces page load time


### Things to avoid
If you do this, then inline js code will be ignored and external js will be used.
```html
<script src="js/script.js">
alert("Hello, World!");
</script>
```
### Placement of `script` tag
top => Render blocking js
bottom => analytics js won't work
the new `defer` keyword

## No JS Support
Use <noscript> tag in both `head` and `body` sections

## Old Code
You may see something like this (code within html comments) in existing website / code base, but it is only for older browsers and no longer needed
```html
<script type="text/javascript"><!--
alert('Hello, World!');
//-></script>
```
Attributes like `type="text/javascript"` and `language="javascript"` are also for older browsers and no longer needed.

This only needs when we use XHTML or XML. Since we are using HTML5 this also no longer needed.
```html
<script type="text/javascript">
//<![CDATA[
alert('Hello, World!');
//]]>
</script>
```


#### Note
We will use `console.log` from now onwards and see results in browser console. We will avoid annoying browser popups caused by `alert`

## Exercises
1. Show an alert
2. Show an alert with an external script
