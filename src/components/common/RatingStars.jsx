import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating = 5 }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-gold fill-gold' : 'text-slate-300'
          }`}
        />
      ))}
    </div>
  );
};

export default RatingStars;
