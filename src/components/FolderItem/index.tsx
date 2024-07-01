import { FolderProps } from '@/types';
import useDragAndDrop from '@/hooks/useDragAndDrop';

interface FolderItemProps {
  folder: FolderProps;
  index: number;
  moveFolder: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (folderId: number) => void;
  handleClick: (folderId: number) => void;
  handleUpdate: (folderId: number) => void;
}

const FolderItem = ({ folder, index, moveFolder, handleDelete, handleClick, handleUpdate }: FolderItemProps) => {
  const { ref, isDragging } = useDragAndDrop(index, moveFolder);

  return (
    <li ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} onClick={() => handleClick(folder.id)}>
      {folder.name}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(folder.id);
        }}
      >
        Delete
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleUpdate(folder.id);
        }}
      >
        Update
      </button>
    </li>
  );
};

export default FolderItem;
