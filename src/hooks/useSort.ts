import { useState, useCallback } from 'react';

interface UseSortResult<T> {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  sortAscending: () => void;
  sortDescending: () => void;
}

const useSort = <T>(initialData: T[], key: keyof T): UseSortResult<T> => {
  const [data, setData] = useState<T[]>(initialData);

  const compareValues = (a: T, b: T, order: 'asc' | 'desc') => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue instanceof Date && bValue instanceof Date) {
      return order === 'asc' ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime();
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return order === 'asc' ? (aValue > bValue ? 1 : -1) : aValue < bValue ? 1 : -1;
  };

  const sortData = useCallback(
    (order: 'asc' | 'desc') => {
      setData((prevData) => [...prevData].sort((a, b) => compareValues(a, b, order)));
    },
    [key],
  );

  const sortAscending = useCallback(() => sortData('asc'), [sortData]);
  const sortDescending = useCallback(() => sortData('desc'), [sortData]);

  return { data, setData, sortAscending, sortDescending };
};

export default useSort;
