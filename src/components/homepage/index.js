import { Component, View, For } from 'angular2/angular2';
import { HNApi } from '../../services/hn-api';

@Component({
  selector: 'homepage',
  injectables: [HNApi]
})
@View({
  directives: [
    For
  ],
  template: `
    <h1>Hacker News in Angular2</h1>

    <ul>
      <li *for="#item of topStories">
        {{item.title}}
      </li>
    </ul>
  `
})
export class Homepage {
  topStories: Array;

  constructor(hnApi: HNApi) {
    hnApi.fetchTopStories().then(() => {
      this.topStories = hnApi.topStories.map(itemId => {
        return hnApi.itemStore[itemId];
      });
    });
  }
}
