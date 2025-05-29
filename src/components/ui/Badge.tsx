import React from 'react';
import { VerificationStatus } from '../../types';
import { getStatusColor, getStatusLabel } from '../../utils/helpers';

interface BadgeProps {
  status: VerificationStatus;
  confidenceScore?: number;
  showScore?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  status,
  confidenceScore,
  showScore = true,
  size = 'md',
  className = ''
}) => {
  const baseClasses = getStatusColor(status);
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };
  
  return (
    <span 
      className={`inline-flex items-center font-medium rounded-full ${baseClasses} ${sizeClasses[size]} ${className}`}
    >
      {getStatusLabel(status)}
      {showScore && confidenceScore !== undefined && (
        <span className="ml-1 opacity-80">
          {confidenceScore}%
        </span>
      )}
    </span>
  );
};

export default Badge;