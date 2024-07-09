import { currentFolderState } from '@/recoil';

import { useRecoilState } from 'recoil';

const SelectedFolderTitleArea = () => {
  const [currentFolder] = useRecoilState(currentFolderState);
  return (
    <div>
      <p>{currentFolder.name}</p>
      <p>({currentFolder.linkCount})</p>
    </div>
  );
};

export default SelectedFolderTitleArea;
