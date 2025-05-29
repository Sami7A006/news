import React from 'react';
import { Filter, Search, ChevronDown, X } from 'lucide-react';
import { FilterState, NewsSource, VerificationStatus } from '../types';
import Badge from './ui/Badge';
import TopicTag from './ui/TopicTag';
import SourceBadge from './ui/SourceBadge';

interface NewsFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableTopics: string[];
  availableSources: NewsSource[];
  className?: string;
}

const NewsFilter: React.FC<NewsFilterProps> = ({
  filters,
  onFilterChange,
  availableTopics,
  availableSources,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showTopics, setShowTopics] = React.useState(false);
  const [showSources, setShowSources] = React.useState(false);
  const [showStatus, setShowStatus] = React.useState(false);

  const toggleFilter = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, sort: e.target.value as any });
  };

  const toggleTopic = (topic: string) => {
    const newTopics = filters.topics.includes(topic)
      ? filters.topics.filter(t => t !== topic)
      : [...filters.topics, topic];
    onFilterChange({ ...filters, topics: newTopics });
  };

  const toggleSource = (sourceId: string) => {
    const newSources = filters.sources.includes(sourceId)
      ? filters.sources.filter(s => s !== sourceId)
      : [...filters.sources, sourceId];
    onFilterChange({ ...filters, sources: newSources });
  };

  const toggleStatus = (status: VerificationStatus) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    onFilterChange({ ...filters, status: newStatus });
  };

  const clearFilters = () => {
    onFilterChange({
      ...filters,
      topics: [],
      sources: [],
      status: [],
      search: ''
    });
  };

  const hasActiveFilters = filters.topics.length > 0 || filters.sources.length > 0 || filters.status.length > 0 || filters.search;

  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden ${className}`}>
      {/* Search and Sort bar - always visible */}
      <div className="p-4 flex flex-col md:flex-row md:items-center gap-3 border-b border-gray-100">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search news headlines..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ ...filters, search: '' })}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">Sort by:</label>
            <select
              id="sort"
              value={filters.sort}
              onChange={handleSortChange}
              className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="latest">Latest</option>
              <option value="trending">Trending</option>
              <option value="confidence">Confidence</option>
            </select>
          </div>

          <button
            onClick={toggleFilter}
            className={`flex items-center py-2 px-3 border ${isExpanded ? 'border-blue-500 text-blue-600' : 'border-gray-300 text-gray-700'} rounded-lg hover:bg-gray-50`}
          >
            <Filter size={18} className="mr-1" />
            <span>Filter</span>
            <ChevronDown size={16} className={`ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Expanded filter section */}
      {isExpanded && (
        <div className="p-4 border-b border-gray-100 space-y-4">
          {/* Filter categories */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowTopics(!showTopics)}
              className={`flex items-center py-1.5 px-3 rounded-lg border ${showTopics ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-700'}`}
            >
              Topics
              <ChevronDown size={14} className={`ml-1 transition-transform ${showTopics ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => setShowSources(!showSources)}
              className={`flex items-center py-1.5 px-3 rounded-lg border ${showSources ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-700'}`}
            >
              Sources
              <ChevronDown size={14} className={`ml-1 transition-transform ${showSources ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => setShowStatus(!showStatus)}
              className={`flex items-center py-1.5 px-3 rounded-lg border ${showStatus ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-700'}`}
            >
              Verification Status
              <ChevronDown size={14} className={`ml-1 transition-transform ${showStatus ? 'rotate-180' : ''}`} />
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center py-1.5 px-3 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
              >
                Clear All
                <X size={14} className="ml-1" />
              </button>
            )}
          </div>

          {/* Topics filter */}
          {showTopics && (
            <div className="pt-2 border-t border-gray-100">
              <h3 className="font-medium text-gray-700 mb-2">Select Topics:</h3>
              <div className="flex flex-wrap gap-2">
                {availableTopics.map(topic => (
                  <TopicTag
                    key={topic}
                    topic={topic}
                    isActive={filters.topics.includes(topic)}
                    onClick={() => toggleTopic(topic)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sources filter */}
          {showSources && (
            <div className="pt-2 border-t border-gray-100">
              <h3 className="font-medium text-gray-700 mb-2">Select Sources:</h3>
              <div className="flex flex-wrap gap-2">
                {availableSources.map(source => (
                  <SourceBadge
                    key={source.id}
                    source={source}
                    isActive={filters.sources.includes(source.id)}
                    onClick={() => toggleSource(source.id)}
                    showReliability
                    size="sm"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Status filter */}
          {showStatus && (
            <div className="pt-2 border-t border-gray-100">
              <h3 className="font-medium text-gray-700 mb-2">Verification Status:</h3>
              <div className="flex flex-wrap gap-2">
                {(['verified', 'myth', 'unverified', 'investigating'] as VerificationStatus[]).map(status => (
                  <div
                    key={status}
                    onClick={() => toggleStatus(status)}
                    className={`cursor-pointer p-1 rounded-lg ${filters.status.includes(status) ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <Badge status={status} showScore={false} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="p-3 bg-gray-50 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-medium text-gray-500">Active filters:</span>
          
          {filters.topics.map(topic => (
            <span 
              key={topic}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center"
            >
              {topic}
              <X 
                size={12} 
                className="ml-1 cursor-pointer" 
                onClick={() => toggleTopic(topic)}
              />
            </span>
          ))}
          
          {filters.sources.map(sourceId => {
            const source = availableSources.find(s => s.id === sourceId);
            return source ? (
              <span 
                key={sourceId}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center"
              >
                {source.name}
                <X 
                  size={12} 
                  className="ml-1 cursor-pointer" 
                  onClick={() => toggleSource(sourceId)}
                />
              </span>
            ) : null;
          })}
          
          {filters.status.map(status => (
            <span 
              key={status}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center"
            >
              {status}
              <X 
                size={12} 
                className="ml-1 cursor-pointer" 
                onClick={() => toggleStatus(status)}
              />
            </span>
          ))}
          
          {filters.search && (
            <span 
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center"
            >
              Search: {filters.search}
              <X 
                size={12} 
                className="ml-1 cursor-pointer" 
                onClick={() => onFilterChange({ ...filters, search: '' })}
              />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsFilter;