var expect = require('chai').expect;
var assert = require('chai').assert;
var hltvApi = require('./index');

var latestNews, latestDemos;

describe('hltv-api', function() {

  describe('get upcoming matches', function() {

    beforeEach(function(done) {
      latestNews = hltvApi.getLatestNews;
      latestDemos = hltvApi.getLatestDemos;
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

    it('should have description and map when we call getLatestDemos', function(done) {
      latestDemos.getData(function(data) {
        assert(data.demo[0].description !== null);
        done();
      });
    });

  });

});
