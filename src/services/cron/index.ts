import cron from 'node-cron';
import parseRssFeed from '@/services/cron/tasks/parseRssFeed';

const feedParserJob = cron.schedule('* * * * *', parseRssFeed);

export default feedParserJob;
