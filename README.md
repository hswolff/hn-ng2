# hn-ng2

Hacker News made with [Angular 2](https://angular.io/).


## Todo

- [ ] Actually use Firebase's life updating and propogate those changes in the UI.
- [ ] Dynamically load templates to achieve. Desire is to be able to do this:
  `<div ng-include="'/components/hn-item/hn-item--' + (data.type || 'story') + '.html'" />`
- [ ] Pre-warm the template cache for production builds.
- [ ] Create and register new pipes (filters) for components.
- [ ] User angular-router 2 when it's available.
- [ ] The angular2 equivalent for `ng-bind-html`
- [ ] How to create same `@Component` `properties` keys and values. So that I can have:
   ```javascript
   @Component({
     properties: {
       itemId: 'itemId',
     }
   })
   ```
- [ ] Implement recursive `<hn-items />` so we can render comment trees.


## Develop

1.  `npm install`
1.  `gulp watch`
1.  Open `http://localhost:8080/`.


## Build

1.  `npm install && bower install`
1.  `gulp build`


## License

The MIT License

Copyright (c) 2015 Harry Wolff http://hswolff.com/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.