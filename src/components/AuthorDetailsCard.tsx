import React from 'react';
import { format } from 'date-fns';

interface AuthorCardProps {
  initials: string;
  name: string;
  timestamp: string;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ initials, name, timestamp }) => {
  let date_formatted = "";

  if (timestamp && !isNaN(Date.parse(timestamp))) {
    try {
      date_formatted = format(new Date(timestamp), 'MMMM d yyyy, h:mm a');
    } catch (error) {
      console.error("Error formatting date:", error);
    }
  } else {
    console.warn("Invalid or missing timestamp:", timestamp);
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Circular badge with initials */}
      <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
        <span className="text-lg font-bold text-black font-roboto">{initials || 'A'}</span>
      </div>
      {/* Author name and timestamp */}
      <div>
        <h2 className="text-lg font-semibold text-black font-mono">{name}</h2>
        <p className="text-sm text-gray-500 font-mono">{date_formatted}</p>
      </div>
    </div>
  );
};

export default AuthorCard;
