import Results from './results';
import RSS from './rss';

export const getNews = (cb) => new RSS('news', cb);
export const getResults = (cb) => new Results(cb);
