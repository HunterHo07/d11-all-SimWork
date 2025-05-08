'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar';
import styles from './pitch-deck.module.css';

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoAdvance, setIsAutoAdvance] = useState(false);
  const [autoAdvanceInterval, setAutoAdvanceInterval] = useState(5000); // 5 seconds
  const timerRef = useRef(null);

  // Auto-advance slides
  useEffect(() => {
    if (isAutoAdvance) {
      timerRef.current = setInterval(() => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1);
        } else {
          // Loop back to the first slide
          setCurrentSlide(0);
        }
      }, autoAdvanceInterval);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isAutoAdvance, currentSlide, autoAdvanceInterval]);

  const slides = [
    {
      title: "SimWork",
      subtitle: "The Future of Work Simulation",
      content: (
        <div className={styles.introSlide}>
          <div className={styles.logoContainer}>
            <svg width="120" height="120" viewBox="0 0 200 60" className={styles.logo}>
              <use href="/images/logo.svg#logo" />
            </svg>
          </div>
          <p className={styles.tagline}>Revolutionizing hiring and training through immersive simulation</p>
        </div>
      )
    },
    {
      title: "The Problem",
      subtitle: "Current Training & Hiring is Broken",
      content: (
        <div className={styles.problemSlide}>
          <div className={styles.problemGrid}>
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>💸</div>
              <h3>Wrong Hires, Wasted Money</h3>
              <p>Companies keep hiring the wrong people—time, salary, and training costs wasted</p>
            </div>

            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>🎭</div>
              <h3>Fake Skills, No Real Test</h3>
              <p>Many hires pass interviews but fail on the job with no hands-on task validation</p>
            </div>

            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>⏱️</div>
              <h3>Slow, Inefficient Process</h3>
              <p>Too many rounds, test sheets, and guesswork with no real output</p>
            </div>

            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>📉</div>
              <h3>No KPI or Proof of Skill</h3>
              <p>Current systems don't track real performance or provide actionable metrics</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Our Solution",
      subtitle: "Immersive Work Simulation Platform",
      content: (
        <div className={styles.solutionSlide}>
          <div className={styles.solutionVisual}>
            <div className={styles.solutionImage}>
              <div className={styles.simulationPreview}>
                <div className={styles.previewOffice}>
                  <div className={styles.officeStation} style={{ top: '20%', left: '30%' }}>💻</div>
                  <div className={styles.officeStation} style={{ top: '60%', left: '20%' }}>📊</div>
                  <div className={styles.officeStation} style={{ top: '30%', left: '70%' }}>🎨</div>
                  <div className={styles.officeStation} style={{ top: '70%', left: '60%' }}>🤖</div>
                  <div className={styles.officeAvatar} style={{ top: '45%', left: '45%' }}>👤</div>
                </div>
              </div>
            </div>
            <div className={styles.solutionPoints}>
              <div className={styles.solutionPoint}>
                <h3>Immersive, Multi-Role Game World</h3>
                <p>3D office with stations for Developer, Designer, PM, Data Entry, and AI Engineer roles</p>
              </div>

              <div className={styles.solutionPoint}>
                <h3>AI-Powered Adaptivity</h3>
                <p>Integrated GPT-based agents guide scenarios and dynamically adjust task complexity</p>
              </div>

              <div className={styles.solutionPoint}>
                <h3>Real-Time Analytics</h3>
                <p>Dashboard tracks KPIs (accuracy, speed, decision quality) with personalized feedback</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Market Opportunity",
      subtitle: "$367.6B Global Corporate Training Market",
      content: (
        <div className={styles.marketSlide}>
          <div className={styles.marketStats}>
            <div className={styles.marketStat}>
              <div className={styles.statValue}>$367.6B</div>
              <div className={styles.statLabel}>Global Corporate Training Market (2022)</div>
            </div>

            <div className={styles.marketStat}>
              <div className={styles.statValue}>9.4%</div>
              <div className={styles.statLabel}>Expected CAGR (2023-2030)</div>
            </div>

            <div className={styles.marketStat}>
              <div className={styles.statValue}>$16.2B</div>
              <div className={styles.statLabel}>Simulation Learning Market (2022)</div>
            </div>

            <div className={styles.marketStat}>
              <div className={styles.statValue}>15.8%</div>
              <div className={styles.statLabel}>Simulation Market CAGR (2023-2030)</div>
            </div>
          </div>

          <div className={styles.competitiveAdvantage}>
            <h3>Competitive Advantage</h3>
            <ul className={styles.advantageList}>
              <li>Multi-role simulation in one platform vs. single-role competitors</li>
              <li>Real-world task integration vs. theoretical training</li>
              <li>AI-driven adaptivity vs. static content</li>
              <li>Immersive 3D/2.5D environment vs. flat interfaces</li>
              <li>Comprehensive analytics vs. basic completion metrics</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Business Model",
      subtitle: "Subscription-Based SaaS Platform",
      content: (
        <div className={styles.businessSlide}>
          <div className={styles.pricingTiers}>
            <div className={styles.pricingCard}>
              <div className={styles.pricingHeader}>
                <h3>Individual</h3>
                <div className={styles.price}>$49<span>/month</span></div>
              </div>
              <ul className={styles.pricingFeatures}>
                <li>Access to all simulation environments</li>
                <li>Personal performance analytics</li>
                <li>Skill development tracking</li>
                <li>10 hours of simulation time per month</li>
                <li>Basic AI-generated feedback</li>
              </ul>
              <div className={styles.pricingCta}>
                <button className={styles.pricingButton}>Get Started</button>
              </div>
            </div>

            <div className={`${styles.pricingCard} ${styles.featured}`}>
              <div className={styles.pricingHeader}>
                <h3>Business</h3>
                <div className={styles.price}>$99<span>/user/month</span></div>
              </div>
              <ul className={styles.pricingFeatures}>
                <li>Team management dashboard</li>
                <li>Unlimited simulation time</li>
                <li>Advanced analytics and reporting</li>
                <li>Custom task creation</li>
                <li>Priority support</li>
                <li>Candidate assessment tools</li>
              </ul>
              <div className={styles.pricingCta}>
                <button className={styles.pricingButton}>Contact Sales</button>
              </div>
            </div>

            <div className={styles.pricingCard}>
              <div className={styles.pricingHeader}>
                <h3>Enterprise</h3>
                <div className={styles.price}>Custom</div>
              </div>
              <ul className={styles.pricingFeatures}>
                <li>Custom simulation environments</li>
                <li>White-labeling options</li>
                <li>API integration with HRIS</li>
                <li>Dedicated account manager</li>
                <li>Custom analytics integration</li>
                <li>Volume discounts</li>
              </ul>
              <div className={styles.pricingCta}>
                <button className={styles.pricingButton}>Request Demo</button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Roadmap",
      subtitle: "Phased Development Approach",
      content: (
        <div className={styles.roadmapSlide}>
          <div className={styles.roadmapTimeline}>
            <div className={styles.roadmapPhase}>
              <div className={styles.phaseHeader}>
                <div className={styles.phaseIcon}>🧩</div>
                <h3>Phase 1 (MVP)</h3>
                <div className={styles.phaseTime}>Q2 2023</div>
              </div>
              <ul className={styles.phaseFeatures}>
                <li>Web-based 2.5D simulation game</li>
                <li>Basic role stations and quests</li>
                <li>Simple analytics dashboard</li>
                <li>Local storage for user progress</li>
              </ul>
            </div>

            <div className={styles.roadmapPhase}>
              <div className={styles.phaseHeader}>
                <div className={styles.phaseIcon}>🚀</div>
                <h3>Phase 2</h3>
                <div className={styles.phaseTime}>Q4 2023</div>
              </div>
              <ul className={styles.phaseFeatures}>
                <li>Desktop/mobile apps</li>
                <li>Expanded role scenarios</li>
                <li>Enhanced analytics with visualization</li>
                <li>Team management features</li>
              </ul>
            </div>

            <div className={styles.roadmapPhase}>
              <div className={styles.phaseHeader}>
                <div className={styles.phaseIcon}>🔮</div>
                <h3>Phase 3</h3>
                <div className={styles.phaseTime}>Q2 2024</div>
              </div>
              <ul className={styles.phaseFeatures}>
                <li>VR/AR integration</li>
                <li>Multiplayer enterprise modules</li>
                <li>Advanced AI agents for realistic NPCs</li>
                <li>Enterprise API integrations</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Team",
      subtitle: "Experienced Founders & Advisors",
      content: (
        <div className={styles.teamSlide}>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.memberAvatar}>👨‍💻</div>
              <h3>Alex Chen</h3>
              <p className={styles.memberRole}>CEO & Co-Founder</p>
              <p className={styles.memberBio}>Former Head of Product at EdTech unicorn. 10+ years in simulation software.</p>
            </div>

            <div className={styles.teamMember}>
              <div className={styles.memberAvatar}>👩‍💻</div>
              <h3>Sarah Johnson</h3>
              <p className={styles.memberRole}>CTO & Co-Founder</p>
              <p className={styles.memberBio}>Ex-Google AI researcher. PhD in Computer Science with focus on adaptive learning.</p>
            </div>

            <div className={styles.teamMember}>
              <div className={styles.memberAvatar}>👨‍🎨</div>
              <h3>Michael Wong</h3>
              <p className={styles.memberRole}>Chief Design Officer</p>
              <p className={styles.memberBio}>Former Lead Designer at major gaming studio. Expert in UX/UI for immersive experiences.</p>
            </div>

            <div className={styles.teamMember}>
              <div className={styles.memberAvatar}>👩‍🔬</div>
              <h3>Priya Patel</h3>
              <p className={styles.memberRole}>Head of AI</p>
              <p className={styles.memberBio}>AI researcher with specialization in adaptive learning systems and natural language processing.</p>
            </div>
          </div>

          <div className={styles.advisors}>
            <h3>Advisors</h3>
            <div className={styles.advisorList}>
              <div className={styles.advisor}>
                <span className={styles.advisorName}>Dr. James Wilson</span> - Former VP of Learning at LinkedIn
              </div>
              <div className={styles.advisor}>
                <span className={styles.advisorName}>Maria Rodriguez</span> - Partner at Future Ventures
              </div>
              <div className={styles.advisor}>
                <span className={styles.advisorName}>David Kim</span> - CHRO at Fortune 500 Tech Company
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Future Plans",
      subtitle: "Expanding the SimWork Platform",
      content: (
        <div className={styles.futurePlansSlide}>
          <div className={styles.futurePlansGrid}>
            <div className={styles.futurePlanCard}>
              <div className={styles.planIcon}>🥽</div>
              <h3>VR/AR Integration</h3>
              <p>Immersive virtual reality experiences that transport users into realistic work environments with haptic feedback and spatial interactions.</p>
              <ul className={styles.planFeatures}>
                <li>Full VR office environments</li>
                <li>AR overlays for real-world training</li>
                <li>Haptic feedback for physical tasks</li>
                <li>Spatial audio for realistic communication</li>
              </ul>
            </div>

            <div className={styles.futurePlanCard}>
              <div className={styles.planIcon}>👥</div>
              <h3>Multiplayer Collaboration</h3>
              <p>Real-time collaborative simulations where teams can work together on complex projects, mirroring actual workplace dynamics.</p>
              <ul className={styles.planFeatures}>
                <li>Real-time team collaboration</li>
                <li>Role-based permissions and tasks</li>
                <li>Communication tools integration</li>
                <li>Team performance analytics</li>
              </ul>
            </div>

            <div className={styles.futurePlanCard}>
              <div className={styles.planIcon}>🏢</div>
              <h3>Enterprise Modules</h3>
              <p>Customizable industry-specific simulation modules tailored to enterprise needs with advanced compliance and security features.</p>
              <ul className={styles.planFeatures}>
                <li>Industry-specific simulations</li>
                <li>Custom branding and environments</li>
                <li>Enterprise SSO integration</li>
                <li>Advanced security and compliance</li>
              </ul>
            </div>
          </div>

          <div className={styles.timelineSection}>
            <h3>Implementation Timeline</h3>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelinePoint}></div>
                <div className={styles.timelineContent}>
                  <h4>Q4 2023</h4>
                  <p>Begin VR prototype development</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelinePoint}></div>
                <div className={styles.timelineContent}>
                  <h4>Q2 2024</h4>
                  <p>Launch multiplayer beta</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelinePoint}></div>
                <div className={styles.timelineContent}>
                  <h4>Q4 2024</h4>
                  <p>Release first enterprise modules</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelinePoint}></div>
                <div className={styles.timelineContent}>
                  <h4>Q2 2025</h4>
                  <p>Full VR/AR integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Investment Opportunity",
      subtitle: "Seeking $5M Seed Round",
      content: (
        <div className={styles.investmentSlide}>
          <div className={styles.fundingDetails}>
            <div className={styles.fundingItem}>
              <h3>Funding Goal</h3>
              <div className={styles.fundingValue}>$5,000,000</div>
              <p>Seed Round</p>
            </div>

            <div className={styles.fundingItem}>
              <h3>Use of Funds</h3>
              <div className={styles.fundingAllocation}>
                <div className={styles.allocationItem}>
                  <div className={styles.allocationLabel}>Product Development</div>
                  <div className={styles.allocationBar}>
                    <div className={styles.allocationFill} style={{ width: '40%' }}></div>
                  </div>
                  <div className={styles.allocationValue}>40%</div>
                </div>

                <div className={styles.allocationItem}>
                  <div className={styles.allocationLabel}>Team Expansion</div>
                  <div className={styles.allocationBar}>
                    <div className={styles.allocationFill} style={{ width: '30%' }}></div>
                  </div>
                  <div className={styles.allocationValue}>30%</div>
                </div>

                <div className={styles.allocationItem}>
                  <div className={styles.allocationLabel}>Marketing & Sales</div>
                  <div className={styles.allocationBar}>
                    <div className={styles.allocationFill} style={{ width: '20%' }}></div>
                  </div>
                  <div className={styles.allocationValue}>20%</div>
                </div>

                <div className={styles.allocationItem}>
                  <div className={styles.allocationLabel}>Operations</div>
                  <div className={styles.allocationBar}>
                    <div className={styles.allocationFill} style={{ width: '10%' }}></div>
                  </div>
                  <div className={styles.allocationValue}>10%</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.projections}>
            <h3>Financial Projections</h3>
            <div className={styles.projectionChart}>
              <div className={styles.chartBars}>
                <div className={styles.chartYear}>
                  <div className={styles.yearLabel}>Year 1</div>
                  <div className={styles.barContainer}>
                    <div className={styles.revenueBar} style={{ height: '20%' }}></div>
                  </div>
                  <div className={styles.yearValue}>$1.2M</div>
                </div>

                <div className={styles.chartYear}>
                  <div className={styles.yearLabel}>Year 2</div>
                  <div className={styles.barContainer}>
                    <div className={styles.revenueBar} style={{ height: '40%' }}></div>
                  </div>
                  <div className={styles.yearValue}>$4.5M</div>
                </div>

                <div className={styles.chartYear}>
                  <div className={styles.yearLabel}>Year 3</div>
                  <div className={styles.barContainer}>
                    <div className={styles.revenueBar} style={{ height: '70%' }}></div>
                  </div>
                  <div className={styles.yearValue}>$12M</div>
                </div>

                <div className={styles.chartYear}>
                  <div className={styles.yearLabel}>Year 4</div>
                  <div className={styles.barContainer}>
                    <div className={styles.revenueBar} style={{ height: '100%' }}></div>
                  </div>
                  <div className={styles.yearValue}>$28M</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Contact Us",
      subtitle: "Join the Future of Work",
      content: (
        <div className={styles.contactSlide}>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>📧</div>
              <h3>Email</h3>
              <p>info@simwork.ai</p>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>🌐</div>
              <h3>Website</h3>
              <p>www.simwork.ai</p>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>📱</div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>

          <div className={styles.ctaSection}>
            <h3>Ready to transform your hiring and training?</h3>
            <div className={styles.ctaButtons}>
              <button className={styles.demoButton}>Request Demo</button>
              <button className={styles.contactButton}>Contact Sales</button>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <Navbar />

      <main className={styles.pitchDeckMain}>
        <div className={styles.slideControls}>
          <button
            className={styles.prevSlideButton}
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            ←
          </button>

          <div className={styles.slideIndicators}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.slideIndicator} ${index === currentSlide ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>

          <button
            className={styles.nextSlideButton}
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
          >
            →
          </button>

          <button
            className={`${styles.autoPlayButton} ${isAutoAdvance ? styles.active : ''}`}
            onClick={() => setIsAutoAdvance(!isAutoAdvance)}
            title={isAutoAdvance ? "Pause auto-advance" : "Start auto-advance"}
          >
            {isAutoAdvance ? "⏸" : "▶"}
          </button>
        </div>

        <div className={styles.slideContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={styles.slide}
            >
              <div className={styles.slideHeader}>
                <h1 className={styles.slideTitle}>{slides[currentSlide].title}</h1>
                <h2 className={styles.slideSubtitle}>{slides[currentSlide].subtitle}</h2>
              </div>

              <div className={styles.slideContent}>
                {slides[currentSlide].content}
              </div>

              <div className={styles.slideFooter}>
                <div className={styles.slideNumber}>
                  {currentSlide + 1} / {slides.length}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
