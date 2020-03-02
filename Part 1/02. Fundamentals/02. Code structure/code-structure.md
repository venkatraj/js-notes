# Code Structure
A language is made up of alphabets, words, sentences and articles with grammar.

A programming language is no different. 
```
Alphabets => Letters
Words => Keywords
Sentences => Statements
Article => Program
Grammar => Syntax
```

## Letters
We can use all letters in javascript. Let's stick with English letters.

## Keywords
Keywords are words that perform an action. These are built-in in the language. For example, the basic keyword `var` let javascript engine know that we want to store a value and engine does what is needed. (Allocating storage space in this case [and lot more])

## Statements
Javascript statements are made of letters and keywords. We mostly end a statement with `;` but it is not needed in most case. We say most case, because js engine is unable to differentiate this
```javascript
alert('Hello, World!')
[1,2].forEach(alert)
```
Because js don't treat `[` and `(` as beginning of new statement, so it treats above 2 statement as single statement
```javascript
alert('Hello, World!')[1,2].forEach(alert)
```
## Comments
JS supports two type of comments
* Single line comments
* Multiline comments
```javascript
// This is single line comment
`ctrl + /` is the shortcut for single line comment

/**
 * This 
 * is
 * multiline
 * comment
 */

`ctrl + shift + a` is the shortcut for block comments

Nested comments are not supported.