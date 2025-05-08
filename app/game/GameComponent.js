'use client';

import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import GameScene from './GameScene';
import styles from './GameComponent.module.css';

export default function GameComponent() {
  const gameRef = useRef(null);
  const gameContainerRef = useRef(null);
  
  useEffect(() => {
    if (!gameContainerRef.current) return;
    
    // Configuration for Phaser game
    const config = {
      type: Phaser.AUTO,
      parent: gameContainerRef.current,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: [GameScene],
      pixelArt: true,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    };
    
    // Initialize the game
    const game = new Phaser.Game(config);
    gameRef.current = game;
    
    // Cleanup function
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);
  
  return (
    <div className={styles.gameContainer} ref={gameContainerRef}>
      <div className={styles.gameOverlay}>
        <h2 className={styles.gameTitle}>SimWork Office</h2>
        <p className={styles.gameInstructions}>
          Use arrow keys to move. Press SPACE to interact with stations and NPCs.
        </p>
      </div>
    </div>
  );
}
