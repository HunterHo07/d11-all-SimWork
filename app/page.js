import dynamic from 'next/dynamic';
import styles from './page.module.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Dynamically import the GameComponent with SSR disabled
const GameComponent = dynamic(() => import('./game/GameComponent'), {
  ssr: false,
  loading: () => <div className={styles.gameLoading}>Loading simulation...</div>
});

// Features component
const Features = () => (
  <section className={styles.featuresSection}>
    <h2 className={styles.sectionTitle}>Experience the Future of Work</h2>

    <div className={styles.featuresGrid}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>🧠</div>
        <h3>AI-Powered Adaptivity</h3>
        <p>Dynamic challenges that evolve based on your performance and learning curve</p>
      </div>

      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>🎮</div>
        <h3>Immersive Environment</h3>
        <p>Navigate a futuristic workspace with interactive stations and realistic scenarios</p>
      </div>

      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>📊</div>
        <h3>Real-Time Analytics</h3>
        <p>Comprehensive performance tracking with actionable insights and feedback</p>
      </div>

      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>🔄</div>
        <h3>Multi-Role Training</h3>
        <p>Experience different career paths from development to design to project management</p>
      </div>
    </div>
  </section>
);

// How It Works component
const HowItWorks = () => (
  <section className={styles.howItWorksSection}>
    <h2 className={styles.sectionTitle}>How SimWork Transforms Training</h2>

    <div className={styles.stepsContainer}>
      <div className={styles.step}>
        <div className={styles.stepNumber}>01</div>
        <h3>Select Your Role</h3>
        <p>Choose from Developer, Designer, PM, Data Entry, or AI Engineer paths</p>
      </div>

      <div className={styles.stepDivider}></div>

      <div className={styles.step}>
        <div className={styles.stepNumber}>02</div>
        <h3>Complete Quests</h3>
        <p>Tackle realistic, adaptive challenges that mirror actual workplace tasks</p>
      </div>

      <div className={styles.stepDivider}></div>

      <div className={styles.step}>
        <div className={styles.stepNumber}>03</div>
        <h3>Receive Feedback</h3>
        <p>Get personalized insights on your performance and areas for improvement</p>
      </div>

      <div className={styles.stepDivider}></div>

      <div className={styles.step}>
        <div className={styles.stepNumber}>04</div>
        <h3>Track Progress</h3>
        <p>Monitor your skill development with comprehensive analytics</p>
      </div>
    </div>
  </section>
);

// Footer component
const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.footerLogo}>
        <svg width="40" height="40" viewBox="0 0 200 60">
          <use href="/images/logo.svg#logo" />
        </svg>
        <span>SimWork</span>
      </div>

      <div className={styles.footerLinks}>
        <div className={styles.footerLinkGroup}>
          <h4>Platform</h4>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Enterprise</a>
        </div>

        <div className={styles.footerLinkGroup}>
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
        </div>

        <div className={styles.footerLinkGroup}>
          <h4>Resources</h4>
          <a href="#">Blog</a>
          <a href="#">Documentation</a>
          <a href="#">Support</a>
        </div>
      </div>
    </div>

    <div className={styles.footerBottom}>
      <p>&copy; 2023 SimWork. All rights reserved.</p>
      <div className={styles.footerBottomLinks}>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <Hero />

        <div className={styles.container}>
          <Features />

          <section className={styles.gameSection}>
            <h2 className={styles.sectionTitle}>Try the Simulation</h2>
            <p className={styles.sectionSubtitle}>Experience our interactive office environment</p>

            <GameComponent />
          </section>

          <HowItWorks />
        </div>
      </main>

      <Footer />
    </>
  );
}
