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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await handleAddFolder(folderName);
    setFolderName('');
  };

  const handleEditSubmit = async (event: React.FormEvent, folderId: number) => {
    event.preventDefault();
    await handleUpdateFolder(folderId, editingFolderName);
    setEditingFolderId(null);
  };

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
          <label>생성일자 기준 오름차순</label>
          <button onClick={sortAscending}>오름차순</button>
        </div>
        <div>
          <label>생성일자 기준 내림차순</label>
          <button onClick={sortDescending}>내림차순</button>
        </div>
      </div>
      <div>
        <h1>Links</h1>
        <ul>
          {links
            // .filter((link) => link.folderId === folder.id)
            .map((link) => (
              <li key={link.id}>
                <b>{link.description}</b> ({link.url})
                <button onClick={() => updateLink(link.id, { ...link, description: 'Updated Description' })}>Update</button>
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
