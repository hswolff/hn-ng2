import 'babel-core/polyfill';
// Need to assign zone to window object for now until bugs are worked out.
import { zone } from 'zone.js';
window.zone = window.Zone = zone;

require('./main.less');

import { Component, View, bootstrap } from 'angular2/angular2';
import { Homepage } from './pages/home'

@Component({
  selector: 'hacker-news'
})
@View({
  template: `
    ${require('./header-bar.html')}
    <homepage></homepage>
    ${require('./footer-bar.html')}
  `,
  directives: [
    Homepage
  ]
})
class HackerNewsApp {}

bootstrap(HackerNewsApp);
