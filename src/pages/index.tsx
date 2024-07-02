import React from 'react';
import AddLink from '@/components/AddLink';
import SearchBar from '@/components/SearchBar';
import InputBox from '@/components/InputBox';

const style = {
  margin: '200px',
};

export default function Home() {
  return (
    <>
      <AddLink />
      <SearchBar />
      <InputBox />
    </>
  );
}
