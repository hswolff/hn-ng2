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
  provide,
  Component
} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

if (__DEV__ === false) {
  enableProdMode();
}

require('./main.less');

import { HNApi } from './services/hn-api';

import { HomePage } from './pages/home';
import { ItemPage } from './pages/item';
import { UserPage } from './pages/user';

@Component({
  selector: 'hacker-news',
  template: `
    ${require('./header-bar.html')}
    <router-outlet></router-outlet>
    ${require('./footer-bar.html')}
  `,
  directives: [
    ROUTER_DIRECTIVES,
    HomePage,
    ItemPage,
    UserPage
  ]
})
@RouteConfig([
  { path: '/', component: HomePage, as: 'Home' },
  { path: '/item/:id', component: ItemPage, as: 'Item' },
  { path: '/user/:id', component: UserPage, as: 'User' }
])
class HackerNewsApp {}

bootstrap(HackerNewsApp, [
  HNApi,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
