export interface FolderProps {
  id: number;
  name: string;
  linkCount?: number;
  createdAt: string;
}

export interface FolderItemListProps {
  folderList: FolderProps[];
}

export interface currentFolder {
  id: number | string;
  name: string;
  linkCount?: number;
}
