import { useEffect } from 'react';
import { folderListState, linkListState } from '@/recoil';
import { useQuery } from '@tanstack/react-query';

import { useRecoilState } from 'recoil';

import { getAllFolders } from '@/libs/folderService';

import usePageRouter from '@/hooks/usePageRouter';

import { fetchLinks } from '@/utils/linkFetcher';

import DefaultLayout from '@/components/layout/DefaultLayout';

import AddLinkArea from './components/AddLinkArea';
import FolderSelectListArea from './components/FolderSelectListArea';
import LinkLItemListArea from './components/LinkLItemListArea';
import LinkSearchArea from './components/LinkSearchArea';
import SelectedFolderTitleArea from './components/SelectedFolderTitleArea';

import s from './style.module.scss';

export default function Page() {
  const [, setFolderList] = useRecoilState(folderListState);
  const [, setLinkList] = useRecoilState(linkListState);
  const currentSelectedFolderId = usePageRouter();

  const { data: folderList } = useQuery({
    queryKey: ['folderList'],
    queryFn: getAllFolders,
  });

  const { data: linkList } = useQuery({
    queryKey: ['linkList', currentSelectedFolderId],
    queryFn: () => fetchLinks(currentSelectedFolderId as string),
    enabled: !!currentSelectedFolderId,
  });

  useEffect(() => {
    if (folderList) {
      setFolderList(folderList);
    }
    if (linkList) {
      setLinkList(linkList);
    }
  }, [folderList, linkList, setFolderList, setLinkList]);

  return (
    <DefaultLayout>
      <AddLinkArea />
      <LinkSearchArea />
      <FolderSelectListArea />
      <SelectedFolderTitleArea />
      <LinkLItemListArea />
    </DefaultLayout>
  );
}
