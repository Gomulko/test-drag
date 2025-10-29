
import React from 'react';
import { OfferBlock } from '../types';
import DraggableBlock from './DraggableBlock';

interface BlockLibraryProps {
  blocks: OfferBlock[];
}

const BlockLibrary: React.FC<BlockLibraryProps> = ({ blocks }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg sticky top-24">
      <h2 className="text-xl font-bold text-slate-700 mb-4 pb-2 border-b">
        Dostępne Bloki
      </h2>
      <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
        {blocks.map(block => (
          <DraggableBlock key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
};

export default BlockLibrary;
