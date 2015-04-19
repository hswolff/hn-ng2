function parseQueryString() {
  let parsed = {};

  let query = window.location.search.substring(1);
  query.split('&').forEach(function(val) {
    let pair = val.split('=');
    parsed[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  });

  return parsed;
}

class Router {
  constructor() {
    this.queryObj = parseQueryString();

    this.itemId = this.queryObj.itemId;
    this.userId = this.queryObj.userId;
  }

  urlForUser(id) {
    return `index.html?userId=${id}`;
  }

  urlForItem(id) {
    return `index.html?itemId=${id}`;
  }
}

export var router = new Router();
