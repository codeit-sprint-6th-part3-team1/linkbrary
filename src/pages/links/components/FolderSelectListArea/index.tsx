import { useEffect } from 'react';
import Link from 'next/link';
import { currentFolderState, folderListState } from '@/recoil';

import { useRecoilState } from 'recoil';

import type { currentFolder, FolderProps } from '@/types';

const FolderItem = ({ id, name }: currentFolder) => {
  const [, setCurrentFolder] = useRecoilState(currentFolderState);
  return (
    <Link href={`/links/${id}`}>
      <button
        type="button"
        onClick={() => {
          setCurrentFolder({ id, name });
        }}
      >
        {name}
      </button>
    </Link>
  );
};

const FolderSelectListArea = () => {
  const [folders] = useRecoilState<FolderProps[]>(folderListState);
  const myFolderList: currentFolder[] = [{ id: 'all', name: 'All' }, ...(folders ?? []), { id: 'favorite', name: '즐겨찾기' }];
  return (
    <>
      {myFolderList.map((folder) => (
        <FolderItem key={folder.id} id={folder.id} name={folder.name} />
      ))}
    </>
  );
};

export default FolderSelectListArea;
