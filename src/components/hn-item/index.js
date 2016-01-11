require('./styles.less');

import { Component } from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import { HNApi } from '../../services/hn-api';
import { timeAgo } from '../../services/time';
import { DomainPipe } from './domain.pipe';

@Component({
  selector: 'hn-item',
  injectables: [HNApi],
  properties: [
    'itemId',
    'loadChildren',
    'topLevel'
  ],
  template: require('./template.html'),
  directives: [
    ROUTER_DIRECTIVES
  ]
})
export class HNItem {
  constructor(hnApiInstance: HNApi) {
    this.domainPipe = DomainPipe.transform;

    // Default value.
    this.loadChildren = true;

    // Make accessible in other methods.
    this._hnApiInstance = hnApiInstance;

    this.timeAgo = timeAgo;
  }

  get itemId() {
    return this._itemId;
  }

  set itemId(itemId) {
    this._itemId = itemId;
    this.fetchData();
  }

  fetchData() {
    this._hnApiInstance.fetchItem(this.itemId).then(data => {
      this.data = data;
    });
  }
}
