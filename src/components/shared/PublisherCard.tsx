import React from 'react';
import { format } from 'date-fns';

interface PublisherInformationProps {
  initials: string;
  name: string;
  established?: string; // Optional, as not all publishers provide this
  link?: string; // Optional URL for publisher's website or profile
}

const PublisherInformation: React.FC<PublisherInformationProps> = ({ initials, name, established, link }) => {
  let formattedDate = '';

  if (established && !isNaN(Date.parse(established))) {
    try {
      formattedDate = format(new Date(established), 'MMMM yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
    }
  } else if (established) {
    console.warn('Invalid or missing established date:', established);
  }

  // Capitalize the first letter of each word in the name
  const capitalizedName = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return (
    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg shadow-sm max-w-[700px] mb-10 mt-10 xl:mt-0">
      {/* Circular badge with publisher initials */}
      <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center">
        <span className="text-xl font-bold text-black font-roboto">{initials ? initials.toUpperCase() : 'A'}</span>
      </div>
      {/* Publisher information */}
      <div>
        <p className="text-sm text-gray-600 font-mono">Publisher of this article</p>
        <h2 className="text-xl font-semibold text-black font-mono">
          {link ? (
            <a href={link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              {capitalizedName}
            </a>
          ) : (
            capitalizedName
          )}
        </h2>
        {formattedDate && (
          <p className="text-sm text-gray-600 font-mono">Established: {formattedDate}</p>
        )}
      </div>
    </div>
  );
};

export default PublisherInformation;