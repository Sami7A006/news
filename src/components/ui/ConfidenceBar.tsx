import React from 'react';
import { getConfidenceColor } from '../../utils/helpers';

interface ConfidenceBarProps {
  score: number;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ConfidenceBar: React.FC<ConfidenceBarProps> = ({
  score,
  showPercentage = true,
  size = 'md',
  className = ''
}) => {
  const barColor = getConfidenceColor(score);
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };
  
  return (
    <div className={`w-full ${className}`}>
      {showPercentage && (
        <div className="flex justify-between text-xs text-gray-700 mb-1">
          <span>Confidence:</span>
          <span className="font-medium">{score}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div 
          className={`${barColor} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export default ConfidenceBar;