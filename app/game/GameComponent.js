'use client';

import { useEffect, useRef } from 'react';
import styles from './GameComponent.module.css';

// We'll import GameScene and Phaser inside useEffect to ensure it only runs on client

export default function GameComponent() {
  const gameRef = useRef(null);
  const gameContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !gameContainerRef.current) return;

    // Dynamically import Phaser and GameScene
    const initGame = async () => {
      try {
        // Import Phaser and GameScene only on client side
        const Phaser = (await import('phaser')).default;
        const { default: GameScene } = await import('./GameScene');

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
          },
          // Disable banner to reduce console output
          banner: false
        };

        // Initialize the game
        const game = new Phaser.Game(config);
        gameRef.current = game;
      } catch (error) {
        console.error("Error initializing game:", error);

        // Show error message in the game container
        if (gameContainerRef.current) {
          gameContainerRef.current.innerHTML = `
            <div style="color: white; text-align: center; padding: 20px;">
              <h3>Could not load simulation</h3>
              <p>Please try refreshing the page</p>
            </div>
          `;
        }
      }
    };

    // Initialize the game
    initGame();

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
