import cron from 'node-cron';

const feedParserJob = cron.schedule('* * * * *', () => {
  console.log('run');
});

export default feedParserJob;
