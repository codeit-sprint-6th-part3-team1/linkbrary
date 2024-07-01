import React from 'react';
import { FolderProps } from '@/types';
import FolderItem from '@/components/FolderItem';

interface FolderListProps {
  folders: FolderProps[];
  moveFolder: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (folderId: number) => void;
  handleClick: (folderId: number) => void;
  handleUpdate: (folderId: number) => void;
}

const FolderList: React.FC<FolderListProps> = ({ folders, moveFolder, handleDelete, handleClick, handleUpdate }) => {
  return (
    <ul>
      {folders.map((folder, index) => (
        <FolderItem
          key={folder.id}
          index={index}
          folder={folder}
          moveFolder={moveFolder}
          handleDelete={handleDelete}
          handleClick={handleClick}
          handleUpdate={handleUpdate}
        />
      ))}
    </ul>
  );
};

export default FolderList;
