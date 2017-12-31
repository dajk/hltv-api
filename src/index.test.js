import { describe, it } from 'mocha';
import { assert, expect } from 'chai';
import { getNews, getResults, getMatches } from './index';
import { CONFIG } from './config';

let matchId;

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
        expect(news.date).to.have.length.above(10).and.contain('GMT');
        done();
      });
    });

    it('should have all details when we call `getResults`', (done) => {
      getResults((response) => {
        expect(response.length).to.exist;
        const result = response[0];
        expect(result.team1.name).to.exist;
        expect(result.team1.crest).to.contain(CONFIG.STATIC);
        expect(result.team2.name).to.exist;
        expect(result.team2.crest).to.contain(CONFIG.STATIC);
        expect(result.matchId).to.contain('/matches/');
        matchId = result.matchId; // Assign to variable for next test
        done();
      });
    });

    it('should have match stats when we call `getMatches`', (done) => {
      getMatches(matchId, (response) => {
        expect(response.length).to.be.approximately(10, 5);
        const p = response[0];
        expect(p.playerName).to.exist;
        expect(p.playerId).to.contain('/player/');
        expect(p.kills).to.approximately(0, 100);
        expect(p.deaths).to.approximately(0, 100);
        expect(p.plusMinus).to.approximately(0, 50);
        expect(p.adr).to.approximately(0, 300);
        expect(p.kast).to.approximately(0, 100);
        expect(p.rating).to.approximately(0, 5);
        done();
      });
    });

  });

});
