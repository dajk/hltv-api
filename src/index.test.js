/* global describe, it */
import { assert, expect } from 'chai';
import { getNews, getResults } from './index';
import { CONFIG } from './config';

describe('hltv-api', () => {

  describe('get appropriate responses', () => {

    it('callback length should be a number', (done) => {
      getNews((response) => {
        assert.isNumber(response.length);
        expect(response.length).is.equal(10);
        done();
      });
    });

    it('callback news should be an array', (done) => {
      getNews((response) => {
        assert.isArray(response);
        done();
      });
    });

    it('should have all details when we call `getNews`', (done) => {
      getNews((response) => {
        const news = response[0];
        expect(news.title).to.have.length.above(3);
        expect(news.description).to.have.length.above(3);
        expect(news.link).to.contain(CONFIG.BASE);
        expect(news.date).to.have.length.above(10);
        done();
      });
    });

    it('should have all details when we call `getResults`', (done) => {
      getResults((response) => {
        expect(response.length).to.have.length;
        const result = response[0];

        expect(result.team1.name).to.have.length;
        expect(result.team1.crest).to.contain(CONFIG.STATIC);

        expect(result.team2.name).to.have.length;
        expect(result.team2.crest).to.contain(CONFIG.STATIC);

        expect(result.matchId).to.have.length.above(10);
        done();
      });

    });

  });

});
