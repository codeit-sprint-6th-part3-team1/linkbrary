import React, { useCallback, useEffect, useMemo,useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';

import type { FolderProps, LinkProps } from '@/types';

import useFolders from '@/hooks/useFolders';
import useLinks from '@/hooks/useLinks';
import useSort from '@/hooks/useSort';
import useUsers from '@/hooks/useUsers';

import Footer from '@/components/Footer';
import Gnb from '@/components/Gnb';
import Pagination from '@/components/Pagination';
import Skeleton from '@/components/Skeleton';

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const { folders, message: folderMessage, loading: folderLoading, handleAddFolder, handleUpdateFolder, handleDeleteFolder } = useFolders();
  const {
    links,
    message: linkMessage,
    loading: linkLoading,
    getAllLinks,
    getLinksByFolder,
    addLink,
    deleteLink,
    updateLink,
    setFavoriteLink,
    getFavorites,
  } = useLinks();
  const { data: sortedFolders, setData: setFolderData, sortAscending, sortDescending } = useSort<FolderProps>(folders, 'id');
  const { user, getUser } = useUsers();

  const [folderName, setFolderName] = useState<string>('');
  const [msg, setMessage] = useState<string>(folderMessage || linkMessage || '');
  const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
  const [editingFolderName, setEditingFolderName] = useState<string>('');
  const [newLinkUrl, setNewLinkUrl] = useState<string>('');
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const itemsPerPage = 10;
  const currentPage = id ? Number(id) : 1;

  const { data: sortedFoldersByLinkCount, sortAscending: sortByLinkCountAsc, sortDescending: sortByLinkCountDesc } = useSort<FolderProps>(folders, 'linkCount');

  useEffect(() => {
    setFolderData(folders);
  }, [folders, setFolderData]);

  useEffect(() => {
    setMessage(folderMessage || linkMessage || '');
  }, [folderMessage, linkMessage]);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (id) {
      getAllLinks(currentPage, itemsPerPage);
    }
  }, [id, getAllLinks]);

  const handleLogout = () => {
    Cookies.remove('accessToken');
    router.push('/');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingFolderName(event.target.value);
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'url') setNewLinkUrl(value);
  };

  const handleFolderSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFolderId(Number(event.target.value));
    setShowFavorites(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await handleAddFolder(folderName);
    setFolderName('');
  };

  const handleLinkSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFolderId) {
      const linkData = { url: newLinkUrl, folderId: selectedFolderId };
      await addLink(linkData);
      setNewLinkUrl('');
      // Update links after adding a new link
      await getLinksByFolder(selectedFolderId, 1, itemsPerPage);
    }
  };

  const handleEditSubmit = async (event: React.FormEvent, folderId: number) => {
    event.preventDefault();
    await handleUpdateFolder(folderId, editingFolderName);
    setEditingFolderId(null);
  };

  const handleSetFavoriteLink = (linkId: number, favorite: boolean) => {
    setFavoriteLink(linkId, !favorite);
  };

  const handleDeleteLink = async (linkId: number, folderId: number) => {
    await deleteLink(linkId);
    // Update the folder's linkCount
    setFolderData((prevData) => prevData.map((folder) => (folder.id === folderId ? { ...folder, linkCount: folder.linkCount - 1 } : folder)));
    // Update links after deleting a link
    await getLinksByFolder(folderId, 1, itemsPerPage);
  };

  const handleFolderButtonClick = useCallback(
    (folderId: number) => {
      setSelectedFolderId(folderId);
      setShowFavorites(false);
      getLinksByFolder(folderId, 1, 10);
    },
    [getLinksByFolder],
  );

  const handleShowFavorites = () => {
    setShowFavorites(true);
    setSelectedFolderId(null);
    getFavorites(1, 10);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const filterLinks = useMemo(() => {
    if (searchQuery === '') {
      return links;
    } 
      const lowercasedSearchQuery = searchQuery.toLowerCase();
      return links.filter((link: LinkProps) => {
        const matchesSearchQuery =
          link.url.toLowerCase().includes(lowercasedSearchQuery) ||
          link.title.toLowerCase().includes(lowercasedSearchQuery) ||
          link.description.toLowerCase().includes(lowercasedSearchQuery);
        return matchesSearchQuery;
      });
    
  }, [links, searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    getAllLinks(currentPage, itemsPerPage);
  };

  const handlePageChange = (page: number) => {
    router.push(`/links/${page}`);
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: 'yellow' }}>
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </>
    );
  };

  const handleDeleteFolderWithLinks = async (folderId: number) => {
    setDeleting(true);
    const folderLinks = links.filter((link) => link.folderId === folderId);
    for (const link of folderLinks) {
      await deleteLink(link.id);
    }
    await handleDeleteFolder(folderId);
    setFolderData((prevData) => prevData.filter((folder) => folder.id !== folderId));
    setDeleting(false);
  };

  return (
    <div>
      {user && <Gnb isLogin userEmail={`${user.email}`} />}
      <button onClick={handleLogout}>로그아웃</button>
      <div>
        <h1>Add Folder Form</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Enter the name of the folder you want</label>
            <input type="text" name="name" value={folderName} onChange={handleChange} required />
          </div>
          <button type="submit">Add</button>
        </form>
        {msg && <p>{msg}</p>}
        <h1>Folders</h1>
        {folderLoading ? (
          <Skeleton count={5} />
        ) : (
          <ul>
            {sortedFolders.map((folder) => (
              <li key={folder.id}>
                {editingFolderId === folder.id ? (
                  <form onSubmit={(event) => handleEditSubmit(event, folder.id)}>
                    <input type="text" value={editingFolderName} onChange={handleEditChange} required />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditingFolderId(null)}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <b>{folder.name}</b> <div>{folder.createdAt}</div>
                    <div>{folder.linkCount}</div>
                    <button
                      onClick={() => {
                        setEditingFolderId(folder.id);
                        setEditingFolderName(folder.name);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteFolderWithLinks(folder.id)}>{deleting ? 'Deleting...' : 'X'}</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
        <h1>Folder sorting test</h1>
        <div>
          <label>작성 오래된 순</label>
          <button onClick={sortAscending}>Ascending</button>
        </div>
        <div>
          <label>최근 작성 순</label>
          <button onClick={sortDescending}>Descending</button>
        </div>
        <div>
          <label>링크 적은 순</label>
          <button onClick={sortByLinkCountAsc}>Ascending</button>
        </div>
        <div>
          <label>링크 많은 순</label>
          <button onClick={sortByLinkCountDesc}>Descending</button>
        </div>
      </div>
      <br /> <br />
      <div>
        <h1>Add Link Form</h1>
        <form onSubmit={handleLinkSubmit}>
          <div>
            <label>Enter the URL</label>
            <input type="text" name="url" value={newLinkUrl} onChange={handleLinkChange} required />
          </div>
          <div>
            <label>Select Folder</label>
            <select onChange={handleFolderSelect} required>
              <option value="">Select a folder</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Add</button>
        </form>
        <h1>Links</h1>
        <input type="text" placeholder="Search links" value={searchQuery} onChange={handleSearchChange} />
        <button onClick={clearSearch}>X</button>
        {msg && <p>{msg}</p>}
        {linkLoading ? (
          <Skeleton count={5} />
        ) : (
          <>
            <button
              onClick={() => {
                setSelectedFolderId(null);
                setShowFavorites(false);
                getAllLinks(currentPage, itemsPerPage);
              }}
            >
              Show All
            </button>
            {folders.map((folder) => (
              <button key={folder.id} onClick={() => handleFolderButtonClick(folder.id)}>
                {folder.name}
              </button>
            ))}
            <button onClick={handleShowFavorites}>⭐</button>
            <ul style={{ display: 'flex', width: '100vw', flexWrap: 'wrap' }}>
              {filterLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.url}>
                    <ul style={{ height: 'auto', width: '200px', overflow: 'hidden', marginBottom: '20px', textOverflow: 'ellipsis' }}>
                      <b>{highlightText(link.title, searchQuery)}</b>
                      <p>{highlightText(link.url, searchQuery)}</p>
                      {!link.createdAt ? '😥' : highlightText(link.createdAt, searchQuery)}
                    </ul>
                  </Link>
                  {link.favorite && <span>⭐</span>}
                  <button onClick={() => handleDeleteLink(link.id, Number(link.folderId))}>Delete</button>
                  <button onClick={() => handleSetFavoriteLink(link.id, link.favorite)}>{link.favorite ? 'Unfavorite' : 'Favorite'}</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <Pagination currentPage={currentPage} totalPages={Math.ceil(links.length / itemsPerPage)} onPageChange={handlePageChange} />
      <Footer />
    </div>
  );
}
