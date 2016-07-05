# jsAFlag library
Easily change links without having active DOM!
## Main feature
Find and change all `<a href="some_link">` 'some_links' in given string according to given rule.
``` javascript
let html = "...some random text <a class="class1" href="http://www.example.com?t=4">link</a>...";
let flags = new AFlags(html);
flags.setFlags({t:2,s="doom"});
flags.getContext();
//returns "...some random text <a class="class1" href="http://www.example.com?t=2&s=doom">link</a>..."
```

# More possibilities
## ALink class
This object is responsible for link itself. It takes string representing link as an argument of constructor and returns it's object representation.
``` javascript
let link = new ALink("http://www.google.pl");
```
Returned object contains methods which modifies the link elements and can be recieved using simple `.toString()` function.
``` javascript
link.setFlags({key:"123"}).toString()
//returns http://www.google.pl?key=123
```
### With ALink you can
#### Set get params (called flags)
```javascript
new ALink("http://www.google.com").setFlags({key:"123"}).toString()
//returns "http://www.google.com?key=123
```
