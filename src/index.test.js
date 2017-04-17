import { assert, expect } from 'chai';
import hltvApi from './index';

let latestNews, latestDemos;

describe('hltv-api', () => {

  describe('get upcoming matches', () => {

    beforeEach((done) => {
      latestNews = hltvApi.getLatestNews;
      latestDemos = hltvApi.getLatestDemos;
      done();
    });

    it('callback length should be a number', (done) => {
      latestNews.get((data) => {
        assert.isNumber(data.callbackLength);
        done();
      });
    });

    it('callback news should be an array', (done) => {
      latestNews.get((data) => {
        assert.isArray(data.news);
        done();
      });
    });

    it('should have description and map when we call getLatestDemos', (done) => {
      latestDemos.get((data) => {
        assert(data.demo[0].description !== null);
        done();
      });
    });

  });

});
