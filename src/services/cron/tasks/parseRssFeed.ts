import Parser from 'rss-parser';

const parser = new Parser();

const parseRssFeed = async () => {
  try {
    const feed = await parser.parseURL('https://lifehacker.com/rss');

    feed.items.forEach((item) => {
      console.log(item.guid);
    });
  } catch (error) {
    console.log(error);
  }
};

export default parseRssFeed;
