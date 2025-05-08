'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logoContainer}>
          <motion.div 
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="40" height="40" viewBox="0 0 200 60" className={styles.logoSvg}>
              <use href="/images/logo.svg#logo" />
            </svg>
            <span className={styles.logoText}>SimWork</span>
          </motion.div>
        </Link>
        
        <motion.div 
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className={`${styles.menuBar} ${isOpen ? styles.open : ''}`}></div>
          <div className={`${styles.menuBar} ${isOpen ? styles.open : ''}`}></div>
          <div className={`${styles.menuBar} ${isOpen ? styles.open : ''}`}></div>
        </motion.div>
        
        <motion.div 
          className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}
          variants={navVariants}
        >
          <motion.div variants={itemVariants}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/demo" className={styles.navLink}>
              Demo
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/pitch-deck" className={styles.navLink}>
              Pitch Deck
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/why-us" className={styles.navLink}>
              Why Us
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/landing" className={styles.navLink}>
              <motion.button 
                className={styles.signUpButton}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 255, 136, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up Now
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
