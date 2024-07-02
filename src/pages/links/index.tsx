import React, { useState, useEffect } from 'react';
import useFolders from '@/hooks/useFolders';
import useLinks from '@/hooks/useLinks';
import useSort from '@/hooks/useSort';
import Gnb from '@/components/Gnb';
import Footer from '@/components/Footer';
import { FolderProps } from '@/types';

const Page: React.FC = () => {
  const { folders, message: folderMessage, loading: folderLoading, handleAddFolder, handleUpdateFolder, handleDeleteFolder } = useFolders();
  const { links, message: linkMessage, loading: linkLoading, addLink, deleteLink, updateLink, setFavoriteLink } = useLinks();
  const { data: sortedFolders, setData: setFolderData, sortAscending, sortDescending } = useSort<FolderProps>(folders, 'id');
  const [folderName, setFolderName] = useState<string>('');
  const [msg, setMessage] = useState<string>(folderMessage);
  const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
  const [editingFolderName, setEditingFolderName] = useState<string>('');
  const [newLinkUrl, setNewLinkUrl] = useState<string>('');
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  useEffect(() => {
    setFolderData(folders);
  }, [folders, setFolderData]);

  useEffect(() => {
    setMessage(folderMessage);
  }, [folderMessage]);

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

  const filteredLinks = selectedFolderId ? links.filter((link) => link.folderId === selectedFolderId) : links;

  return (
    <div>
      <Gnb isLogin />
      <div style={{ height: '500px' }}>
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
        <button onClick={() => setSelectedFolderId(null)}>Show All</button>
        <ul>
          {filteredLinks.map((link) => (
            <li key={link.id}>
              <b>{link.url}</b> {link.favorite && <span>⭐</span>}
              <button onClick={() => updateLink(link.id, { ...link, url: 'Updated URL' })}>Update</button>
              <button onClick={() => deleteLink(link.id)}>Delete</button>
              <button onClick={() => setFavoriteLink(link.id)}>Favorite</button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
