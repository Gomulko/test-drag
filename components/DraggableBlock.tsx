
import React from 'react';
import { useDrag } from 'react-dnd';
import { OfferBlock } from '../types';
import BlockCard from './BlockCard';

interface DraggableBlockProps {
  block: OfferBlock;
}

const ITEM_TYPE = 'BLOCK';

const DraggableBlock: React.FC<DraggableBlockProps> = ({ block }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { id: block.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="cursor-grab">
      <BlockCard block={block} isDragging={isDragging} />
    </div>
  );
};

export default DraggableBlock;
