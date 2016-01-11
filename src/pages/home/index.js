import { Component } from 'angular2/core';
import { HNApi } from '../../services/hn-api';
import { HNItem } from '../../components/hn-item';

@Component({
  selector: 'page-home',
  injectables: [HNApi],
  directives: [
    HNItem
  ],
  template: require('./template.html')
})
export class HomePage {
  constructor(hnApi: HNApi) {
    hnApi.fetchTopStories().then(() => {
      this.topStories = hnApi.topStories;
    });
  }
}
