export interface LinkProps {
  id: number;
  url: string;
  title: string;
  description: string;
  createdAt?: string;
  favorite: boolean;
  imageSource?: string;
  folderId?: number;
}
