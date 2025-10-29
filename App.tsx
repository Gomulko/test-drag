
import React, { useState, useEffect, useCallback } from 'react';
import { OfferBlock } from './types';
import { PREDEFINED_BLOCKS } from './constants';
import BlockLibrary from './components/BlockLibrary';
import OfferPreview from './components/OfferPreview';
import GenerationModal from './components/GenerationModal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const App: React.FC = () => {
  const [droppedBlocks, setDroppedBlocks] = useState<OfferBlock[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const savedBlocks = localStorage.getItem('special-offer-blocks');
      if (savedBlocks) {
        setDroppedBlocks(JSON.parse(savedBlocks));
      }
    } catch (error) {
      console.error("Failed to load blocks from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('special-offer-blocks', JSON.stringify(droppedBlocks));
    } catch (error) {
      console.error("Failed to save blocks to localStorage", error);
    }
  }, [droppedBlocks]);

  const handleDrop = useCallback((item: { id: string }) => {
    const blockToAdd = PREDEFINED_BLOCKS.find(block => block.id === item.id);
    if (blockToAdd) {
      setDroppedBlocks(prevBlocks => [...prevBlocks, blockToAdd]);
    }
  }, []);

  const clearOffer = () => {
    setDroppedBlocks([]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen font-sans text-slate-800">
        <header className="bg-white shadow-md sticky top-0 z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-700">
              <span className="text-indigo-600">🚀 Kreator</span> Ofert Specjalnych
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={droppedBlocks.length === 0}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              Generuj Ofertę
            </button>
          </div>
        </header>

        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <OfferPreview blocks={droppedBlocks} onDrop={handleDrop} onClear={clearOffer} />
            </div>
            <div className="lg:col-span-1">
              <BlockLibrary blocks={PREDEFINED_BLOCKS} />
            </div>
          </div>
        </main>
        
        <GenerationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          offerBlocks={droppedBlocks}
        />
      </div>
    </DndProvider>
  );
};

export default App;
