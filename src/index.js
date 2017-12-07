import Results from './results';
import RSS from './rss';
import MatchOverview from './match-overview';

export const getNews = (cb) => new RSS('news', cb);
export const getResults = (cb) => new Results(cb);
export const getMatchOverview = (id, cb) => new MatchOverview(id, cb);
