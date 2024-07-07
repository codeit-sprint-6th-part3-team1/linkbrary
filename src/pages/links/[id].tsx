import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { loginState } from '@/recoil/loginState';
import { folderListState, linkListState, userState } from '@/recoil/state';

import { useRecoilState } from 'recoil';

import type { PagingOptions } from '@/types';

import * as FOLDER from '@/libs/folderService';
import * as LINK from '@/libs/linkService';
import { getAllUsers } from '@/libs/userService';

import useForm from '@/hooks/useForm';
import useLogin from '@/hooks/useLogin';

import Footer from '@/components/Footer';
import Gnb from '@/components/Gnb';
import SearchBar from '@/components/SearchBar';

export default function Page() {
  const router = useRouter();
  const [isLoggedIn] = useRecoilState(loginState);
  const [currentPage, setCurrentPage] = useState(1);

  const { logout } = useLogin();
  const {
    formData: addLinkQuery,
    handleChange: handleAddLinkQuery,
    resetForm: resetAddLinkQuery,
  } = useForm({
    addLinkQuery: '',
  });
  const {
    formData: searchLinkQuery,
    handleChange: handleSearchLinkQuery,
    resetForm: resetSearchLinkQuery,
  } = useForm({
    searchLinkQuery: '',
  });

  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    setCurrentPage(Number(router.query.id) || 1);
  }, [router.query.id]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const [folderList, setFolderList] = useRecoilState(folderListState);
  const [linkList, setLinkList] = useRecoilState(linkListState);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const data = await FOLDER.getAllFolders();
        setFolderList(data);
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };
    fetchFolders();
  }, [setFolderList]);

  useEffect(() => {
    const fetchLinkItems = async ({ page = 1, pageSize = 10 }: PagingOptions) => {
      try {
        const data = await LINK.getAllLinks({ page, pageSize });
        setLinkList(data);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };
    fetchLinkItems({ page: Number(currentPage) });
  }, [currentPage, setLinkList]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div>
      <Gnb isLogin={isLoggedIn} />
      <button onClick={handleLogout}>Logout</button>
      <h1>Links Pages</h1>
      <div>
        <form>
          <input placeholder="링크를 추가해 보세요" />
          <button>추가하기</button>
        </form>
        <form>
          <input placeholder="링크를 검색해 보세요" /> <button>reset</button>
        </form>
      </div>

      <h2>Folder List</h2>
      <ul>
        {folderList.map((folder) => (
          <li key={folder.id}>{folder.name}</li>
        ))}
      </ul>
      <ul>
        {linkList.map((link) => (
          <li key={link.id}>{link.title}</li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}
