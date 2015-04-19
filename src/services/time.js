import moment from 'moment';

export function timeAgo(time) {
  return moment(time * 1000).fromNow();
}
