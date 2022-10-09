import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import styles from '@/styles/Home.module.css';

const MainScene = dynamic(() => import('@/components/MainScene'), {
  ssr: false,
});
import HamburgerMenu from '@/components/HamburgerMenu';

const CursorCircle = dynamic(() => import('@/components/CursorCircle'), {
  ssr: false,
});

export default function Home() {
  return (
    <div
      className={`${styles.container} align-center flex min-h-screen flex-col justify-center`}
    >
      <Head>
        <title>prototype</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HamburgerMenu />
      <main className={`${styles.main} flex flex-grow flex-col`}>
        <MainScene />
      </main>

      <footer
        className={`${styles.footer} align-center flex h-[50px] w-full items-center justify-center bg-black px-[40px] uppercase text-white`}
      >
        <span>Powered by passion</span>
      </footer>
      <CursorCircle />
    </div>
  );
}
