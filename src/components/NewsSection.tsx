import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { NewsItem, FilterState, NewsSource } from '../types';
import NewsFilter from './NewsFilter';
import NewsList from './NewsList';

interface NewsSectionProps {
  title: string;
  icon: 'verified' | 'trending';
  description: string;
  items: NewsItem[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableTopics: string[];
  availableSources: NewsSource[];
  onNewsItemClick?: (item: NewsItem) => void;
  onTopicClick?: (topic: string) => void;
  className?: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({
  title,
  icon,
  description,
  items,
  filters,
  onFilterChange,
  availableTopics,
  availableSources,
  onNewsItemClick,
  onTopicClick,
  className = ''
}) => {
  const IconComponent = icon === 'verified' ? CheckCircle2 : AlertTriangle;
  const iconColor = icon === 'verified' ? 'text-blue-600' : 'text-amber-500';
  
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren"
      }
    }
  };
  
  return (
    <motion.section 
      className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 ${className}`}
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`p-6 border-b border-gray-200 ${icon === 'verified' ? 'bg-blue-50' : 'bg-amber-50'}`}>
        <div className="flex items-center mb-2">
          <IconComponent className={`mr-2 ${iconColor}`} size={24} />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="p-6">
        <NewsFilter 
          filters={filters}
          onFilterChange={onFilterChange}
          availableTopics={availableTopics}
          availableSources={availableSources}
          className="mb-6"
        />
        
        <NewsList 
          items={items}
          onItemClick={onNewsItemClick}
          onTopicClick={onTopicClick}
        />
      </div>
    </motion.section>
  );
};

export default NewsSection;