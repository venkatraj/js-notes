# Modern Mode
As we said in introduction, javascript is invented in 14 days and has its quirks. It became so popular and those quirks needs to be addressed.

## ECMA
### European Computer Manufacturers Association
After becoming popular, quickly netscape and microsoft realize that there needs to be a standard or else the web users will be split into groups. So, standardization was taken place and ECMA is in-charge of it.

In 2009, a new standard is released and called ECMAScript 5

Javascript is a language that implements ECMAScript standards. ES5 addressed few quirks and made developers life easier. But for backward compatibility, we need both standards to work (ES5 and old ES3 and beyond)

To use ES5 features in our script, we need to put `"use strict"` at the top of our code. It is also possible to make only a function to use ES5 features by placing `"use strict"` at the top of the function body.

Moderns features such as classes and modules are automatically uses strict mode.

*NOTE:* Like js files, browser console too run in default mode, not in `use strict` mode
