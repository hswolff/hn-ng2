import { Pipe } from 'angular2/angular2';

/**
 * @example
 *   var domain = 'http://www.locomotivecms.com/articles/we-tried-to-solve-the-open-source-revenue-equation'
 *   DomainPipe.transform(domain)); // locomotivecms.com
 * @return {string}
 */
export class DomainPipe extends Pipe {
  static transform(input) {
    if (!input) {
      return '';
    }
    var domain = input.split('/')[2];
    return domain ? domain.replace('www.', '') : domain;
  }
}
