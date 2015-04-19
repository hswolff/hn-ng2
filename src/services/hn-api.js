import Firebase from 'firebase';

const connection = new Firebase('https://hacker-news.firebaseio.com/v0/');

export class HNApi {
  itemStore: Object;
  topStories: Array;

  fetchTopStories() {
    return new Promise((resolve) => {
      let promises = [];

      this.topStoriesRef().once('value', snapshot => {
        this.topStories = snapshot.val().splice(0, 10);

        this.itemStore = this.topStories.reduce((itemStore, itemId) => {
          promises.push(new Promise((resolveItem) => {
            this.itemRef(itemId).on('value', value => {
              itemStore[itemId] = value.val();

              resolveItem();
            });
          }));


          return itemStore;
        }, {});

        Promise.all(promises).then(resolve);
      });
    });

  }

  topStoriesRef() {
    return connection.child('topstories/');
  }

  itemRef(itemId) {
    return connection.child('item/' + itemId);
  }

  fetchUser(userId) {
    return connection.child('user/' + userId);
  }
}
