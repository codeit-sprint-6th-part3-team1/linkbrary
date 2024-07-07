import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = {
  FOLDER: 'folder',
};

interface DragItem {
  index: number;
}

const useDragAndDrop = (index: number, moveFolder: (dragIndex: number, hoverIndex: number) => void) => {
  const ref = useRef<HTMLLIElement>(null);

  const [, drop] = useDrop({
    accept: ItemType.FOLDER,
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset?.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveFolder(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.FOLDER,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return { ref, isDragging };
};

export default useDragAndDrop;
