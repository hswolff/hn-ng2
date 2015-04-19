import 'babel-core/polyfill';
// Need to assign zone to window object for now until bugs are worked out.
import { zone } from 'zone.js';
window.zone = window.Zone = zone;

require('./main.less');

import { Component, View, bootstrap } from 'angular2/angular2';
import { Homepage } from './components/homepage'

@Component({
  selector: 'hacker-news'
})
@View({
  template: `
    <homepage />
  `,
  directives: [
    Homepage
  ]
})
class HackerNewsApp {}

bootstrap(HackerNewsApp);
