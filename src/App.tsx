import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FilterState, NewsItem } from './types';
import { availableTopics, mockSources } from './data/mockData';
import { filterNews, sortNews } from './utils/helpers';
import { fetchLatestNews } from './services/newsApi';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import NewsSection from './components/NewsSection';

function App() {
  const [verifiedNews, setVerifiedNews] = useState<NewsItem[]>([]);
  const [trendingNews, setTrendingNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states for each section
  const [verifiedFilters, setVerifiedFilters] = useState<FilterState>({
    topics: [],
    sources: [],
    status: ['verified'],
    sort: 'latest',
    search: ''
  });
  
  const [trendingFilters, setTrendingFilters] = useState<FilterState>({
    topics: [],
    sources: [],
    status: ['myth', 'unverified', 'investigating'],
    sort: 'trending',
    search: ''
  });

  // Fetch news periodically
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await fetchLatestNews();
        const verified = news.filter(item => item.status === 'verified');
        const unverified = news.filter(item => item.status !== 'verified');
        
        setVerifiedNews(verified);
        setTrendingNews(unverified);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    // Initial fetch
    fetchNews();

    // Set up periodic fetching every 2 minutes
    const interval = setInterval(fetchNews, 120000);

    return () => clearInterval(interval);
  }, []);
  
  // Filtered news items
  const filteredVerifiedNews = React.useMemo(() => {
    let filtered = filterNews(verifiedNews, verifiedFilters);
    return sortNews(filtered, verifiedFilters.sort);
  }, [verifiedNews, verifiedFilters]);
  
  const filteredTrendingNews = React.useMemo(() => {
    let filtered = filterNews(trendingNews, trendingFilters);
    return sortNews(filtered, trendingFilters.sort);
  }, [trendingNews, trendingFilters]);
  
  // Handle topic clicks to update filters
  const handleTopicClick = (section: 'verified' | 'trending', topic: string) => {
    if (section === 'verified') {
      setVerifiedFilters(prev => ({
        ...prev,
        topics: prev.topics.includes(topic) 
          ? prev.topics.filter(t => t !== topic) 
          : [...prev.topics, topic]
      }));
    } else {
      setTrendingFilters(prev => ({
        ...prev,
        topics: prev.topics.includes(topic) 
          ? prev.topics.filter(t => t !== topic) 
          : [...prev.topics, topic]
      }));
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-24">
        <div className="space-y-16">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading latest news...</p>
            </div>
          ) : (
            <>
              {/* Verified News Section */}
              <section id="verified">
                <NewsSection 
                  title="Verified News"
                  icon="verified"
                  description="News that has been fact-checked and verified by trusted sources."
                  items={filteredVerifiedNews}
                  filters={verifiedFilters}
                  onFilterChange={setVerifiedFilters}
                  availableTopics={availableTopics}
                  availableSources={mockSources}
                  onTopicClick={(topic) => handleTopicClick('verified', topic)}
                />
              </section>
              
              {/* Trending & Unverified News Section */}
              <section id="trending">
                <NewsSection 
                  title="Trending & Unverified News"
                  icon="trending"
                  description="Viral content that is being investigated or has been flagged as potentially misleading."
                  items={filteredTrendingNews}
                  filters={trendingFilters}
                  onFilterChange={setTrendingFilters}
                  availableTopics={availableTopics}
                  availableSources={mockSources}
                  onTopicClick={(topic) => handleTopicClick('trending', topic)}
                />
              </section>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;