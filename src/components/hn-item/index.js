require('./styles.less');

import { Component, View, If } from 'angular2/angular2';
import { HNApi } from '../../services/hn-api';
import { DomainPipe } from './domain.pipe';
import moment from 'moment';

var hnApi;

@Component({
  selector: 'hn-item',
  injectables: [HNApi],
  properties: {
    'newItemId': 'itemId'
  }
})
@View({
  template: require('./template.html'),
  directives: [
    If
  ]
})
export class HNItem {
  data: Object;

  constructor(hnApiInstance: HNApi) {
    this.domainPipe = DomainPipe.transform;

    // Make accessible in other methods.
    hnApi = hnApiInstance;
  }

  set newItemId(itemId) {
    this.itemId = itemId;
    this.fetchData();
  }

  fetchData() {
    hnApi.fetchItem(this.itemId).then(data => {
      this.data = data;
    });
  }

  urlForUser(id) {
    return `user.html?id=${id}`;
  }

  urlForItem(id) {
    return `item.html?id=${id}`;
  }

  timeFrom(time) {
    return moment(time * 1000).fromNow();
  }
}
