import 'babel-core/polyfill';
// Need to assign zone to window object for now until bugs are worked out.
import { zone } from 'zone.js';
window.zone = window.Zone = zone;

require('./main.less');

import { Component, View, bootstrap } from 'angular2/angular2';
import { router } from './services/router'
import { HomePage } from './pages/home'
import { ItemPage } from './pages/item'
import { UserPage } from './pages/user'


@Component({
  selector: 'hacker-news'
})
@View({
  template: `
    ${require('./header-bar.html')}
    ${router.itemId ? '<page-item></page-item>' : ''}
    ${router.userId ? '<page-user></page-user>' : ''}
    ${!(router.itemId || router.userId) ? '<page-home></page-home>' : ''}
    ${require('./footer-bar.html')}
  `,
  directives: [
    HomePage,
    ItemPage,
    UserPage
  ]
})
class HackerNewsApp {}

bootstrap(HackerNewsApp);
