require('./styles.less');

import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { HNApi } from '../../services/hn-api';
import { timeAgo } from '../../services/time';
import { HNItem } from '../../components/hn-item';

@Component({
  selector: 'page-user',
  injectables: [HNApi],
  directives: [
    HNItem
  ],
  template: require('./template.html')
})
export class UserPage {
  constructor(hnApi: HNApi, routeParams: RouteParams) {
    hnApi.fetchUser(routeParams.get('id')).then(data => {
      this.data = data;
      this.data.submitted = this.data.submitted.splice(0, 30);
    });

    this.timeAgo = timeAgo;

    this.showSubmissions = false;
  }
}
