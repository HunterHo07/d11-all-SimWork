'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import styles from './demo.module.css';

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState(null);
  const [playerPosition, setPlayerPosition] = useState(12); // Middle of the 5x5 grid
  const [stationReached, setStationReached] = useState(false);
  const [stationMessage, setStationMessage] = useState('');

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentStep !== 1) return; // Only handle keys in the navigation step

      switch (e.key) {
        case 'ArrowUp':
          movePlayer('up');
          break;
        case 'ArrowDown':
          movePlayer('down');
          break;
        case 'ArrowLeft':
          movePlayer('left');
          break;
        case 'ArrowRight':
          movePlayer('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, playerPosition]);

  // Move player in the grid
  const movePlayer = (direction) => {
    const gridSize = 5; // 5x5 grid
    let newPosition = playerPosition;

    switch (direction) {
      case 'up':
        if (playerPosition >= gridSize) {
          newPosition = playerPosition - gridSize;
        }
        break;
      case 'down':
        if (playerPosition < gridSize * (gridSize - 1)) {
          newPosition = playerPosition + gridSize;
        }
        break;
      case 'left':
        if (playerPosition % gridSize !== 0) {
          newPosition = playerPosition - 1;
        }
        break;
      case 'right':
        if ((playerPosition + 1) % gridSize !== 0) {
          newPosition = playerPosition + 1;
        }
        break;
    }

    setPlayerPosition(newPosition);

    // Check if player reached a workstation
    const workstations = {
      5: { role: 'dev', message: 'You reached the Developer workstation! Press Next to continue.' },
      9: { role: 'design', message: 'You reached the Designer workstation! Press Next to continue.' },
      15: { role: 'pm', message: 'You reached the Project Manager workstation! Press Next to continue.' },
      19: { role: 'ai', message: 'You reached the AI Engineer workstation! Press Next to continue.' }
    };

    if (workstations[newPosition]) {
      const station = workstations[newPosition];
      if (selectedRole === station.role) {
        setStationReached(true);
        setStationMessage(station.message);
      } else {
        setStationMessage(`This is the ${station.role === 'dev' ? 'Developer' :
                          station.role === 'design' ? 'Designer' :
                          station.role === 'pm' ? 'Project Manager' :
                          'AI Engineer'} workstation. Find your selected role's workstation.`);
        setTimeout(() => setStationMessage(''), 3000);
      }
    } else {
      setStationReached(false);
      setStationMessage('');
    }
  };

  const roles = [
    { id: 'dev', name: 'Developer', icon: '💻', description: 'Code, debug, and optimize software solutions' },
    { id: 'design', name: 'Designer', icon: '🎨', description: 'Create visual assets and user interfaces' },
    { id: 'pm', name: 'Project Manager', icon: '📊', description: 'Coordinate teams and manage project timelines' },
    { id: 'data', name: 'Data Entry', icon: '📝', description: 'Process and validate information accurately' },
    { id: 'ai', name: 'AI Engineer', icon: '🤖', description: 'Build and optimize machine learning models' }
  ];

  const steps = [
    {
      title: 'Select Your Role',
      description: 'Choose the career path you want to explore',
      component: (
        <div className={styles.roleSelection}>
          {roles.map(role => (
            <motion.div
              key={role.id}
              className={`${styles.roleCard} ${selectedRole === role.id ? styles.selected : ''}`}
              onClick={() => setSelectedRole(role.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={styles.roleIcon}>{role.icon}</div>
              <h3>{role.name}</h3>
              <p>{role.description}</p>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: 'Enter the Simulation',
      description: 'Navigate to your workstation in the virtual office',
      component: (
        <div className={styles.simulationStep}>
          <div className={styles.simulationVisual}>
            <div className={styles.officeMap}>
              <div className={styles.mapGrid}>
                {Array(25).fill().map((_, i) => (
                  <div
                    key={i}
                    className={`${styles.mapCell} ${i === playerPosition ? styles.playerCell : ''} ${[5, 9, 15, 19].includes(i) ? styles.stationCell : ''}`}
                  >
                    {i === playerPosition && <div className={styles.player}>👤</div>}
                    {i === 5 && <div className={styles.station}>💻</div>}
                    {i === 9 && <div className={styles.station}>🎨</div>}
                    {i === 15 && <div className={styles.station}>📊</div>}
                    {i === 19 && <div className={styles.station}>🤖</div>}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.controls}>
              <p>Use arrow keys to navigate to your workstation</p>
              <div className={styles.arrowKeys}>
                <button
                  className={styles.arrowUp}
                  onClick={() => movePlayer('up')}
                  aria-label="Move up"
                >↑</button>
                <button
                  className={styles.arrowLeft}
                  onClick={() => movePlayer('left')}
                  aria-label="Move left"
                >←</button>
                <button
                  className={styles.arrowDown}
                  onClick={() => movePlayer('down')}
                  aria-label="Move down"
                >↓</button>
                <button
                  className={styles.arrowRight}
                  onClick={() => movePlayer('right')}
                  aria-label="Move right"
                >→</button>
              </div>

              {stationMessage && (
                <div className={`${styles.stationMessage} ${stationReached ? styles.successMessage : ''}`}>
                  {stationMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Complete Your Tasks',
      description: 'Tackle realistic workplace challenges',
      component: (
        <div className={styles.tasksStep}>
          <div className={styles.taskInterface}>
            <div className={styles.taskHeader}>
              <h3>Current Task: Debug the Authentication Function</h3>
              <div className={styles.taskTimer}>Time Remaining: 15:00</div>
            </div>
            <div className={styles.taskContent}>
              <div className={styles.codeEditor}>
                <div className={styles.editorHeader}>
                  <span>auth.js</span>
                </div>
                <pre className={styles.codeBlock}>
{`function authenticateUser(username, password) {
  // Bug: Function always returns true regardless of input
  return true;

  // Expected behavior:
  // 1. Check if username exists in database
  // 2. Verify password hash matches stored hash
  // 3. Return authentication result
}`}
                </pre>
              </div>
              <div className={styles.taskInstructions}>
                <h4>Instructions:</h4>
                <ol>
                  <li>Identify the bug in the authentication function</li>
                  <li>Implement proper authentication logic</li>
                  <li>Test your solution with the provided test cases</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Review Your Performance',
      description: 'Get detailed feedback and analytics',
      component: (
        <div className={styles.performanceStep}>
          <div className={styles.performanceCard}>
            <div className={styles.performanceHeader}>
              <h3>Task Performance Analysis</h3>
            </div>
            <div className={styles.performanceMetrics}>
              <div className={styles.metricItem}>
                <div className={styles.metricLabel}>Accuracy</div>
                <div className={styles.metricValue}>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '85%' }}></div>
                  </div>
                  <span>85%</span>
                </div>
              </div>
              <div className={styles.metricItem}>
                <div className={styles.metricLabel}>Efficiency</div>
                <div className={styles.metricValue}>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '72%' }}></div>
                  </div>
                  <span>72%</span>
                </div>
              </div>
              <div className={styles.metricItem}>
                <div className={styles.metricLabel}>Problem Solving</div>
                <div className={styles.metricValue}>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '90%' }}></div>
                  </div>
                  <span>90%</span>
                </div>
              </div>
              <div className={styles.metricItem}>
                <div className={styles.metricLabel}>Time Management</div>
                <div className={styles.metricValue}>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '68%' }}></div>
                  </div>
                  <span>68%</span>
                </div>
              </div>
            </div>
            <div className={styles.feedbackSection}>
              <h4>Personalized Feedback:</h4>
              <p>You demonstrated strong problem-solving skills by quickly identifying the authentication bug. Consider optimizing your solution for better time efficiency. Your code was well-structured but could benefit from additional error handling.</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <Navbar />

      <main className={styles.demoMain}>
        <div className={styles.demoContainer}>
          <h1 className={styles.demoTitle}>SimWork Demo</h1>

          <div className={styles.stepsProgress}>
            {steps.map((step, index) => (
              <div
                key={index}
                className={`${styles.stepIndicator} ${index === currentStep ? styles.active : ''} ${index < currentStep ? styles.completed : ''}`}
                onClick={() => setCurrentStep(index)}
              >
                <div className={styles.stepNumber}>{index + 1}</div>
                <div className={styles.stepLabel}>{step.title}</div>
              </div>
            ))}
          </div>

          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>{steps[currentStep].title}</h2>
            <p className={styles.stepDescription}>{steps[currentStep].description}</p>

            <div className={styles.stepComponent}>
              {steps[currentStep].component}
            </div>

            <div className={styles.stepNavigation}>
              <button
                className={styles.prevButton}
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Previous
              </button>

              <button
                className={styles.nextButton}
                onClick={nextStep}
                disabled={
                  currentStep === steps.length - 1 ||
                  (currentStep === 0 && !selectedRole) ||
                  (currentStep === 1 && !stationReached)
                }
              >
                {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
