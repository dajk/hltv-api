var expect = require('chai').expect;
var assert = require('chai').assert;
var hltvApi = require('./index');

var upcomingMatches;

describe('hltv-api', function() {
  describe('get upcoming matches', function() {

    beforeEach(function(done) {
      upcomingMatches = hltvApi.getUpcomingMatches;
      done();
    });

    it('callback length should length be a number', function(done) {
      upcomingMatches.getData(function(data) {
        assert.isNumber(data.callbackLength);
        done();
      });
    });

    it('callback hltv should be an array', function(done) {
      upcomingMatches.getData(function(data) {
        assert.isArray(data.hltv);
        done();
      });
    });

  });

});