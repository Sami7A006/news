import { NewsItem, NewsSource } from '../types';
import { format, subHours, subDays } from 'date-fns';

// Available topics for news categorization
export const availableTopics = [
  'Politics',
  'Health',
  'Economy',
  'Technology',
  'Environment',
  'Education',
  'Entertainment',
  'Sports',
  'International',
  'COVID-19'
];

// Mock news sources
export const mockSources: NewsSource[] = [
  {
    id: 'pib-fact-check',
    name: 'PIB Fact Check',
    logo: 'https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg?auto=compress&cs=tinysrgb&w=100',
    url: 'https://factcheck.pib.gov.in/',
    reliability: 95,
    type: 'factCheck'
  },
  {
    id: 'alt-news',
    name: 'AltNews',
    logo: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=100',
    url: 'https://www.altnews.in/',
    reliability: 92,
    type: 'factCheck'
  },
  {
    id: 'boom-live',
    name: 'BOOM Live',
    logo: 'https://images.pexels.com/photos/5082593/pexels-photo-5082593.jpeg?auto=compress&cs=tinysrgb&w=100',
    url: 'https://www.boomlive.in/',
    reliability: 90,
    type: 'factCheck'
  },
  {
    id: 'factly',
    name: 'Factly',
    logo: 'https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=100',
    url: 'https://factly.in/',
    reliability: 88,
    type: 'factCheck'
  },
  {
    id: 'india-today',
    name: 'India Today Fact Check',
    logo: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=100',
    url: 'https://www.indiatoday.in/fact-check',
    reliability: 85,
    type: 'factCheck'
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    logo: 'https://images.pexels.com/photos/6053/twitter-facebook-social-communication.jpg?auto=compress&cs=tinysrgb&w=100',
    url: 'https://twitter.com/',
    reliability: 60,
    type: 'social'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    logo: 'https://images.pexels.com/photos/35177/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=100',
    url: 'https://www.youtube.com/',
    reliability: 65,
    type: 'social'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    logo: 'https://images.pexels.com/photos/4562477/pexels-photo-4562477.jpeg?auto=compress&cs=tinysrgb&w=100',
    url: 'https://www.whatsapp.com/',
    reliability: 40,
    type: 'social'
  },
  {
    id: 'reddit',
    name: 'Reddit',
    logo: 'https://images.pexels.com/photos/6068056/pexels-photo-6068056.jpeg?auto=compress&cs=tinysrgb&w=100',
    url: 'https://www.reddit.com/',
    reliability: 55,
    type: 'social'
  }
];

// Helper function to get a source by ID
const getSource = (id: string): NewsSource => {
  return mockSources.find(source => source.id === id) || mockSources[0];
};

// Mock verified news items
export const verifiedNews: NewsItem[] = [
  {
    id: 'v1',
    headline: 'Government Approves New Education Policy with Focus on Vocational Training',
    summary: 'The Union Cabinet has approved the new National Education Policy with emphasis on vocational training and multilingual education.',
    sourceId: 'pib-fact-check',
    sourceUrl: 'https://factcheck.pib.gov.in/post/education-policy-approved',
    publishedAt: format(subHours(new Date(), 3), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    imageUrl: 'https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&w=600',
    topics: ['Education', 'Politics'],
    status: 'verified',
    confidenceScore: 98,
    verifiedBy: ['pib-fact-check', 'india-today']
  },
  {
    id: 'v2',
    headline: 'COVID-19 Vaccination Drive Reaches 80% Coverage in Urban Areas',
    summary: 'India\'s COVID-19 vaccination campaign has achieved 80% coverage in urban areas according to latest health ministry data.',
    sourceId: 'factly',
    sourceUrl: 'https://factly.in/covid-vaccination-coverage',
    publishedAt: format(subHours(new Date(), 8), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    imageUrl: 'https://images.pexels.com/photos/3952224/pexels-photo-3952224.jpeg?auto=compress&cs=tinysrgb&w=600',
    topics: ['Health', 'COVID-19'],
    status: 'verified',
    confidenceScore: 95,
    verifiedBy: ['factly', 'alt-news']
  },
  {
    id: 'v3',
    headline: 'GDP Growth Rate Projected at 6.8% for Current Fiscal Year',
    summary: 'The Reserve Bank of India has projected GDP growth rate at 6.8% for the current fiscal year based on improved economic indicators.',
    sourceId: 'boom-live',
    sourceUrl: 'https://www.boomlive.in/economy/gdp-growth-projections',
    publishedAt: format(subHours(new Date(), 12), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    imageUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600',
    topics: ['Economy', 'Politics'],
    status: 'verified',
    confidenceScore: 92,
    verifiedBy: ['boom-live']
  },
  {
    id: 'v4',
    headline: 'New Solar Power Plant Inaugurated in Rajasthan',
    summary: 'India\'s largest solar power plant with 2.5 GW capacity has been inaugurated in Rajasthan, aiming to boost renewable energy production.',
    sourceId: 'alt-news',
    sourceUrl: 'https://www.altnews.in/environment/solar-plant-rajasthan',
    publishedAt: format(subDays(new Date(), 1), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    imageUrl: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=600',
    topics: ['Environment', 'Technology'],
    status: 'verified',
    confidenceScore: 97,
    verifiedBy: ['alt-news', 'factly']
  },
  {
    id: 'v5',
    headline: 'Supreme Court Issues Guidelines on Air Pollution Control',
    summary: 'The Supreme Court has issued new guidelines for controlling air pollution in major metropolitan cities, focusing on vehicle emissions and industrial waste.',
    sourceId: 'india-today',
    sourceUrl: 'https://www.indiatoday.in/fact-check/supreme-court-pollution',
    publishedAt: format(subDays(new Date(), 2), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    imageUrl: 'https://images.pexels.com/photos/459728/pexels-photo-459728.jpeg?auto=compress&cs=tinysrgb&w=600',
    topics: ['Environment', 'Politics'],
    status: 'verified',
    confidenceScore: 94,
    verifiedBy: ['india-today', 'boom-live']
  }
];

// Mock trending and unverified news items
export const trendingNews: NewsItem[] = [
  {
    id: 't1',
    headline: 'Viral Video Shows UFO Sighting Near Delhi Airport',
    summary: 'A video claiming to show a UFO near Delhi International Airport has gone viral on social media platforms.',
    sourceId: 'twitter',
    sourceUrl: 'https://twitter.com/trending/ufo-delhi',
    publishedAt: format(subHours(new Date(), 5), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    imageUrl: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=600',
    topics: ['Technology'],
    status: 'myth',
    confidenceScore: 15,
    trending: true,
    engagement: {
      shares: 15200,
      comments: 8300,
      reactions: 22400
    }
  },
  {
    id: 't2',
    headline: 'New Ayurvedic Remedy Claims to Cure Diabetes in 30 Days',
    summary: 'Social media posts promoting an ayurvedic remedy claim it can completely cure diabetes within 30 days of treatment.',
    sourceId: 'whatsapp',
    sourceUrl: 'https://factcheck-pending.com/ayurvedic-diabetes',
    publishedAt: format(subHours(new Date(), 10), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    imageUrl: 'https://images.pexels.com/photos/4207108/pexels-photo-4207108.jpeg?auto=compress&cs=tinysrgb&w=600',
    topics: ['Health'],
    status: 'investigating',
    confidenceScore: 40,
    trending: true,
    engagement: {
      shares: 8900,
      comments: 3200,
      reactions: 12000
    }
  },
  {
    id: 't3',
    headline: 'Government Planning to Replace Physical Currency with Digital Rupee',
    summary: 'Rumors suggest the government is planning to completely phase out physical currency by 2023, replacing it with a digital rupee.',
    sourceId: 'reddit',
    sourceUrl: 'https://reddit.com/r/india/digital-currency',
    publishedAt: format(subHours(new Date(), 18), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    imageUrl: 'https://images.pexels.com/photos/5466821/pexels-photo-5466821.jpeg?auto=compress&cs=tinysrgb&w=600',
    topics: ['Economy', 'Technology'],
    status: 'unverified',
    confidenceScore: 50,
    trending: true,
    engagement: {
      shares: 5600,
      comments: 4800,
      reactions: 7200
    }
  },
  {
    id: 't4',
    headline: 'Famous Actor Announces Entry into Politics Before Elections',
    summary: 'Reports claim a renowned Bollywood actor will join a major political party ahead of upcoming state elections.',
    sourceId: 'youtube',
    sourceUrl: 'https://youtube.com/watch?v=actor-politics',
    publishedAt: format(subDays(new Date(), 1), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    imageUrl: 'https://images.pexels.com/photos/7900939/pexels-photo-7900939.jpeg?auto=compress&cs=tinysrgb&w=600',
    topics: ['Politics', 'Entertainment'],
    status: 'investigating',
    confidenceScore: 65,
    trending: true,
    engagement: {
      shares: 12500,
      comments: 9800,
      reactions: 18700
    }
  },
  {
    id: 't5',
    headline: 'New Study Claims Smartphone Radiation Linked to Brain Disorders',
    summary: 'A viral post claims a new study has found direct links between smartphone radiation and increased risk of brain disorders.',
    sourceId: 'whatsapp',
    sourceUrl: 'https://pending-verification.org/smartphone-radiation',
    publishedAt: format(subDays(new Date(), 2), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    imageUrl: 'https://images.pexels.com/photos/4473763/pexels-photo-4473763.jpeg?auto=compress&cs=tinysrgb&w=600',
    topics: ['Health', 'Technology'],
    status: 'myth',
    confidenceScore: 8,
    trending: false,
    engagement: {
      shares: 7800,
      comments: 3400,
      reactions: 9200
    }
  },
  {
    id: 't6',
    headline: 'Major Dam in Northern India at Risk of Collapse Due to Heavy Rainfall',
    summary: 'Social media posts warn that a major dam in northern India is at imminent risk of collapse following heavy monsoon rainfall.',
    sourceId: 'twitter',
    sourceUrl: 'https://twitter.com/trending/dam-collapse-warning',
    publishedAt: format(subHours(new Date(), 2), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    imageUrl: 'https://images.pexels.com/photos/6419157/pexels-photo-6419157.jpeg?auto=compress&cs=tinysrgb&w=600',
    topics: ['Environment'],
    status: 'unverified',
    confidenceScore: 60,
    trending: true,
    engagement: {
      shares: 18700,
      comments: 9300,
      reactions: 24500
    }
  }
];

// Combined news items for global searching
export const allNews: NewsItem[] = [...verifiedNews, ...trendingNews];

// Get source details for a news item
export const getNewsSource = (item: NewsItem): NewsSource => {
  return getSource(item.sourceId);
};