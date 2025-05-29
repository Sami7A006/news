import axios from 'axios';
import Parser from 'rss-parser';
import NodeCache from 'node-cache';
import { NewsItem, NewsSource } from '../types';

const parser = new Parser();
const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

const NEWS_SOURCES = {
  'pib': 'https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3',
  'ani': 'https://aninews.in/feed/',
  'pti': 'http://www.ptinews.com/rss/rss.aspx?id=1',
  'hindu': 'https://www.thehindu.com/news/feeder/default.rss',
  'ie': 'https://indianexpress.com/feed/'
};

const FACT_CHECK_SOURCES = {
  'altnews': 'https://www.altnews.in/feed/',
  'boomlive': 'https://www.boomlive.in/rss-feed',
  'factly': 'https://factly.in/feed/',
  'vishvasnews': 'https://www.vishvasnews.com/feed/'
};

async function fetchRSSFeed(url: string): Promise<any[]> {
  const cacheKey = `rss_${url}`;
  const cached = cache.get(cacheKey);
  
  if (cached) {
    return cached as any[];
  }

  try {
    const feed = await parser.parseURL(url);
    const items = feed.items.map(item => ({
      title: item.title,
      description: item.contentSnippet,
      link: item.link,
      pubDate: item.pubDate,
      categories: item.categories || []
    }));

    cache.set(cacheKey, items);
    return items;
  } catch (error) {
    console.error(`Error fetching RSS feed from ${url}:`, error);
    return [];
  }
}

export async function fetchLatestNews(): Promise<NewsItem[]> {
  const newsPromises = Object.entries(NEWS_SOURCES).map(async ([sourceId, url]) => {
    const items = await fetchRSSFeed(url);
    return items.map(item => ({
      id: item.link,
      headline: item.title,
      summary: item.description,
      sourceId,
      sourceUrl: item.link,
      publishedAt: item.pubDate,
      topics: item.categories,
      status: 'unverified',
      confidenceScore: 0
    }));
  });

  const factCheckPromises = Object.entries(FACT_CHECK_SOURCES).map(async ([sourceId, url]) => {
    const items = await fetchRSSFeed(url);
    return items.map(item => ({
      id: item.link,
      headline: item.title,
      summary: item.description,
      sourceId,
      sourceUrl: item.link,
      publishedAt: item.pubDate,
      topics: item.categories,
      status: 'verified',
      confidenceScore: 95
    }));
  });

  const allPromises = [...newsPromises, ...factCheckPromises];
  const results = await Promise.all(allPromises);
  return results.flat();
}