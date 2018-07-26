'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMatches = exports.getResults = exports.getNews = exports.getUpcoming = undefined;

var _results = require('./results');
var _results2 = _interopRequireDefault(_results);

var _rss = require('./rss');
var _rss2 = _interopRequireDefault(_rss);

var _matches = require('./matches');
var _matches2 = _interopRequireDefault(_matches);

var _upcoming = require('./upcoming');
var _upcoming2 = _interopRequireDefault(_upcoming);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getNews = exports.getNews = function getNews(cb) {
  return new _rss2.default('news', cb);
};
var getResults = exports.getResults = function getResults(cb) {
  return new _results2.default(cb);
};
var getMatches = exports.getMatches = function getMatches(id, cb) {
  return new _matches2.default(id, cb);
};
var getUpcoming = exports.getUpcoming = function getUpcoming(id, cb) {
  return new _upcoming2.default(id, cb);
};