'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from '../page.module.css';

// Create a simple loading component
const LoadingComponent = () => (
  <div className={styles.gameLoading}>
    <div className={styles.loadingText}>Loading simulation...</div>
    <div className={styles.loadingSpinner}></div>
  </div>
);

// Dynamically import the GameComponent with SSR disabled and no suspense
const GameComponent = dynamic(
  () => import('../game/GameComponent'),
  {
    ssr: false,
    loading: LoadingComponent
  }
);

export default function GameWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoadingComponent />;
  }

  return <GameComponent />;
}
