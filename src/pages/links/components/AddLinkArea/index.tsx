import { useState } from 'react';
import type { AxiosError } from 'axios';
import { queryClient } from '@/pages/_app';
import { folderListState } from '@/recoil';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useRecoilState } from 'recoil';

import type { FolderItemListProps, FolderProps } from '@/types';

import { addLink } from '@/libs/linkService';

import useForm from '@/hooks/useForm';
import useModal from '@/hooks/useModal';

import AddLinkForm from '@/components/AddLinkForm';
import Modal from '@/components/Modal';

const AddLinkArea = () => {
  const [folders] = useRecoilState(folderListState);
  const { formValues, handleChange, handleSubmit, resetForm } = useForm({
    initialValues: { url: '' },
    callback: handleFormSubmit,
  });
  const { isOpen, openModal, closeModal, modalContent } = useModal();
  const [isToggled, setIsToggled] = useState(false);

  const createCardLink = useMutation({
    mutationFn: ({ url, folderId }: { url: string; folderId: number }) => addLink(url, folderId),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['links'] });
      }, 1000);
      resetForm();
      setIsToggled(false);
      closeModal();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || 'An unknown error occurred';
    },
  });

  function handleFormSubmit() {
    openModal(<FolderSelection folders={folders} onSelect={handleApiSelect} />, 'Select a Folder', 'Choose the folder to save the URL.');
  }

  const handleApiSelect = (selectedFolderId: number) => {
    createCardLink.mutate({ url: formValues.url, folderId: selectedFolderId });
  };

  return (
    <div>
      <AddLinkForm url={formValues.url} onUrlChange={handleChange} handleAddLink={handleSubmit} />
      <Modal isOpen={isOpen} onClose={closeModal} title={modalContent.title} subTitle={modalContent.subTitle}>
        {modalContent.content}
      </Modal>
      {/* {createCardLink.isPending && <Spinner />} */}
    </div>
  );
};

export default AddLinkArea;

const FolderSelection = ({ folders, onSelect }: { folders: FolderProps[]; onSelect: any }) => {
  return (
    <div>
      <h3>Select a Folder</h3>
      <ul>
        {folders.map((folder) => (
          <li key={folder.id}>
            <button onClick={() => onSelect(folder.id)}>{folder.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
