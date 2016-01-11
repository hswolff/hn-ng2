require('./styles.less');

import { Component } from 'angular2/core';
import { HNApi } from '../../services/hn-api';
import { router } from '../../services/router';
import { HNItem } from '../../components/hn-item';

@Component({
  selector: 'page-item',
  injectables: [HNApi],
  directives: [
    HNItem
  ],
  template: require('./template.html')
})
export class ItemPage {
  constructor(hnApi: HNApi) {
    this.itemId = router.itemId;
    hnApi.fetchItem(router.itemId).then(data => {
      if (data) {
        this.childrenIds = data.kids;
      }
    });
  }
}
