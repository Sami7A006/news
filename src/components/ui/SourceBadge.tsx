import React from 'react';
import { NewsSource } from '../../types';

interface SourceBadgeProps {
  source: NewsSource;
  onClick?: () => void;
  isActive?: boolean;
  showReliability?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SourceBadge: React.FC<SourceBadgeProps> = ({
  source,
  onClick,
  isActive = false,
  showReliability = false,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-5 w-5 text-xs',
    md: 'h-6 w-6 text-sm',
    lg: 'h-8 w-8 text-base'
  };
  
  const activeClasses = isActive
    ? "ring-2 ring-blue-500 bg-blue-50"
    : "ring-1 ring-gray-300 hover:ring-gray-400";
    
  return (
    <div 
      className={`flex items-center gap-2 p-1 rounded-full ${activeClasses} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <img 
        src={source.logo} 
        alt={source.name}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
      <span className="pr-2 font-medium text-gray-800">{source.name}</span>
      {showReliability && (
        <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">
          {source.reliability}%
        </span>
      )}
    </div>
  );
};

export default SourceBadge;