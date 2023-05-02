import cron from 'node-cron';
import parseRssFeed from '@/services/cron/tasks/parseRssFeed';

// task is running every 30 minutes
const feedParserJob = cron.schedule('*/30 * * * *', parseRssFeed);

export default feedParserJob;
