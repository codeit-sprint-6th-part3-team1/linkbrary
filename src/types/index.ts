export interface FolderProps {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
}

export interface LinkProps {
  id: number;
  url: string;
  description: string;
  createdAt: string;
  favorite: boolean;
}

export interface UserProps {
  id: number;
  name: string;
  email: string;
  imageSource: string;
}
