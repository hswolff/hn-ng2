require('./styles.less');

import { Component, View, For, If, Switch, SwitchWhen, SwitchDefault } from 'angular2/angular2';
import { HNApi } from '../../services/hn-api';
import { router } from '../../services/router';
import { timeAgo } from '../../services/time';
import { DomainPipe } from './domain.pipe';

var hnApi;

@Component({
  selector: 'hn-item',
  injectables: [HNApi],
  properties: {
    newItemId: 'itemId',
    newLoadChildren: 'loadChildren',
    newTopLevel: 'topLevel'
  }
})
@View({
  template: require('./template.html'),
  directives: [
    For,
    If,
    Switch,
    SwitchWhen,
    SwitchDefault
  ]
})
export class HNItem {
  data: Object;

  constructor(hnApiInstance: HNApi) {
    this.domainPipe = DomainPipe.transform;

    // Default value.
    this.loadChildren = true;

    // Make accessible in other methods.
    hnApi = hnApiInstance;

    this.urlForUser = router.urlForUser;
    this.urlForItem = router.urlForItem;

    this.timeAgo = timeAgo;
  }

  set newItemId(itemId) {
    this.itemId = itemId;
    this.fetchData();
  }

  set newLoadChildren(loadChildren) {
    this.loadChildren = loadChildren === 'true';
  }

  set newTopLevel(topLevel) {
    this.topLevel = topLevel === 'true';
  }

  fetchData() {
    hnApi.fetchItem(this.itemId).then(data => {
      this.data = data;
    });
  }
}
