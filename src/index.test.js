var assert = require('chai').assert;
var hltvApi = require('./index');

var latestNews;

describe('hltv-api', function() {

  describe('get upcoming matches', function() {

    beforeEach(function(done) {
      latestNews = hltvApi.getLatestNews;
      done();
    });

    it('callback length should be a number', function(done) {
      latestNews.getData(function(data) {
        assert.isNumber(data.callbackLength);
        done();
      });
    });

    it('callback news should be an array', function(done) {
      latestNews.getData(function(data) {
        assert.isArray(data.news);
        done();
      });
    });

  });

});
