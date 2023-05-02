import Parser from 'rss-parser';
import { PostModel } from '@/modules/post/post.model';
import { logger } from '@/config/logger';

const parser = new Parser();

const parseRssFeed = async () => {
  try {
    const feed = await parser.parseURL(process.env.RSS_RESOURCE_URL);

    feed.items.forEach(async (post) => {
      const existedPost = await PostModel.findOne({ resourceId: post.guid });

      if (existedPost) return;

      await PostModel.create({
        resourceId: post.guid,
        title: post.title,
        creator: post.creator,
        body: post.content,
        date: post.pubDate,
      });

      console.log(`New post added: ${post.title}`);
    });
  } catch (err) {
    logger.error(err);
  }
};

export default parseRssFeed;
