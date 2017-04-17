import { assert, expect } from 'chai';
import {
  getLatestNews,
  getLatestDemos,
  getLatestBlogs,
  getLatestResults
} from './index';

describe('hltv-api', () => {

  describe('get appropriate data', () => {

    it('callback length should be a number', (done) => {
      getLatestNews((data) => {
        assert.isNumber(data.callbackLength);
        expect(data.callbackLength).is.equal(10);
        done();
      });
    });

    it('callback news should be an array', (done) => {
      getLatestNews((data) => {
        assert.isArray(data.news);
        done();
      });
    });

    it('should have all details when we call `getLatestDemos`', (done) => {
      getLatestDemos((data) => {
        const demo = data.demo[0];
        expect(demo.title).to.have.length.above(3);
        expect(demo.link).to.contain('http://www.hltv.org');
        expect(demo.date).to.have.length.above(10);
        expect(demo.description).to.have.length.above(3);
        expect(demo.map).to.have.length.above(3);
        done();
      });
    });

    it('should have all details when we call `getLatestBlogs`', (done) => {
      getLatestBlogs((data) => {
        const blog = data.blog[0];
        expect(blog.title).to.have.length.above(3);
        expect(blog.link).to.contain('http://www.hltv.org');
        expect(blog.date).to.have.length.above(10);
        done();
      });
    });

    it('should have all details when we call `getLatestResults`', (done) => {
      getLatestResults((data) => {
        expect(data.callbackLength).is.equal(50);
        const result = data.result[0];
        expect(result.matchMap).to.have.length.above(3);
        expect(result.homeTeam).to.have.length.above(0);
        expect(result.homeTeamCrest).to.contain('http://static.hltv.org');
        assert.isNumber(result.homeTeamScore);
        assert.isNumber(result.awayTeamScore);
        expect(result.awayTeamCrest).to.contain('http://static.hltv.org');
        expect(result.awayTeam).to.have.length.above(0);
        expect(result.matchid).to.have.length.above(10);
        done();
      });
    })

  });

});
