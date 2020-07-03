import { mocked } from 'ts-jest/utils'
import { Directive } from '../core/Directive'
import { HttpCrawler } from '../core/HttpCrawler'
import { deepEach } from '../utils/tools'

describe('Toots', () => {
  it('deepEach', () => {
    const obj = {
      a: '1',
      b: '2',
      c: [3, 4, 5, 6],
      d: {
        e: '7'
      }
    };
    deepEach(obj, (value, path) => {
      // console.log(value,path);

      // expect(value).toBe("1");
    });
  });
});

