'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import styles from './landing.module.css';

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    employees: '',
    interests: []
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          interests: [...prev.interests, value]
        };
      } else {
        return {
          ...prev,
          interests: prev.interests.filter(interest => interest !== value)
        };
      }
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // In a real app, you would send this data to your backend
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      setSubmitted(true);
      
      // Store in localStorage for demo purposes
      localStorage.setItem('simwork_signup', JSON.stringify({
        ...formData,
        signupDate: new Date().toISOString()
      }));
    }, 1000);
  };
  
  // Benefits data
  const benefits = [
    {
      title: "Early Access",
      description: "Be among the first to experience the future of work simulation",
      icon: "🔑"
    },
    {
      title: "50% Discount",
      description: "Exclusive pricing for early adopters - lock in for life",
      icon: "💰"
    },
    {
      title: "Priority Support",
      description: "Direct line to our product team for feedback and assistance",
      icon: "⭐"
    },
    {
      title: "Custom Scenarios",
      description: "Work with our team to create tailored simulations for your needs",
      icon: "🛠️"
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <>
      <Navbar />
      
      <main className={styles.landingMain}>
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <motion.h1 
                className={styles.heroTitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Join the Future of Work Revolution
              </motion.h1>
              
              <motion.p 
                className={styles.heroSubtitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Sign up now for early access and exclusive benefits
              </motion.p>
              
              <motion.div 
                className={styles.heroCta}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <a href="#signup" className={styles.ctaButton}>
                  Get Early Access
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              className={styles.heroVisual}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className={styles.visualContainer}>
                <div className={styles.glowingSphere}></div>
                <div className={styles.orbitalRing}></div>
                <div className={styles.orbitalRing} style={{ animationDelay: '-2s', transform: 'rotate(60deg)' }}></div>
                <div className={styles.orbitalRing} style={{ animationDelay: '-4s', transform: 'rotate(120deg)' }}></div>
                <div className={styles.floatingIcon} style={{ top: '20%', left: '20%' }}>💻</div>
                <div className={styles.floatingIcon} style={{ top: '70%', left: '30%' }}>🎨</div>
                <div className={styles.floatingIcon} style={{ top: '30%', left: '80%' }}>📊</div>
                <div className={styles.floatingIcon} style={{ top: '60%', left: '70%' }}>🤖</div>
              </div>
            </motion.div>
          </div>
        </section>
        
        <section className={styles.benefitsSection}>
          <div className={styles.container}>
            <motion.h2 
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Early Adopter Benefits
            </motion.h2>
            
            <motion.div 
              className={styles.benefitsGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index} 
                  className={styles.benefitCard}
                  variants={itemVariants}
                >
                  <div className={styles.benefitIcon}>{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        <section id="signup" className={styles.signupSection}>
          <div className={styles.container}>
            <div className={styles.signupContent}>
              <motion.div 
                className={styles.signupInfo}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2>Reserve Your Spot</h2>
                <p>SimWork is currently in private beta. Sign up now to secure your place in our early access program and receive exclusive benefits when we launch.</p>
                
                <div className={styles.timelineContainer}>
                  <div className={styles.timeline}>
                    <div className={styles.timelineItem}>
                      <div className={styles.timelinePoint}></div>
                      <div className={styles.timelineContent}>
                        <h4>Private Beta</h4>
                        <p>Q2 2023</p>
                      </div>
                    </div>
                    
                    <div className={styles.timelineItem}>
                      <div className={styles.timelinePoint}></div>
                      <div className={styles.timelineContent}>
                        <h4>Early Access</h4>
                        <p>Q3 2023</p>
                      </div>
                    </div>
                    
                    <div className={styles.timelineItem}>
                      <div className={styles.timelinePoint}></div>
                      <div className={styles.timelineContent}>
                        <h4>Public Launch</h4>
                        <p>Q4 2023</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.signupForm}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {!submitted ? (
                  <form onSubmit={handleSubmit}>
                    <h3>Sign Up for Early Access</h3>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="company">Company Name</label>
                      <input 
                        type="text" 
                        id="company" 
                        name="company" 
                        value={formData.company} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="role">Your Role</label>
                        <select 
                          id="role" 
                          name="role" 
                          value={formData.role} 
                          onChange={handleChange} 
                          required
                        >
                          <option value="">Select...</option>
                          <option value="hr">HR / Talent Acquisition</option>
                          <option value="training">Training & Development</option>
                          <option value="executive">Executive Leadership</option>
                          <option value="manager">Department Manager</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label htmlFor="employees">Company Size</label>
                        <select 
                          id="employees" 
                          name="employees" 
                          value={formData.employees} 
                          onChange={handleChange} 
                          required
                        >
                          <option value="">Select...</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501+">501+ employees</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>I'm interested in: (select all that apply)</label>
                      <div className={styles.checkboxGroup}>
                        <label className={styles.checkbox}>
                          <input 
                            type="checkbox" 
                            name="interests" 
                            value="hiring" 
                            checked={formData.interests.includes('hiring')}
                            onChange={handleCheckboxChange} 
                          />
                          <span>Hiring & Assessment</span>
                        </label>
                        
                        <label className={styles.checkbox}>
                          <input 
                            type="checkbox" 
                            name="interests" 
                            value="training" 
                            checked={formData.interests.includes('training')}
                            onChange={handleCheckboxChange} 
                          />
                          <span>Employee Training</span>
                        </label>
                        
                        <label className={styles.checkbox}>
                          <input 
                            type="checkbox" 
                            name="interests" 
                            value="onboarding" 
                            checked={formData.interests.includes('onboarding')}
                            onChange={handleCheckboxChange} 
                          />
                          <span>Onboarding</span>
                        </label>
                        
                        <label className={styles.checkbox}>
                          <input 
                            type="checkbox" 
                            name="interests" 
                            value="skills" 
                            checked={formData.interests.includes('skills')}
                            onChange={handleCheckboxChange} 
                          />
                          <span>Skills Development</span>
                        </label>
                      </div>
                    </div>
                    
                    <button type="submit" className={styles.submitButton}>
                      Reserve My Spot
                    </button>
                    
                    <p className={styles.formDisclaimer}>
                      By signing up, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </form>
                ) : (
                  <div className={styles.successMessage}>
                    <div className={styles.successIcon}>✓</div>
                    <h3>Thank You!</h3>
                    <p>Your early access request has been received. We'll be in touch soon with next steps.</p>
                    <p className={styles.successDetails}>
                      <strong>Name:</strong> {formData.name}<br />
                      <strong>Email:</strong> {formData.email}<br />
                      <strong>Company:</strong> {formData.company}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
