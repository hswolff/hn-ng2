require('./styles.less');

import { Component, View, For, If } from 'angular2/angular2';
import { HNApi } from '../../services/hn-api';
import { router } from '../../services/router';
import { timeAgo } from '../../services/time';
import { HNItem } from '../../components/hn-item';

@Component({
  selector: 'page-user',
  injectables: [HNApi]
})
@View({
  directives: [
    For,
    If,
    HNItem
  ],
  template: require('./template.html')
})
export class UserPage {
  showSubmissions: boolean;

  constructor(hnApi: HNApi) {
    hnApi.fetchUser(router.userId).then(data => {
      this.data = data;
      this.data.submitted = this.data.submitted.splice(0, 30);
    });

    this.timeAgo = timeAgo;

    this.showSubmissions = false;
  }
}
