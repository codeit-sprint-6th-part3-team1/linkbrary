import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import useFolders from '@/hooks/useFolders';
import useLinks from '@/hooks/useLinks';
import useSort from '@/hooks/useSort';
import Gnb from '@/components/Gnb';
import Footer from '@/components/Footer';
import { FolderProps, LinkProps } from '@/types';
import Link from 'next/link';
import useUsers from '@/hooks/useUsers';
import { usePathname, useSearchParams } from 'next/navigation';
import Pagination from '@/components/Pagination';
const Page: React.FC = (props: any) => {
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
  const pathname: number = Number(usePathname());

  const itemsPerPage = 3;

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
      getAllLinks(Number(id), itemsPerPage);
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
    }
  };

  const handleEditSubmit = async (event: React.FormEvent, folderId: number) => {
    event.preventDefault();
    await handleUpdateFolder(folderId, editingFolderName);
    setEditingFolderId(null);
  };

  const handleSetFavoriteLink = (linkId: number, favorite: boolean) => {
    setFavoriteLink(linkId, favorite);
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
    } else {
      const lowercasedSearchQuery = searchQuery.toLowerCase();
      return links.filter((link: LinkProps) => {
        const matchesSearchQuery =
          link.url.toLowerCase().includes(lowercasedSearchQuery) ||
          link.title.toLowerCase().includes(lowercasedSearchQuery) ||
          link.description.toLowerCase().includes(lowercasedSearchQuery);
        return matchesSearchQuery;
      });
    }
  }, [links, searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    getAllLinks(pathname, itemsPerPage);
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
        {folderLoading && <p>Loading...</p>}
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
                  <b>{folder.name}</b> {folder.createdAt}
                  <button
                    onClick={() => {
                      setEditingFolderId(folder.id);
                      setEditingFolderName(folder.name);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteFolder(folder.id)}>X</button>
                </>
              )}
            </li>
          ))}
        </ul>
        <h1>Folder sorting test</h1>
        <div>
          <label>Sort by creation date (Ascending)</label>
          <button onClick={sortAscending}>Ascending</button>
        </div>
        <div>
          <label>Sort by creation date (Descending)</label>
          <button onClick={sortDescending}>Descending</button>
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
        {linkLoading && <p>Loading...</p>}
        <button
          onClick={() => {
            setSelectedFolderId(null);
            setShowFavorites(false);
            getAllLinks(pathname, itemsPerPage);
          }}
        >
          Show All
        </button>
        {folders.map((folder) => (
          <button key={folder.id} onClick={() => handleFolderButtonClick(folder.id)}>
            {folder.name}
          </button>
        ))}
        <button onClick={handleShowFavorites}>{'⭐'}</button>
        <ul style={{ display: 'flex', width: '100vw', flexWrap: 'wrap' }}>
          {filterLinks.map((link) => (
            <li key={link.id}>
              <Link href={link.url}>
                <ul style={{ height: 'auto', width: '200px', overflow: 'hidden', marginBottom: '20px', textOverflow: 'ellipsis' }}>
                  <b>{highlightText(link.title, searchQuery)}</b>
                  {highlightText(link.url, searchQuery)}
                </ul>
              </Link>
              {link.favorite && <span>⭐</span>}
              <button onClick={() => updateLink(link.id, { url: 'Updated URL' })}>Update</button>
              <button onClick={() => deleteLink(link.id)}>Delete</button>
              <button onClick={() => handleSetFavoriteLink(link.id, link.favorite)}>{!link.favorite ? 'Unfavorite' : 'Favorite'}</button>
            </li>
          ))}
        </ul>
      </div>
      <Pagination currentPage={Number(id)} totalPages={Math.ceil(links.length / itemsPerPage)} onPageChange={handlePageChange} />
      <Footer />
    </div>
  );
};

export default Page;
