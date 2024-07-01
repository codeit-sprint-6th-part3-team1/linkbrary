import { useState, useCallback } from 'react';

interface UseSortResult<T> {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  sortAscending: () => void;
  sortDescending: () => void;
}

const useSort = <T>(initialData: T[], key: keyof T): UseSortResult<T> => {
  const [data, setData] = useState<T[]>(initialData);

  const sortAscending = useCallback(() => {
    setData((prevData) =>
      [...prevData].sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        if (aValue instanceof Date && bValue instanceof Date) {
          return aValue.getTime() - bValue.getTime();
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return aValue - bValue;
        }

        return aValue > bValue ? 1 : -1;
      }),
    );
  }, [key]);

  const sortDescending = useCallback(() => {
    setData((prevData) =>
      [...prevData].sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        if (aValue instanceof Date && bValue instanceof Date) {
          return bValue.getTime() - aValue.getTime();
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return bValue - aValue;
        }

        return aValue < bValue ? 1 : -1;
      }),
    );
  }, [key]);

  return { data, setData, sortAscending, sortDescending };
};

export default useSort;
