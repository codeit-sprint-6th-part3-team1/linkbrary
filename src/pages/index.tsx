import Modal from '@/components/Modal';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(!open);
        }}
        title="asd"
        subTitle="asd"
      />
      <button
        onClick={() => {
          setOpen(!open);
        }}
      >
        Open Modal
      </button>
      <h1>Hello, world!</h1>
      <p>This is a Next.js app with TypeScript, ESLint, Prettier, and SCSS.</p>
    </>
  );
}
