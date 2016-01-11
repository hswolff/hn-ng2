// vendor: start
import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/lib/browser/zone-microtask';

import 'angular2/core';
import 'angular2/platform/browser';
import 'angular2/router';
// vendor: end

import {bootstrap} from 'angular2/platform/browser';
import {
  enableProdMode,
  Component
} from 'angular2/core';

if (__DEV__ === false) {
  enableProdMode();
}

require('./main.less');

import { router } from './services/router';
import { HNApi } from './services/hn-api';

import { HomePage } from './pages/home';
import { ItemPage } from './pages/item';
import { UserPage } from './pages/user';

@Component({
  selector: 'hacker-news',
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

bootstrap(HackerNewsApp, [
  HNApi
]);
