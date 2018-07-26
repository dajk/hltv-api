'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Scraping results
 * 
 * @export
 * @class Results
 */
var Results =

/**
 * Creates an instance of Results.
 * 
 * @param {any} callback 
 * 
 * @memberOf Results
 */
function Results(callback) {
  _classCallCheck(this, Results);

  var uri = '' + _config.CONFIG.BASE + _config.CONFIG.RESULTS;

  (0, _request2.default)({ uri: uri }, function (error, response, body) {
    var $ = _cheerio2.default.load(body, {
      normalizeWhitespace: true
    });

    var resultSublists = $('.results-all .results-sublist'),
        matchDate,
        resultElements,
        results = [];

    $(resultSublists).each(function (s, list) {
      resultElements = $(list).find('.result-con');
      matchDate = $(list).find('.standard-headline').text();
      matchDate = matchDate.replace('Results for ', '');

      $(resultElements).each(function (i, element) {
        var el = $(element).find('tr');
        var team1 = el.children('.team-cell').first();
        var team2 = el.children('.team-cell').last();
        var matchId = $(element).children('a').attr('href');
        var maps = el.find('.map-text');
        var result1 = el.find('.result-score').children('span').first();
        var result2 = el.find('.result-score').children('span').last();

        var objData = {
          event: el.find('.event-name').text(),
          maps: maps.text(),
          team1: {
            name: team1.find('.team').text(),
            crest: team1.find('img').attr('src'),
            result: parseInt(result1.text())
          },
          team2: {
            name: team2.find('.team').text(),
            crest: team2.find('img').attr('src'),
            result: parseInt(result2.text())
          },
          matchId: matchId,
          date: matchDate
        };

        results.push(objData);
      });
    });

    callback(results, error);
  });
};

exports.default = Results;