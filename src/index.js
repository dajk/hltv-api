import Scraper from './scraper';
import RSS from './rss';

export const getLatestNews = (cb) => new RSS('news', cb);
export const getLatestBlogs = (cb) => new RSS('blog', cb);
export const getLatestDemos = (cb) => new RSS('demo', cb);
export const getLatestResults = (cb) => new Scraper('result', cb);
