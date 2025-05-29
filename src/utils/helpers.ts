import { NewsItem, VerificationStatus, FilterState } from '../types';
import { formatDistanceToNow } from 'date-fns';

// Format published date to relative time (e.g., "3 hours ago")
export const formatPublishedTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    return 'Unknown time';
  }
};

// Get color for verification status
export const getStatusColor = (status: VerificationStatus): string => {
  switch (status) {
    case 'verified':
      return 'bg-blue-700 text-white';
    case 'myth':
      return 'bg-red-600 text-white';
    case 'unverified':
      return 'bg-amber-600 text-white';
    case 'investigating':
      return 'bg-purple-700 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

// Get color for confidence score
export const getConfidenceColor = (score: number): string => {
  if (score >= 90) return 'bg-green-500';
  if (score >= 70) return 'bg-green-400';
  if (score >= 50) return 'bg-yellow-500';
  if (score >= 30) return 'bg-orange-500';
  return 'bg-red-500';
};

// Get label for verification status
export const getStatusLabel = (status: VerificationStatus): string => {
  switch (status) {
    case 'verified':
      return 'Verified';
    case 'myth':
      return 'Myth';
    case 'unverified':
      return 'Unverified';
    case 'investigating':
      return 'Investigating';
    default:
      return 'Unknown';
  }
};

// Filter news items based on filter state
export const filterNews = (news: NewsItem[], filters: FilterState): NewsItem[] => {
  return news.filter(item => {
    // Filter by topics
    if (filters.topics.length > 0 && !item.topics.some(topic => filters.topics.includes(topic))) {
      return false;
    }
    
    // Filter by sources
    if (filters.sources.length > 0 && !filters.sources.includes(item.sourceId)) {
      return false;
    }
    
    // Filter by status
    if (filters.status.length > 0 && !filters.status.includes(item.status)) {
      return false;
    }
    
    // Filter by search term
    if (filters.search && filters.search.trim() !== '') {
      const searchTerm = filters.search.toLowerCase();
      return (
        item.headline.toLowerCase().includes(searchTerm) ||
        item.summary.toLowerCase().includes(searchTerm) ||
        (item.content && item.content.toLowerCase().includes(searchTerm))
      );
    }
    
    return true;
  });
};

// Sort news items based on sort option
export const sortNews = (news: NewsItem[], sortOption: string): NewsItem[] => {
  switch (sortOption) {
    case 'latest':
      return [...news].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    case 'trending':
      return [...news].sort((a, b) => {
        const aEngagement = a.engagement ? a.engagement.shares + a.engagement.comments + a.engagement.reactions : 0;
        const bEngagement = b.engagement ? b.engagement.shares + b.engagement.comments + b.engagement.reactions : 0;
        return bEngagement - aEngagement;
      });
    case 'confidence':
      return [...news].sort((a, b) => b.confidenceScore - a.confidenceScore);
    default:
      return news;
  }
};

// Calculate total engagement for a news item
export const getTotalEngagement = (item: NewsItem): number => {
  if (!item.engagement) return 0;
  return item.engagement.shares + item.engagement.comments + item.engagement.reactions;
};