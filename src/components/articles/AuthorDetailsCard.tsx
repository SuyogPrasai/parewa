import React from 'react';

import { Badge } from '../ui/badge';

interface AuthorCardProps {
  initials: string;
  name: string;
  timestamp: string;
  type: string;
  position?: string;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ initials, name, timestamp, type, position }) => {
  let date_formatted = "";

  if (timestamp && !isNaN(Date.parse(timestamp))) {
    try {
      // Convert to Nepal timezone (UTC+5:45)
      const date = new Date(timestamp);
      date_formatted = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Kathmandu'
      }) + ', ' + date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kathmandu'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
    }
  } else {
    console.warn("Invalid or missing timestamp:", timestamp);
  }
  
  const capitalizedName = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return (
    <div className="flex items-center space-x-2">
      {/* Circular badge with initials */}
      <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center">
        <span className="text-xl font-bold text-black font-roboto">{initials ? initials.toUpperCase() : 'A'}</span>
      </div>
      {/* Author name and timestamp */}
      <div>
        {type === "article" ? (
          <p className="text-sm text-gray-600 font-mono">Author of this Article</p>
        ) : (
          <p className="text-sm text-gray-600 font-mono">Author of this Notice</p>
        )}
        <h2 className="text-lg font-semibold text-black font-mono flex gap-2">
          {position && (
            <Badge className="text-xs text-gray-500 font-mono bg-white hover:bg-white">
              {position}
            </Badge>
          )}
          <div className="text-black-600 hover:underline">
            {capitalizedName}
          </div>
        </h2>
        <p className="text-sm text-gray-500 font-mono mt-1">Published: {date_formatted}</p>
      </div>
    </div>
  );
};

export default AuthorCard;