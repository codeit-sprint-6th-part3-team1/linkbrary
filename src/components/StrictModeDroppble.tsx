import { useEffect, useState } from 'react';
import type { DroppableProps } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';

interface StrictModeDroppableProps extends DroppableProps {
  children: React.ReactNode;
}

export const StrictModeDroppable = ({ children, ...props }: StrictModeDroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};
