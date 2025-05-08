'use client';

// This class will be used with Phaser imported dynamically
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.player = null;
    this.cursors = null;
    this.stations = [];
    this.npcs = [];
    this.activeQuest = null;
    this.questText = null;

    // Define colors
    this.colors = {
      primary: 0x6E00FF,
      secondary: 0x00BFFF,
      accent: 0x00FF88,
      dark: 0x0A0A1A,
      light: 0xE0E0FF
    };
  }

  preload() {
    // We won't load any external assets, we'll create everything programmatically
  }

  create() {
    try {
      // Initialize arrays
      this.stations = [];
      this.npcs = [];

      // Create a futuristic office background
      this.createBackground();

      // Create player
      this.createPlayer();

      // Set up collisions now that player exists
      this.setupCollisions();

      // Set up camera to follow player
      this.cameras.main.startFollow(this.player, true, 0.5, 0.5);

      // Set up input
      this.cursors = this.input.keyboard.createCursorKeys();

      // Create animations
      this.createAnimations();

      // Create work stations
      this.createWorkStations();

      // Create NPCs
      this.createNPCs();

      // Create UI
      this.createUI();

      // Generate initial quest
      this.generateQuest();

      // Add instructions text
      this.add.text(400, 50, 'Use arrow keys to move', {
        font: '16px Arial',
        fill: '#ffffff',
        align: 'center'
      }).setOrigin(0.5).setScrollFactor(0);

      this.add.text(400, 80, 'Press SPACE to interact with stations', {
        font: '16px Arial',
        fill: '#ffffff',
        align: 'center'
      }).setOrigin(0.5).setScrollFactor(0);
    } catch (error) {
      console.error("Error in create method:", error);

      // Fallback to a very simple scene if everything fails
      this.add.text(400, 300, 'SimWork Office Simulation', {
        font: '24px Arial',
        fill: '#ffffff',
        align: 'center'
      }).setOrigin(0.5);

      this.add.text(400, 350, 'Use arrow keys to navigate (demo mode)', {
        font: '16px Arial',
        fill: '#ffffff',
        align: 'center'
      }).setOrigin(0.5);
    }
  }

  createBackground() {
    try {
      // Create a dark background
      this.add.rectangle(0, 0, 1600, 1200, this.colors.dark).setOrigin(0, 0);

      // Create a grid pattern for the floor
      for (let x = 0; x < 1600; x += 50) {
        for (let y = 0; y < 1200; y += 50) {
          this.add.line(0, 0, x, 0, x, 1200, this.colors.primary, 0.1).setOrigin(0, 0);
          this.add.line(0, 0, 0, y, 1600, y, this.colors.primary, 0.1).setOrigin(0, 0);
        }
      }

      // Add some decorative elements
      for (let i = 0; i < 20; i++) {
        const x = Phaser.Math.Between(100, 1500);
        const y = Phaser.Math.Between(100, 1100);
        const size = Phaser.Math.Between(5, 15);

        // Create a glowing circle
        const circle = this.add.circle(x, y, size, this.colors.accent, 0.3);

        // Add a pulsing animation
        this.tweens.add({
          targets: circle,
          alpha: 0.1,
          scale: 0.8,
          duration: Phaser.Math.Between(1500, 3000),
          yoyo: true,
          repeat: -1
        });
      }

      // Create wall objects but don't set up collisions yet
      // We'll set up collisions after the player is created
      this.createWallObjects();
    } catch (error) {
      console.error("Error creating background:", error);
    }
  }

  createWallObjects() {
    try {
      // Office boundaries
      this.walls = this.physics.add.staticGroup();

      // Outer walls
      this.walls.add(this.add.rectangle(0, 0, 1600, 20, this.colors.primary, 0.5).setOrigin(0, 0));
      this.walls.add(this.add.rectangle(0, 0, 20, 1200, this.colors.primary, 0.5).setOrigin(0, 0));
      this.walls.add(this.add.rectangle(1580, 0, 20, 1200, this.colors.primary, 0.5).setOrigin(0, 0));
      this.walls.add(this.add.rectangle(0, 1180, 1600, 20, this.colors.primary, 0.5).setOrigin(0, 0));

      // Inner partitions
      this.walls.add(this.add.rectangle(400, 300, 200, 10, this.colors.secondary, 0.5).setOrigin(0, 0));
      this.walls.add(this.add.rectangle(800, 500, 10, 200, this.colors.secondary, 0.5).setOrigin(0, 0));
      this.walls.add(this.add.rectangle(300, 700, 300, 10, this.colors.secondary, 0.5).setOrigin(0, 0));
      this.walls.add(this.add.rectangle(1000, 300, 10, 300, this.colors.secondary, 0.5).setOrigin(0, 0));
    } catch (error) {
      console.error("Error creating wall objects:", error);
    }
  }

  setupCollisions() {
    try {
      if (this.player && this.walls) {
        // Set up collision with the player
        this.physics.add.collider(this.player, this.walls);
      }
    } catch (error) {
      console.error("Error setting up collisions:", error);
    }
  }

  createPlayer() {
    try {
      // Create a player sprite using graphics
      const playerGraphics = this.make.graphics({ x: 0, y: 0 });

      // Draw player shape
      playerGraphics.fillStyle(this.colors.secondary, 1);
      playerGraphics.fillCircle(16, 16, 14);
      playerGraphics.fillStyle(this.colors.light, 1);
      playerGraphics.fillCircle(16, 16, 8);
      playerGraphics.fillStyle(this.colors.accent, 1);
      playerGraphics.fillCircle(16, 16, 4);

      // Generate texture from graphics
      playerGraphics.generateTexture('player', 32, 32);

      // Create the player sprite
      this.player = this.physics.add.sprite(400, 300, 'player');
      this.player.setCollideWorldBounds(true);

      // Add a glow effect
      const glowFx = this.player.preFX.addGlow(this.colors.secondary, 8, 0, false, 0.1, 16);

      // Animate the glow
      this.tweens.add({
        targets: glowFx,
        outerStrength: 1,
        yoyo: true,
        repeat: -1,
        duration: 1500
      });
    } catch (error) {
      console.error("Error creating player:", error);

      // Create a simple fallback player if the fancy one fails
      this.player = this.physics.add.sprite(400, 300, 'player');
      if (!this.textures.exists('player')) {
        // Create a very simple texture if even that fails
        const simpleGraphics = this.make.graphics({ x: 0, y: 0 });
        simpleGraphics.fillStyle(0x00AAFF, 1);
        simpleGraphics.fillCircle(16, 16, 16);
        simpleGraphics.generateTexture('simple-player', 32, 32);

        this.player.setTexture('simple-player');
      }
      this.player.setCollideWorldBounds(true);
    }
  }

  update() {
    // Handle player movement
    this.handlePlayerMovement();

    // Check for station interactions
    this.checkStationInteractions();

    // Update NPCs
    this.updateNPCs();
  }

  createAnimations() {
    try {
      // Create a simple animation for the player using tints instead of frames
      this.time.addEvent({
        delay: 500,
        callback: () => {
          if (this.player) {
            // Toggle between normal and slightly brighter tint
            const currentTint = this.player.tintTopLeft;
            if (currentTint === 0xffffff) {
              this.player.setTint(0xaaaaff);
            } else {
              this.player.setTint(0xffffff);
            }
          }
        },
        callbackScope: this,
        loop: true
      });
    } catch (error) {
      console.error("Error creating animations:", error);
    }
  }

  createWorkStations() {
    try {
      // Define station positions and types
      const stationData = [
        { x: 200, y: 150, type: 'dev', color: this.colors.primary, name: 'Developer Station', icon: '💻' },
        { x: 600, y: 150, type: 'design', color: this.colors.secondary, name: 'Designer Station', icon: '🎨' },
        { x: 400, y: 400, type: 'pm', color: this.colors.accent, name: 'PM Station', icon: '📊' },
        { x: 200, y: 450, type: 'data', color: 0x00AAFF, name: 'Data Entry Station', icon: '📝' },
        { x: 600, y: 450, type: 'ai', color: 0xFF00AA, name: 'AI Engineer Station', icon: '🤖' }
      ];

      // Create stations
      stationData.forEach(station => {
        // Create a station texture
        const stationGraphics = this.make.graphics({ x: 0, y: 0 });

        // Draw station shape
        stationGraphics.fillStyle(station.color, 0.8);
        stationGraphics.fillRoundedRect(0, 0, 60, 60, 10);
        stationGraphics.lineStyle(2, 0xFFFFFF, 0.8);
        stationGraphics.strokeRoundedRect(0, 0, 60, 60, 10);

        // Add inner details
        stationGraphics.fillStyle(0xFFFFFF, 0.2);
        stationGraphics.fillRoundedRect(10, 10, 40, 40, 5);

        // Generate texture with a unique name
        const textureName = `station-${station.type}`;
        stationGraphics.generateTexture(textureName, 60, 60);

        // Create the station sprite
        const stationSprite = this.physics.add.sprite(station.x, station.y, textureName);
        stationSprite.setImmovable(true);
        stationSprite.stationType = station.type;
        stationSprite.stationName = station.name;

        // Add text label with icon
        const label = this.add.text(station.x, station.y + 40, `${station.icon} ${station.name}`, {
          font: '12px Arial',
          fill: '#ffffff',
          align: 'center'
        }).setOrigin(0.5);

        // Add a pulsing effect
        this.tweens.add({
          targets: stationSprite,
          scale: { from: 0.95, to: 1.05 },
          alpha: { from: 0.8, to: 1 },
          duration: 1500,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });

        // Add to stations array
        this.stations.push(stationSprite);

        // Add overlap detection if player exists
        if (this.player && this.player.body) {
          this.physics.add.overlap(this.player, stationSprite, this.handleStationInteraction, null, this);
        }
      });
    } catch (error) {
      console.error("Error creating work stations:", error);
    }
  }

  createNPCs() {
    try {
      // Define NPC positions and behaviors
      const npcData = [
        {
          x: 300,
          y: 200,
          color: 0xFF8800,
          icon: '👨‍💼',
          name: 'Manager',
          dialogue: 'Welcome to SimWork! Complete tasks to improve your skills.'
        },
        {
          x: 500,
          y: 300,
          color: 0x00CCFF,
          icon: '👩‍🏫',
          name: 'Mentor',
          dialogue: 'Each station offers different challenges. Try them all!'
        },
        {
          x: 250,
          y: 400,
          color: 0x44FF44,
          icon: '👨‍💻',
          name: 'Colleague',
          dialogue: 'The Developer Station has coding challenges. Good luck!'
        }
      ];

      // Create NPCs
      npcData.forEach((npc, index) => {
        // Create a unique NPC texture
        const npcGraphics = this.make.graphics({ x: 0, y: 0 });

        // Draw NPC shape (humanoid figure)
        npcGraphics.fillStyle(npc.color, 0.9);
        npcGraphics.fillCircle(16, 10, 8); // Head
        npcGraphics.fillRoundedRect(8, 18, 16, 20, 4); // Body

        // Generate texture with a unique name
        const textureName = `npc-${index}`;
        npcGraphics.generateTexture(textureName, 32, 40);

        // Create the NPC sprite
        const npcSprite = this.physics.add.sprite(npc.x, npc.y, textureName);
        npcSprite.setImmovable(true);
        npcSprite.name = npc.name;
        npcSprite.dialogue = npc.dialogue;

        // Add text label with icon
        const label = this.add.text(npc.x, npc.y - 30, `${npc.icon} ${npc.name}`, {
          font: '12px Arial',
          fill: '#ffffff',
          align: 'center'
        }).setOrigin(0.5);

        // Add a subtle movement animation
        this.tweens.add({
          targets: npcSprite,
          y: npc.y + 5,
          duration: 2000,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });

        // Add to NPCs array
        this.npcs.push(npcSprite);

        // Add overlap detection if player exists
        if (this.player && this.player.body) {
          this.physics.add.overlap(this.player, npcSprite, this.handleNPCInteraction, null, this);
        }

        // Add a speech bubble that appears occasionally
        this.time.addEvent({
          delay: 5000 + Math.random() * 5000,
          callback: () => {
            // Create speech bubble
            const bubble = this.add.graphics();
            bubble.fillStyle(0xFFFFFF, 0.7);
            bubble.fillRoundedRect(npc.x - 50, npc.y - 60, 100, 30, 10);

            // Add random emoji
            const emojis = ['💡', '💬', '🔍', '✨', '🚀'];
            const emoji = this.add.text(npc.x, npc.y - 45, emojis[Math.floor(Math.random() * emojis.length)], {
              font: '16px Arial',
              align: 'center'
            }).setOrigin(0.5);

            // Fade out after a short time
            this.tweens.add({
              targets: [bubble, emoji],
              alpha: 0,
              delay: 1500,
              duration: 500,
              onComplete: () => {
                bubble.destroy();
                emoji.destroy();
              }
            });
          },
          loop: true
        });
      });
    } catch (error) {
      console.error("Error creating NPCs:", error);
    }
  }

  createUI() {
    try {
      // Create a futuristic UI panel
      const uiContainer = this.add.container(400, 550);
      uiContainer.setScrollFactor(0);

      // Create quest panel background with gradient
      const questPanelBg = this.add.graphics();
      questPanelBg.fillGradientStyle(
        this.colors.primary, this.colors.primary,
        this.colors.secondary, this.colors.secondary,
        0.7, 0.7, 0.7, 0.7
      );
      questPanelBg.fillRoundedRect(-300, -25, 600, 50, 10);

      // Add glowing border
      const border = this.add.graphics();
      border.lineStyle(2, this.colors.accent, 1);
      border.strokeRoundedRect(-300, -25, 600, 50, 10);

      // Add decorative elements
      for (let i = 0; i < 3; i++) {
        const dot = this.add.circle(-280 + i * 15, -15, 3, this.colors.accent, 1);
        uiContainer.add(dot);
      }

      // Create quest label
      const questLabel = this.add.text(-270, -15, 'CURRENT MISSION:', {
        font: '12px Arial',
        fill: '#ffffff',
        align: 'left'
      }).setOrigin(0, 0.5);

      // Create quest text
      this.questText = this.add.text(-120, -15, 'No active quest', {
        font: '14px Arial',
        fill: '#ffffff',
        align: 'left'
      }).setOrigin(0, 0.5);

      // Add all elements to the container
      uiContainer.add([questPanelBg, border, questLabel, this.questText]);

      // Add a pulsing animation to the border
      this.tweens.add({
        targets: border,
        alpha: { from: 0.4, to: 1 },
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });

      // Add mini-map in the corner
      this.createMiniMap();
    } catch (error) {
      console.error("Error creating UI:", error);
    }
  }

  createMiniMap() {
    try {
      // Create mini-map container in the top-right corner
      const miniMapContainer = this.add.container(700, 100);
      miniMapContainer.setScrollFactor(0);

      // Create mini-map background
      const mapBg = this.add.graphics();
      mapBg.fillStyle(this.colors.dark, 0.7);
      mapBg.fillRoundedRect(-50, -50, 100, 100, 5);
      mapBg.lineStyle(1, this.colors.primary, 0.8);
      mapBg.strokeRoundedRect(-50, -50, 100, 100, 5);

      // Add to container
      miniMapContainer.add(mapBg);

      // Add station markers to mini-map
      this.stations.forEach(station => {
        // Calculate scaled position for mini-map
        const mapX = (station.x / 1600) * 80 - 40;
        const mapY = (station.y / 1200) * 80 - 40;

        // Create marker
        const marker = this.add.circle(mapX, mapY, 3, this.getColorForStationType(station.stationType), 1);
        miniMapContainer.add(marker);
      });

      // Add player marker that updates in real-time
      const playerMarker = this.add.circle(0, 0, 4, this.colors.accent, 1);
      miniMapContainer.add(playerMarker);

      // Update player marker position in the update loop
      this.events.on('update', () => {
        if (this.player) {
          playerMarker.x = (this.player.x / 1600) * 80 - 40;
          playerMarker.y = (this.player.y / 1200) * 80 - 40;
        }
      });

      // Add mini-map label
      const mapLabel = this.add.text(0, -65, 'MINI-MAP', {
        font: '10px Arial',
        fill: '#ffffff',
        align: 'center'
      }).setOrigin(0.5);
      miniMapContainer.add(mapLabel);
    } catch (error) {
      console.error("Error creating mini-map:", error);
    }
  }

  getColorForStationType(type) {
    const colorMap = {
      'dev': this.colors.primary,
      'design': this.colors.secondary,
      'pm': this.colors.accent,
      'data': 0x00AAFF,
      'ai': 0xFF00AA
    };

    return colorMap[type] || 0xFFFFFF;
  }

  handlePlayerMovement() {
    try {
      if (!this.player || !this.cursors) return;

      // Reset velocity
      this.player.setVelocity(0);

      // Movement speed
      const speed = 160;

      // Handle movement
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-speed);
        this.player.flipX = true;
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(speed);
        this.player.flipX = false;
      }

      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-speed);
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(speed);
      }

      // Add movement trail effect
      if (this.player.body.velocity.x !== 0 || this.player.body.velocity.y !== 0) {
        // Only create particles occasionally to avoid performance issues
        if (Math.random() < 0.3) {
          // Create a particle at the player's position
          const particle = this.add.circle(
            this.player.x,
            this.player.y,
            3,
            this.colors.accent,
            0.7
          );

          // Fade out and remove the particle
          this.tweens.add({
            targets: particle,
            alpha: 0,
            scale: 0.5,
            duration: 500,
            onComplete: () => {
              particle.destroy();
            }
          });
        }

        // Rotate the player slightly based on movement direction
        if (this.player.body.velocity.x !== 0) {
          const targetRotation = this.player.body.velocity.x > 0 ? 0.1 : -0.1;
          this.player.rotation = Phaser.Math.Linear(this.player.rotation, targetRotation, 0.1);
        } else {
          this.player.rotation = Phaser.Math.Linear(this.player.rotation, 0, 0.1);
        }
      } else {
        // Reset rotation when not moving
        this.player.rotation = Phaser.Math.Linear(this.player.rotation, 0, 0.1);
      }
    } catch (error) {
      console.error("Error handling player movement:", error);
    }
  }

  checkStationInteractions() {
    // This is handled by the overlap callbacks
  }

  updateNPCs() {
    try {
      // Simple NPC behavior - look at player when nearby
      this.npcs.forEach(npc => {
        // Calculate distance to player
        if (this.player) {
          const distance = Phaser.Math.Distance.Between(
            npc.x, npc.y,
            this.player.x, this.player.y
          );

          // If player is nearby, have NPC look at player
          if (distance < 150) {
            // Determine if player is to the left or right of NPC
            const isPlayerToLeft = this.player.x < npc.x;

            // Flip NPC to face player
            npc.flipX = isPlayerToLeft;

            // Add a subtle "notice" effect if very close
            if (distance < 80 && Math.random() < 0.01) {
              // Create an exclamation mark above NPC
              const notice = this.add.text(npc.x, npc.y - 40, '!', {
                font: 'bold 24px Arial',
                fill: '#FFFF00'
              }).setOrigin(0.5);

              // Animate and remove
              this.tweens.add({
                targets: notice,
                y: notice.y - 20,
                alpha: { from: 1, to: 0 },
                duration: 800,
                onComplete: () => notice.destroy()
              });
            }
          }
        }
      });
    } catch (error) {
      console.error("Error updating NPCs:", error);
    }
  }

  handleStationInteraction(player, station) {
    try {
      // Only trigger if spacebar is pressed
      if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))) {
        console.log(`Interacting with ${station.stationName}`);

        // Generate a station-specific quest
        this.generateQuestForStation(station.stationType);

        // Show interaction UI
        this.showStationInterface(station.stationType);

        // Visual feedback for interaction
        this.createInteractionEffect(station.x, station.y, this.getColorForStationType(station.stationType));
      }
    } catch (error) {
      console.error("Error handling station interaction:", error);
    }
  }

  handleNPCInteraction(player, npc) {
    try {
      // Only trigger if spacebar is pressed
      if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))) {
        console.log(`Talking to ${npc.name}: ${npc.dialogue}`);

        // Show dialogue
        this.showDialogue(npc.name, npc.dialogue);

        // Visual feedback for interaction
        this.createInteractionEffect(npc.x, npc.y, 0xFFFFFF);
      }
    } catch (error) {
      console.error("Error handling NPC interaction:", error);
    }
  }

  createInteractionEffect(x, y, color) {
    try {
      // Create expanding circle effect
      const circle = this.add.circle(x, y, 10, color, 0.7);

      // Animate the circle
      this.tweens.add({
        targets: circle,
        radius: 50,
        alpha: 0,
        duration: 500,
        onComplete: () => circle.destroy()
      });

      // Add particles
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const particleX = x + Math.cos(angle) * 20;
        const particleY = y + Math.sin(angle) * 20;

        const particle = this.add.circle(particleX, particleY, 3, color, 0.8);

        this.tweens.add({
          targets: particle,
          x: particleX + Math.cos(angle) * 30,
          y: particleY + Math.sin(angle) * 30,
          alpha: 0,
          duration: 500,
          onComplete: () => particle.destroy()
        });
      }
    } catch (error) {
      console.error("Error creating interaction effect:", error);
    }
  }

  generateQuest() {
    // Simple random quest generation
    const questTypes = [
      'Fix the bug in the code',
      'Design a new logo',
      'Create a project timeline',
      'Process the data entries',
      'Optimize the AI model'
    ];

    this.activeQuest = questTypes[Math.floor(Math.random() * questTypes.length)];
    this.questText.setText(`Current Quest: ${this.activeQuest}`);
  }

  generateQuestForStation(stationType) {
    // Station-specific quests
    const questsByType = {
      dev: [
        'Debug the function that calculates user metrics',
        'Implement a new feature for the dashboard',
        'Optimize the database query performance'
      ],
      design: [
        'Create a new icon set for the mobile app',
        'Redesign the landing page for better conversion',
        'Develop a color scheme for the new product'
      ],
      pm: [
        'Create a sprint plan for the next two weeks',
        'Prioritize the backlog items',
        'Conduct a retrospective meeting'
      ],
      data: [
        'Clean and normalize the customer dataset',
        'Enter the quarterly sales figures',
        'Validate the product inventory data'
      ],
      ai: [
        'Train a sentiment analysis model',
        'Debug the recommendation algorithm',
        'Optimize the natural language processing pipeline'
      ]
    };

    const quests = questsByType[stationType] || ['Complete a general task'];
    this.activeQuest = quests[Math.floor(Math.random() * quests.length)];
    this.questText.setText(`Current Quest: ${this.activeQuest}`);
  }

  showStationInterface(stationType) {
    try {
      // Create a station interface overlay
      const overlay = this.add.rectangle(400, 300, 600, 400, 0x000000, 0.7);
      overlay.setScrollFactor(0);

      // Add border
      const border = this.add.graphics();
      border.lineStyle(2, this.getColorForStationType(stationType), 1);
      border.strokeRect(100, 100, 600, 400);
      border.setScrollFactor(0);

      // Add title
      const title = this.add.text(400, 130, `${stationType.toUpperCase()} STATION`, {
        font: 'bold 24px Arial',
        fill: '#ffffff'
      });
      title.setOrigin(0.5);
      title.setScrollFactor(0);

      // Add description
      const descriptions = {
        'dev': 'Complete coding challenges and debug software issues.',
        'design': 'Create visual assets and improve user interfaces.',
        'pm': 'Manage project timelines and coordinate team efforts.',
        'data': 'Process and analyze important data sets.',
        'ai': 'Develop and optimize machine learning models.'
      };

      const description = this.add.text(400, 170, descriptions[stationType] || 'Complete tasks at this station.', {
        font: '16px Arial',
        fill: '#ffffff',
        align: 'center',
        wordWrap: { width: 500 }
      });
      description.setOrigin(0.5);
      description.setScrollFactor(0);

      // Add close button
      const closeButton = this.add.rectangle(650, 130, 30, 30, 0xFF0000, 0.8);
      closeButton.setScrollFactor(0);
      closeButton.setInteractive({ useHandCursor: true });

      const closeText = this.add.text(650, 130, 'X', {
        font: 'bold 16px Arial',
        fill: '#ffffff'
      });
      closeText.setOrigin(0.5);
      closeText.setScrollFactor(0);

      // Add all elements to a container for easy removal
      const container = this.add.container(0, 0, [overlay, border, title, description, closeButton, closeText]);
      container.setScrollFactor(0);

      // Close button functionality
      closeButton.on('pointerdown', () => {
        container.destroy();
      });

      // Auto-close after a delay
      this.time.delayedCall(5000, () => {
        container.destroy();
      });
    } catch (error) {
      console.error("Error showing station interface:", error);
    }
  }

  showDialogue(name, text) {
    try {
      // Create a dialogue box at the bottom of the screen
      const dialogueBox = this.add.rectangle(400, 500, 700, 120, 0x000000, 0.8);
      dialogueBox.setScrollFactor(0);

      // Add border
      const border = this.add.graphics();
      border.lineStyle(2, 0xFFFFFF, 0.8);
      border.strokeRoundedRect(50, 440, 700, 120, 10);
      border.setScrollFactor(0);

      // Add name label
      const nameLabel = this.add.rectangle(120, 440, 140, 30, 0x6E00FF, 1);
      nameLabel.setScrollFactor(0);

      const nameText = this.add.text(120, 440, name, {
        font: 'bold 16px Arial',
        fill: '#ffffff'
      });
      nameText.setOrigin(0.5);
      nameText.setScrollFactor(0);

      // Add dialogue text
      const dialogueText = this.add.text(400, 500, '', {
        font: '18px Arial',
        fill: '#ffffff',
        align: 'left',
        wordWrap: { width: 650 }
      });
      dialogueText.setOrigin(0.5);
      dialogueText.setScrollFactor(0);

      // Typewriter effect
      let currentText = '';
      const fullText = text;
      let charIndex = 0;

      const typewriterEvent = this.time.addEvent({
        delay: 30,
        callback: () => {
          currentText += fullText[charIndex];
          dialogueText.setText(currentText);
          charIndex++;

          if (charIndex === fullText.length) {
            typewriterEvent.destroy();
          }
        },
        repeat: fullText.length - 1
      });

      // Add all elements to a container for easy removal
      const container = this.add.container(0, 0, [dialogueBox, border, nameLabel, nameText, dialogueText]);
      container.setScrollFactor(0);

      // Close after a delay
      this.time.delayedCall(6000, () => {
        container.destroy();
      });

      // Click to close early
      this.input.on('pointerdown', () => {
        if (container.active) {
          // If still typing, complete immediately
          if (charIndex < fullText.length) {
            typewriterEvent.destroy();
            dialogueText.setText(fullText);
            charIndex = fullText.length;
          } else {
            // If done typing, close the dialogue
            container.destroy();
          }
        }
      }, this);
    } catch (error) {
      console.error("Error showing dialogue:", error);
    }
  }
}
