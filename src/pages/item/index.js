require('./styles.less');

import { Component, View, For } from 'angular2/angular2';
import { HNApi } from '../../services/hn-api';
import { router } from '../../services/router';
import { HNItem } from '../../components/hn-item';

@Component({
  selector: 'page-item',
  injectables: [HNApi]
})
@View({
  directives: [
    For,
    HNItem
  ],
  template: require('./template.html')
})
export class ItemPage {
  childrenIds: Array;

  constructor(hnApi: HNApi) {
    this.itemId = router.itemId;
    hnApi.fetchItem(router.itemId).then(data => {
      if (data) {
        this.childrenIds = data.kids;
      }
    });
  }
}
