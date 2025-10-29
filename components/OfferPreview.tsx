
import React from 'react';
import { useDrop } from 'react-dnd';
import { OfferBlock } from '../types';
import BlockCard from './BlockCard';

interface OfferPreviewProps {
  blocks: OfferBlock[];
  onDrop: (item: { id: string }) => void;
  onClear: () => void;
}

const ITEM_TYPE = 'BLOCK';

const OfferPreview: React.FC<OfferPreviewProps> = ({ blocks, onDrop, onClear }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const isActive = isOver && canDrop;
  let dropzoneBg = 'bg-white';
  if (isActive) {
    dropzoneBg = 'bg-indigo-50';
  } else if (canDrop) {
    dropzoneBg = 'bg-slate-50';
  }

  return (
    <div className="p-6 rounded-lg shadow-lg min-h-[calc(100vh-10rem)] transition-colors" ref={drop} style={{ backgroundColor: isActive ? '#eef2ff' : canDrop ? '#f8fafc' : '#ffffff' }}>
       <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <h2 className="text-2xl font-bold text-slate-700">Podgląd Oferty</h2>
        {blocks.length > 0 && (
          <button
            onClick={onClear}
            className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-colors"
          >
            Wyczyść
          </button>
        )}
       </div>
      
      {blocks.length === 0 ? (
        <div className={`flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-lg transition-all ${isActive ? 'border-indigo-400' : 'border-slate-300'}`}>
           <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 mb-4 transition-colors ${isActive ? 'text-indigo-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className={`text-lg font-semibold transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-500'}`}>
            Przeciągnij i upuść bloki tutaj
          </p>
          <p className="text-sm text-slate-400 mt-1">aby rozpocząć tworzenie oferty</p>
        </div>
      ) : (
        <div className="space-y-6">
          {blocks.map((block, index) => (
            <BlockCard key={`${block.id}-${index}`} block={block} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferPreview;
