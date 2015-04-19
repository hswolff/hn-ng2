import Firebase from 'firebase';

const connection = new Firebase('https://hacker-news.firebaseio.com/v0/');

export class HNApi {
  itemStore: Object;
  userStore: Object;
  topStories: Array;

  constructor() {
    this.itemStore = {};
    this.userStore = {};
  }

  fetchTopStories() {
    return new Promise((resolve) => {
      this.topStoriesRef().once('value', snapshot => {
        this.topStories = snapshot.val().splice(0, 20);

        resolve(this.topStories);
      });
    });
  }

  fetchItems(items = []) {
    return new Promise(resolve => {
      let promises = [];

      items.forEach(itemId => {
        promises.push(new Promise((resolveItem) => {
          this.itemRef(itemId).on('value', value => {
            this.itemStore[itemId] = value.val();

            resolveItem(this.itemStore[itemId]);
          });
        }));
      });

      Promise.all(promises).then(resolve);
    });
  }

  fetchItem(item) {
    if (!item) {
      return Promise.reject();
    }

    return this.fetchItems([item]).then(data => data[0]);
  }

  fetchUser(userId) {
    if (!userId) {
      return Promise.reject();
    }

    return new Promise(resolve => {
      this.userRef(userId).on('value', value => {
        this.userStore[userId] = value.val();

        resolve(this.userStore[userId]);
      });
    });
  }

  topStoriesRef() {
    return connection.child('topstories/');
  }

  itemRef(itemId) {
    return connection.child('item/' + itemId);
  }

  userRef(userId) {
    return connection.child('user/' + userId);
  }
}
