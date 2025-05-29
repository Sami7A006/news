export type VerificationStatus = 'verified' | 'myth' | 'unverified' | 'investigating';

export interface NewsSource {
  id: string;
  name: string;
  logo: string;
  url: string;
  reliability: number; // 0-100
  type: 'factCheck' | 'news' | 'social';
}

export interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  content?: string;
  sourceId: string;
  sourceUrl: string;
  publishedAt: string;
  imageUrl?: string;
  topics: string[];
  status: VerificationStatus;
  confidenceScore: number; // 0-100
  verifiedBy?: string[];
  trending?: boolean;
  engagement?: {
    shares: number;
    comments: number;
    reactions: number;
  };
}

export interface FactCheckResult {
  status: VerificationStatus;
  confidenceScore: number;
  explanation: string;
  sources: string[];
  verifiedAt: string;
}

export type TopicFilter = string[];
export type SourceFilter = string[];
export type StatusFilter = VerificationStatus[];
export type SortOption = 'latest' | 'trending' | 'confidence';

export interface FilterState {
  topics: TopicFilter;
  sources: SourceFilter;
  status: StatusFilter;
  sort: SortOption;
  search: string;
}