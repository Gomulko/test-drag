
import React from 'react';
import { OfferBlock } from '../types';

interface BlockCardProps {
  block: OfferBlock;
  isDragging?: boolean;
}

const BlockCard: React.FC<BlockCardProps> = ({ block, isDragging }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}`}
    >
      <img src={block.imageUrl} alt={block.title} className="w-full h-32 object-cover" />
      <div className="p-4">
        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
          {block.category}
        </span>
        <h3 className="text-lg font-bold text-slate-800">{block.title}</h3>
        <p className="text-sm text-slate-600 mt-1">{block.description}</p>
      </div>
    </div>
  );
};

export default BlockCard;
