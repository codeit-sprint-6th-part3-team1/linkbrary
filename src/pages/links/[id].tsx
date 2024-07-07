import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { folderListState, linkListState, loginState, userState } from '@/recoil';
import { useRecoilState } from 'recoil';
import type { PagingOptions, FolderProps, LinkProps } from '@/types';
import * as FOLDER from '@/libs/folderService';
import * as LINK from '@/libs/linkService';
import useForm from '@/hooks/useForm';
import useLogin from '@/hooks/useLogin';
import Footer from '@/components/Footer';
import Gnb from '@/components/Gnb';
import { DragDropContext, Draggable, DropResult, DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '@/components/StrictModeDroppble';
import Pagination from '@/components/Pagination';

export default function Page() {
  const router = useRouter();
  const [isLoggedIn] = useRecoilState(loginState);
  const [folderList, setFolderList] = useRecoilState(folderListState);
  const [linkList, setLinkList] = useRecoilState(linkListState);
  const [user] = useRecoilState(userState);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<'createdAt' | 'linkCount'>('createdAt');
  const [dragOrder, setDragOrder] = useState<number[]>([]);
  const [folderOrder, setFolderOrder] = useState<number[]>([]);

  const [newLinkUrl, setNewLinkUrl] = useState<string>('');
  const [linkFolderId, setLinkFolderId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'favorites' | number>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [sortedLinks, setSortedLinks] = useState<LinkProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/links/${page}`);
  };

  useEffect(() => {
    LINK.getAllLinks({ page: currentPage, pageSize: itemsPerPage });
  }, [currentPage]);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };
  const clearSearch = () => {
    setSearchQuery('');
    // LINK.getAllLinks(currentPage, itemsPerPage);
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedOrder = JSON.parse(localStorage.getItem('folderOrder') || '[]');
      setFolderOrder(storedOrder);
    }
  }, []);
  const filterLinks = useMemo(() => {
    if (!searchQuery) return linkList;

    const lowercasedQuery = searchQuery.toLowerCase();
    return linkList.filter(
      (link) =>
        link.title.toLowerCase().includes(lowercasedQuery) ||
        link.description.toLowerCase().includes(lowercasedQuery) ||
        link.url.toLowerCase().includes(lowercasedQuery) ||
        (link.createdAt && link.createdAt.toLowerCase().includes(lowercasedQuery)),
    );
  }, [linkList, searchQuery]);
  const { logout } = useLogin();
  useEffect(() => {
    const filteredLinks = linkList.filter((link) => {
      if (filter === 'favorites') return link.favorite;
      if (typeof filter === 'number') return link.folderId === filter;
      return true;
    });

    const searchedLinks = filteredLinks.filter((link) => {
      const regex = new RegExp(searchKeyword, 'gi');
      return link.title.match(regex) || link.description.match(regex) || link.url.match(regex) || link.createdAt?.match(regex);
    });

    setSortedLinks(searchedLinks);
  }, [linkList, filter, searchKeyword]);
  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'yellow' }}>
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const onSubmitCreateFolderForm = async (formData: { createFolderName: string }) => {
    const { createFolderName } = formData;
    const newFolder = await FOLDER.createFolder(createFolderName);
    const folders = await FOLDER.getAllFolders();
    updateFolderList(folders, newFolder.id); // Include new folder ID at the top
  };
  const handleAddLinkItem = async () => {
    if (!newLinkUrl || !linkFolderId) return;
    try {
      await LINK.addLink(newLinkUrl, linkFolderId);
      const updatedLinks = await LINK.getAllLinks({ page: currentPage });
      setLinkList(updatedLinks);
      setNewLinkUrl('');
      setLinkFolderId(null);
    } catch (error) {
      console.error('Error adding link:', error);
    }
  };

  const handleDeleteLinkItem = async (linkId: number) => {
    try {
      await LINK.deleteLink(linkId);
      const updatedLinks = await LINK.getAllLinks({ page: currentPage });
      setLinkList(updatedLinks);
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };
  const handleSetFavoriteLinkItem = async (linkId: number, favorite: boolean) => {
    try {
      await LINK.setFavoriteLink(linkId, favorite);
      const updatedLinks = await LINK.getAllLinks({ page: currentPage });
      setLinkList(updatedLinks);
    } catch (error) {
      console.error('Error setting favorite link:', error);
    }
  };
  const updateFolderList = (folders: FolderProps[], newFolderId?: number) => {
    let updatedOrder = folderOrder;
    if (newFolderId) {
      updatedOrder = [newFolderId, ...folderOrder];
      setFolderOrder(updatedOrder);
      if (typeof window !== 'undefined') {
        localStorage.setItem('folderOrder', JSON.stringify(updatedOrder));
      }
    }
    const orderedData = sortFolders(folders, sortField, sortOrder, updatedOrder);
    setFolderList(orderedData);
  };

  const {
    formData: createFolderFormData,
    handleChange: handleChangeCreateFolder,
    handleSubmit: handleSubmitCreateFolder,
  } = useForm({
    inputValue: { createFolderName: '' },
    onSubmit: onSubmitCreateFolderForm,
  });

  const [updateFolderFormData, setUpdateFolderFormData] = useState<{ [key: number]: string }>({});

  const handleUpdateFolderChange = (event: React.ChangeEvent<HTMLInputElement>, folderId: number) => {
    const { value } = event.target;
    setUpdateFolderFormData((prev) => ({ ...prev, [folderId]: value }));
  };

  const handleUpdateFolderSubmit = async (event: React.SyntheticEvent, folderId: number) => {
    event.preventDefault();
    const updateFolderName = updateFolderFormData[folderId];
    await FOLDER.updateFolder(folderId, updateFolderName);
    setFolderList(await FOLDER.getAllFolders());
  };

  useEffect(() => {
    setCurrentPage(Number(router.query.id) || 1);
  }, [router.query.id]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const data = await FOLDER.getAllFolders();
        const storedOrder = JSON.parse(localStorage.getItem('folderOrder') || '[]');
        if (storedOrder.length > 0) {
          const orderedData = storedOrder
            .map((id: number) => data.find((folder: FolderProps) => folder.id === id))
            .filter((folder: FolderProps | undefined) => folder !== undefined);
          setFolderList(orderedData);
        } else {
          setFolderList(data);
        }
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
  const handleSort = (field: 'createdAt' | 'linkCount') => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sortField', field);
      localStorage.setItem('sortOrder', order);
    }
    const sortedFolders = sortFolders(folderList, field, order, dragOrder);
    setFolderList(sortedFolders);
    const newOrder = sortedFolders.map((folder) => folder.id);
    setDragOrder(newOrder);
    if (typeof window !== 'undefined') {
      localStorage.setItem('folderOrder', JSON.stringify(newOrder));
    }
  };
  const handleSortLinks = (order: 'recent' | 'oldest' | 'random') => {
    let sortedLinks;
    if (order === 'recent') {
      sortedLinks = [...linkList].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
    } else if (order === 'oldest') {
      sortedLinks = [...linkList].sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
    } else {
      sortedLinks = [...linkList].sort(() => Math.random() - 0.5);
    }
    setSortedLinks(sortedLinks);
  };
  const itemsPerPage = 10;
  const handleFilterLinks = (type: 'all' | 'favorites' | number) => {
    setFilter(type);
    if (type === 'favorites') {
      LINK.getFavorites({ page: currentPage, pageSize: itemsPerPage });
    } else if (type === 'all') {
      LINK.getAllLinks({ page: currentPage, pageSize: itemsPerPage });
    } else {
      LINK.getLinksByFolder(type, currentPage, itemsPerPage);
    }
  };

  const handleSearchLinks = (keyword: string) => {
    setSearchKeyword(keyword);
  };
  const sortFolders = (folders: FolderProps[], field: 'createdAt' | 'linkCount', order: 'asc' | 'desc', dragOrder: number[]): FolderProps[] => {
    const dragOrderedFolders = dragOrder.length
      ? (dragOrder.map((id) => folders.find((folder) => folder.id === id)).filter(Boolean) as FolderProps[])
      : folders.slice(); // Use slice to create a copy of the array

    const sortedFolders = [...dragOrderedFolders].sort((a, b) => {
      if (field === 'createdAt') {
        return order === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return order === 'asc' ? (a.linkCount || 0) - (b.linkCount || 0) : (b.linkCount || 0) - (a.linkCount || 0);
      }
    });

    return sortedFolders;
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reorderedFolders = Array.from(folderList);
    const [removed] = reorderedFolders.splice(result.source.index, 1);
    reorderedFolders.splice(result.destination.index, 0, removed);

    setFolderList(reorderedFolders);
    const newOrder = reorderedFolders.map((folder) => folder.id);
    setFolderOrder(newOrder);
    if (typeof window !== 'undefined') {
      localStorage.setItem('folderOrder', JSON.stringify(newOrder));
    }
  };

  const handleDeleteFolder = async (folderId: number) => {
    await FOLDER.deleteFolder(folderId);
    const folders = await FOLDER.getAllFolders();
    const updatedOrder = folderOrder.filter((id) => id !== folderId); // Remove the deleted folder's ID
    setFolderOrder(updatedOrder);
    localStorage.setItem('folderOrder', JSON.stringify(updatedOrder));
    updateFolderList(folders);
  };

  const handleAddLink = async () => {
    if (!newLinkUrl || !linkFolderId) return;
    try {
      await LINK.addLink(newLinkUrl, linkFolderId);
      const updatedLinks = await LINK.getAllLinks({ page: currentPage });
      setLinkList(updatedLinks);
      setNewLinkUrl(''); // Reset the input
      setLinkFolderId(null); // Reset the selected folder
    } catch (error) {
      console.error('Error adding link:', error);
    }
  };

  const handleDeleteLink = async (linkId: number) => {
    try {
      await LINK.deleteLink(linkId);
      const updatedLinks = await LINK.getAllLinks({ page: currentPage });
      setLinkList(updatedLinks);
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };
  return (
    <div>
      {user && <Gnb isLogin={isLoggedIn} userEmail={user.email} />}
      <button onClick={handleLogout}>Logout</button>
      <h1>Links Pages</h1>
      <div>
        <form>
          <input value={newLinkUrl} onChange={(e) => setNewLinkUrl(e.target.value)} placeholder="링크를 추가해 보세요" />
          <select onChange={(e) => setLinkFolderId(Number(e.target.value))}>
            <option value="">폴더 선택</option>
            {folderList.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddLinkItem}>
            추가하기
          </button>
        </form>
        <form>
          <input placeholder="링크를 검색해 보세요" />
          <button type="button">reset</button>
        </form>
      </div>

      <h2>Folder List</h2>
      <div>
        <button onClick={() => handleSort('createdAt')}>Sort by Created Date {sortOrder}</button>
        <button onClick={() => handleSort('linkCount')}>Sort by Link Count {sortOrder}</button>
      </div>
      <form onSubmit={handleSubmitCreateFolder}>
        <input
          name="createFolderName"
          value={createFolderFormData.createFolderName}
          onChange={handleChangeCreateFolder}
          placeholder="추가할 폴더 이름을 입력해주세요"
        />
        <button type="submit">폴더 추가</button>
      </form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="folders">
          {(provided: DroppableProvided): React.ReactNode => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="droppable">
              {folderList.map((folder, index) => (
                <Draggable key={folder.id} draggableId={String(folder.id)} index={index}>
                  {(provided: DraggableProvided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="draggable">
                      {folder.name}
                      <form onSubmit={(event) => handleUpdateFolderSubmit(event, folder.id)}>
                        <input
                          name="updateFolderName"
                          value={updateFolderFormData[folder.id] || ''}
                          onChange={(event) => handleUpdateFolderChange(event, folder.id)}
                          placeholder="폴더 이름 수정"
                        />
                        <button type="submit">폴더 이름 수정</button>
                      </form>
                      <button onClick={() => handleDeleteFolder(folder.id)}>삭제</button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div>
        <button onClick={() => handleSortLinks('recent')}>Sort by Recent</button>
        <button onClick={() => handleSortLinks('oldest')}>Sort by Oldest</button>
        <button onClick={() => handleSortLinks('random')}>Sort by Random</button>
        <button onClick={() => handleFilterLinks('all')}>All</button>
        <button onClick={() => handleFilterLinks('favorites')}>Favorites</button>
        {folderList.map((folder) => (
          <button key={folder.id} onClick={() => handleFilterLinks(folder.id)}>
            {folder.name}
          </button>
        ))}
      </div>
      <div>
        <input type="text" placeholder="Search links" value={searchQuery} onChange={handleSearchChange} />
        <button onClick={clearSearch}>Clear</button>
      </div>
      <ul>
        {filterLinks.map((link) => (
          <li key={link.id}>
            <a href={link.url}>{highlightText(link.title, searchQuery)}</a>
            <p>{highlightText(link.description, searchQuery)}</p>
            <button onClick={() => handleSetFavoriteLinkItem(link.id, !link.favorite)}>{link.favorite ? 'Unfavorite' : 'Favorite'}</button>
            <button onClick={() => handleDeleteLinkItem(link.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={Math.ceil(linkList.length / itemsPerPage)} onPageChange={handlePageChange} />

      <Footer />
    </div>
  );
}
