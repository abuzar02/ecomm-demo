
import React from 'react';

interface RatingProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

const Rating: React.FC<RatingProps> = ({ value, size = 'md', showValue = true }) => {
  // Define star sizes
  const starSizes: Record<string, string> = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };
  
  // Define text sizes
  const textSizes: Record<string, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };
  
  const starSize = starSizes[size];
  const textSize = textSizes[size];
  
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`${starSize} ${index < Math.floor(value) 
            ? 'text-yellow-400' 
            : index < value && index + 1 > value
              ? 'text-yellow-400' 
              : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {index < value && index + 1 > value ? (
            // Half-filled star for decimal ratings
            <>
              <defs>
                <linearGradient id={`half-star-${index}`}>
                  <stop offset={`${(value - index) * 100}%`} stopColor="currentColor" />
                  <stop offset={`${(value - index) * 100}%`} stopColor="#D1D5DB" />
                </linearGradient>
              </defs>
              <path
                fill={`url(#half-star-${index})`}
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </>
          ) : (
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          )}
        </svg>
      ))}
      {showValue && (
        <span className={`${textSize} text-gray-500 ml-1`}>
          ({value.toFixed(1)})
        </span>
      )}
    </div>
  );
};

export default Rating;
