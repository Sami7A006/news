import React from 'react';
import { motion } from 'framer-motion';
import { NewsItem, NewsSource } from '../types';
import NewsCard from './NewsCard';
import { getNewsSource } from '../data/mockData';

interface NewsListProps {
  items: NewsItem[];
  onItemClick?: (item: NewsItem) => void;
  onTopicClick?: (topic: string) => void;
  className?: string;
}

const NewsList: React.FC<NewsListProps> = ({
  items,
  onItemClick,
  onTopicClick,
  className = ''
}) => {
  // Animation variants for list container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <motion.div 
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-lg">No news items found matching your filters.</p>
        </div>
      ) : (
        items.map(item => {
          const source = getNewsSource(item);
          return (
            <NewsCard 
              key={item.id}
              item={item}
              source={source}
              onClick={onItemClick}
              onTopicClick={onTopicClick}
            />
          );
        })
      )}
    </motion.div>
  );
};

export default NewsList;