import { useCallback, useState } from 'react';

import type { FolderProps } from '@/types';

const useSortFolders = () => {
  const [folders, setFolders] = useState<FolderProps[]>([]);

  const sortFolders = useCallback(
    (order: 'asc' | 'desc') => {
      const sortedFolders = [...folders].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      });
      setFolders(sortedFolders);
    },
    [folders],
  );

  return { folders, setFolders, sortFolders };
};

export default useSortFolders;
