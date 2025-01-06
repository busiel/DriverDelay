import React from 'react';
import { Newspaper } from 'lucide-react';

export const NewsletterCTA: React.FC = () => {
  return (
    <div className="mt-6 p-4 bg-gradient-to-br from-navy-700 to-[#46638c] rounded-lg text-white">
      <div className="flex items-center gap-2 mb-3">
        <Newspaper className="h-5 w-5" />
        <h3 className="font-semibold">The Linehaul Buzzard</h3>
      </div>
      <p className="text-sm text-gray-100 mb-4">
        Just a dude blazing runs, crushing miles, and flipping off fate.
      </p>
      <a
        href="https://thelinehaulbuzzard.substack.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-white text-navy-700 py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition-colors"
      >
        Subscribe to Newsletter
      </a>
    </div>
  );
};