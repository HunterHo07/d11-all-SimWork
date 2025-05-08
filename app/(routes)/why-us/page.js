'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Navbar from '../../components/Navbar';
import styles from './why-us.module.css';

// Animated section component
const AnimatedSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.8, 
            ease: [0.17, 0.67, 0.83, 0.67],
            delay 
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// Comparison table component
const ComparisonTable = () => {
  return (
    <div className={styles.comparisonTableContainer}>
      <table className={styles.comparisonTable}>
        <thead>
          <tr>
            <th>Features</th>
            <th>SimWork</th>
            <th>Traditional Training</th>
            <th>Assessment Platforms</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Immersive Environment</td>
            <td className={styles.positive}>✓ Full 3D/2.5D Office</td>
            <td className={styles.negative}>✗ Flat Videos</td>
            <td className={styles.neutral}>~ Basic UI</td>
          </tr>
          <tr>
            <td>Real-world Tasks</td>
            <td className={styles.positive}>✓ Authentic Simulations</td>
            <td className={styles.neutral}>~ Theoretical Examples</td>
            <td className={styles.neutral}>~ Limited Scenarios</td>
          </tr>
          <tr>
            <td>Multi-role Training</td>
            <td className={styles.positive}>✓ 5+ Career Paths</td>
            <td className={styles.negative}>✗ Single Focus</td>
            <td className={styles.negative}>✗ Role-specific</td>
          </tr>
          <tr>
            <td>Adaptive Difficulty</td>
            <td className={styles.positive}>✓ AI-driven Personalization</td>
            <td className={styles.negative}>✗ Fixed Content</td>
            <td className={styles.neutral}>~ Basic Levels</td>
          </tr>
          <tr>
            <td>Performance Analytics</td>
            <td className={styles.positive}>✓ Comprehensive Dashboard</td>
            <td className={styles.negative}>✗ Completion Status Only</td>
            <td className={styles.neutral}>~ Basic Metrics</td>
          </tr>
          <tr>
            <td>Engagement Factor</td>
            <td className={styles.positive}>✓ Gamified Experience</td>
            <td className={styles.negative}>✗ Passive Learning</td>
            <td className={styles.neutral}>~ Quiz Format</td>
          </tr>
          <tr>
            <td>Skill Retention</td>
            <td className={styles.positive}>✓ Learning by Doing</td>
            <td className={styles.negative}>✗ Memorization</td>
            <td className={styles.neutral}>~ Practice Tests</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Testimonial component
const Testimonial = ({ quote, author, role, company, image, reverse = false }) => {
  return (
    <div className={`${styles.testimonial} ${reverse ? styles.reverse : ''}`}>
      <div className={styles.testimonialContent}>
        <div className={styles.quoteIcon}>"</div>
        <p className={styles.quote}>{quote}</p>
        <div className={styles.author}>
          <div className={styles.authorInfo}>
            <h4>{author}</h4>
            <p>{role}, {company}</p>
          </div>
        </div>
      </div>
      <div className={styles.testimonialImage}>
        <div className={styles.imageContainer}>
          <div className={styles.avatarPlaceholder}>{author.charAt(0)}</div>
        </div>
      </div>
    </div>
  );
};

// Pricing card component
const PricingCard = ({ tier, price, features, cta, popular = false }) => {
  return (
    <motion.div 
      className={`${styles.pricingCard} ${popular ? styles.popular : ''}`}
      whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)' }}
    >
      {popular && <div className={styles.popularBadge}>Most Popular</div>}
      <h3 className={styles.pricingTier}>{tier}</h3>
      <div className={styles.pricingAmount}>
        <span className={styles.currency}>$</span>
        <span className={styles.amount}>{price}</span>
        <span className={styles.period}>/month</span>
      </div>
      <ul className={styles.pricingFeatures}>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button className={styles.pricingCta}>{cta}</button>
    </motion.div>
  );
};

export default function WhyUsPage() {
  return (
    <>
      <Navbar />
      
      <main className={styles.whyUsMain}>
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>Why Choose SimWork?</h1>
            <p className={styles.heroSubtitle}>The future of work demands a future-ready training solution</p>
          </div>
        </section>
        
        <section className={styles.advantagesSection}>
          <div className={styles.container}>
            <AnimatedSection>
              <h2 className={styles.sectionTitle}>Our Competitive Edge</h2>
              <p className={styles.sectionSubtitle}>See how SimWork outperforms traditional training and assessment platforms</p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <ComparisonTable />
            </AnimatedSection>
          </div>
        </section>
        
        <section className={styles.benefitsSection}>
          <div className={styles.container}>
            <AnimatedSection>
              <h2 className={styles.sectionTitle}>Key Benefits</h2>
              <p className={styles.sectionSubtitle}>Transform your hiring and training processes</p>
            </AnimatedSection>
            
            <div className={styles.benefitsGrid}>
              <AnimatedSection delay={0.1}>
                <div className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>⚡</div>
                  <h3>Faster Onboarding</h3>
                  <p>Reduce training time by up to 60% with hands-on simulation that accelerates skill acquisition</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.2}>
                <div className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>💰</div>
                  <h3>Cost Reduction</h3>
                  <p>Cut training costs by 40% while improving outcomes through efficient, scalable virtual environments</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.3}>
                <div className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>🎯</div>
                  <h3>Better Hiring Decisions</h3>
                  <p>Reduce mis-hires by 75% with realistic pre-employment skill assessment</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.4}>
                <div className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>📊</div>
                  <h3>Data-Driven Insights</h3>
                  <p>Gain unprecedented visibility into candidate and employee capabilities with comprehensive analytics</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.5}>
                <div className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>🧠</div>
                  <h3>Higher Retention</h3>
                  <p>Improve knowledge retention by 80% through active learning and gamified experiences</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.6}>
                <div className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>🚀</div>
                  <h3>Accelerated Growth</h3>
                  <p>Enable employees to upskill faster with personalized learning paths and adaptive challenges</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
        
        <section className={styles.testimonialsSection}>
          <div className={styles.container}>
            <AnimatedSection>
              <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
              <p className={styles.sectionSubtitle}>Real results from real companies</p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <Testimonial 
                quote="SimWork has revolutionized our hiring process. We've reduced bad hires by 70% and cut onboarding time in half. The immersive environment gives candidates a real taste of the job before they start."
                author="Jennifer Chen"
                role="Head of Talent Acquisition"
                company="TechNova Inc."
              />
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <Testimonial 
                quote="The analytics dashboard is a game-changer. We can now identify skill gaps and tailor training programs with precision. Our team's productivity has increased by 35% since implementing SimWork."
                author="Marcus Johnson"
                role="Director of L&D"
                company="Global Finance Group"
                reverse={true}
              />
            </AnimatedSection>
            
            <AnimatedSection delay={0.4}>
              <Testimonial 
                quote="As someone who struggled with traditional training methods, SimWork's interactive approach was exactly what I needed. I learned more in two weeks than I did in months of video courses."
                author="Sophia Rodriguez"
                role="Junior Developer"
                company="Innovate Solutions"
              />
            </AnimatedSection>
          </div>
        </section>
        
        <section className={styles.pricingSection}>
          <div className={styles.container}>
            <AnimatedSection>
              <h2 className={styles.sectionTitle}>Transparent Pricing</h2>
              <p className={styles.sectionSubtitle}>Simple plans for teams of all sizes</p>
            </AnimatedSection>
            
            <div className={styles.pricingGrid}>
              <AnimatedSection delay={0.1}>
                <PricingCard 
                  tier="Starter"
                  price="49"
                  features={[
                    "Access for 1 user",
                    "10 hours of simulation time/month",
                    "Basic analytics dashboard",
                    "3 role simulations",
                    "Email support"
                  ]}
                  cta="Start Free Trial"
                />
              </AnimatedSection>
              
              <AnimatedSection delay={0.2}>
                <PricingCard 
                  tier="Professional"
                  price="99"
                  features={[
                    "Access for up to 10 users",
                    "Unlimited simulation time",
                    "Advanced analytics dashboard",
                    "All role simulations",
                    "Priority support",
                    "Custom scenarios"
                  ]}
                  cta="Start Free Trial"
                  popular={true}
                />
              </AnimatedSection>
              
              <AnimatedSection delay={0.3}>
                <PricingCard 
                  tier="Enterprise"
                  price="Custom"
                  features={[
                    "Unlimited users",
                    "Custom simulation environments",
                    "API integration with HRIS",
                    "Dedicated account manager",
                    "Custom analytics integration",
                    "White-labeling options"
                  ]}
                  cta="Contact Sales"
                />
              </AnimatedSection>
            </div>
          </div>
        </section>
        
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <AnimatedSection>
              <div className={styles.ctaCard}>
                <h2>Ready to Transform Your Workforce?</h2>
                <p>Join the companies already benefiting from the future of training and assessment</p>
                <div className={styles.ctaButtons}>
                  <button className={styles.primaryButton}>Start Free Trial</button>
                  <button className={styles.secondaryButton}>Schedule Demo</button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </>
  );
}
