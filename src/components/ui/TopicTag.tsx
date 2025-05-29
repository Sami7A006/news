import React from 'react';

interface TopicTagProps {
  topic: string;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

const TopicTag: React.FC<TopicTagProps> = ({
  topic,
  onClick,
  isActive = false,
  className = ''
}) => {
  const baseClasses = "inline-block px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200";
  const activeClasses = isActive
    ? "bg-blue-100 text-blue-800 border border-blue-300"
    : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200";
  
  return (
    <span 
      className={`${baseClasses} ${activeClasses} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {topic}
    </span>
  );
};

export default TopicTag;