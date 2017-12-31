import Results from './results';
import RSS from './rss';
import Matches from './matches';

export const getNews = (cb) => new RSS('news', cb);
export const getResults = (cb) => new Results(cb);
export const getMatches = (id, cb) => new Matches(id, cb);
