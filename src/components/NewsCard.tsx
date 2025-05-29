import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, TrendingUp, MessageSquare, Share2 } from 'lucide-react';
import { NewsItem, NewsSource } from '../types';
import Badge from './ui/Badge';
import ConfidenceBar from './ui/ConfidenceBar';
import TopicTag from './ui/TopicTag';
import { formatPublishedTime, getTotalEngagement } from '../utils/helpers';

interface NewsCardProps {
  item: NewsItem;
  source: NewsSource;
  onClick?: (item: NewsItem) => void;
  onTopicClick?: (topic: string) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  item,
  source,
  onClick,
  onTopicClick
}) => {
  const handleCardClick = () => {
    if (onClick) onClick(item);
  };

  const handleSourceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(item.sourceUrl, '_blank', 'noopener,noreferrer');
  };
  
  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { 
      y: -5, 
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <motion.article 
      className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:border-gray-200 transition-all"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={handleCardClick}
    >
      {/* Image section */}
      {item.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.headline}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge status={item.status} confidenceScore={item.confidenceScore} />
          </div>
          
          {item.trending && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center">
              <TrendingUp size={14} className="mr-1" />
              TRENDING
            </div>
          )}
        </div>
      )}
      
      {/* Content section */}
      <div className="p-4">
        <div className="flex items-center mb-3">
          <img 
            src={source.logo} 
            alt={source.name}
            className="h-6 w-6 rounded-full mr-2"
          />
          <span className="text-sm font-medium text-gray-700">{source.name}</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-sm text-gray-500">{formatPublishedTime(item.publishedAt)}</span>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{item.headline}</h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
        
        {/* Confidence bar */}
        <ConfidenceBar score={item.confidenceScore} className="mb-4" />
        
        {/* Topic tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.topics.map(topic => (
            <TopicTag 
              key={topic} 
              topic={topic} 
              onClick={(e) => {
                e.stopPropagation();
                if (onTopicClick) onTopicClick(topic);
              }}
            />
          ))}
        </div>
        
        {/* Footer with engagement metrics */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            {item.engagement && (
              <>
                <div className="flex items-center text-gray-500">
                  <Share2 size={16} className="mr-1" />
                  <span className="text-sm">{item.engagement.shares.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <MessageSquare size={16} className="mr-1" />
                  <span className="text-sm">{item.engagement.comments.toLocaleString()}</span>
                </div>
              </>
            )}
          </div>
          
          <button 
            onClick={handleSourceClick}
            className="text-blue-600 flex items-center text-sm font-medium hover:text-blue-800 transition-colors"
          >
            View source <ExternalLink size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default NewsCard;