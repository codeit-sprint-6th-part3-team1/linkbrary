import React, { useState, useEffect } from 'react';
import useFolders, { FolderProps } from '@/hooks/useFolders';
import useSort from '@/hooks/useSort';

const Page: React.FC = () => {
  const { folders, message, loading, handleAddFolder, handleUpdateFolder, handleDeleteFolder } = useFolders();
  const { data: sortedFolders, setData, sortAscending, sortDescending } = useSort<FolderProps>(folders, 'id');
  const [folderName, setFolderName] = useState<string>('');
  const [msg, setMessage] = useState<string>(message);
  const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
  const [editingFolderName, setEditingFolderName] = useState<string>('');

  useEffect(() => {
    setData(folders);
  }, [folders, setData]);

  useEffect(() => {
    setMessage(message);
  }, [message]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setFolderName(name);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setEditingFolderName(name);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await handleAddFolder(folderName);
  };

  const handleEditSubmit = async (event: React.FormEvent, folderId: number) => {
    event.preventDefault();
    await handleUpdateFolder(folderId, editingFolderName);
    setEditingFolderId(null); // Exit edit mode
  };

  return (
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
      {loading && <p>Loading...</p>}
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
  );
};

export default Page;
