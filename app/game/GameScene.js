'use client';

import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.player = null;
    this.cursors = null;
    this.stations = [];
    this.npcs = [];
    this.activeQuest = null;
    this.questText = null;
  }

  preload() {
    // Load tilemap assets
    this.load.image('tiles', '/game-assets/tileset.png');
    this.load.tilemapTiledJSON('map', '/game-assets/office-map.json');
    
    // Load character sprites
    this.load.spritesheet('player', '/game-assets/player.png', { 
      frameWidth: 32, 
      frameHeight: 48 
    });
    
    this.load.spritesheet('npcs', '/game-assets/npcs.png', { 
      frameWidth: 32, 
      frameHeight: 48 
    });
    
    // Load station icons
    this.load.image('dev-station', '/game-assets/dev-station.png');
    this.load.image('design-station', '/game-assets/design-station.png');
    this.load.image('pm-station', '/game-assets/pm-station.png');
    this.load.image('data-station', '/game-assets/data-station.png');
    this.load.image('ai-station', '/game-assets/ai-station.png');
    
    // Load UI elements
    this.load.image('quest-panel', '/game-assets/quest-panel.png');
  }

  create() {
    // Create tilemap
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('office-tileset', 'tiles');
    
    // Create layers
    const floorLayer = map.createLayer('Floor', tileset);
    const wallsLayer = map.createLayer('Walls', tileset);
    const furnitureLayer = map.createLayer('Furniture', tileset);
    
    // Set collision
    wallsLayer.setCollisionByProperty({ collides: true });
    furnitureLayer.setCollisionByProperty({ collides: true });
    
    // Create player
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setCollideWorldBounds(true);
    
    // Set up camera to follow player
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5);
    this.cameras.main.setZoom(1.5);
    
    // Add collision between player and walls/furniture
    this.physics.add.collider(this.player, wallsLayer);
    this.physics.add.collider(this.player, furnitureLayer);
    
    // Create animations
    this.createAnimations();
    
    // Set up input
    this.cursors = this.input.keyboard.createCursorKeys();
    
    // Create work stations
    this.createWorkStations();
    
    // Create NPCs
    this.createNPCs();
    
    // Create UI
    this.createUI();
    
    // Generate initial quest
    this.generateQuest();
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
    // Player animations
    this.anims.create({
      key: 'player-idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });
    
    this.anims.create({
      key: 'player-walk-down',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: 'player-walk-up',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: 'player-walk-left',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: 'player-walk-right',
      frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1
    });
    
    // NPC animations
    this.anims.create({
      key: 'npc-idle',
      frames: this.anims.generateFrameNumbers('npcs', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });
  }
  
  createWorkStations() {
    // Define station positions and types
    const stationData = [
      { x: 200, y: 150, type: 'dev', image: 'dev-station', name: 'Developer Station' },
      { x: 600, y: 150, type: 'design', image: 'design-station', name: 'Designer Station' },
      { x: 400, y: 400, type: 'pm', image: 'pm-station', name: 'PM Station' },
      { x: 200, y: 450, type: 'data', image: 'data-station', name: 'Data Entry Station' },
      { x: 600, y: 450, type: 'ai', image: 'ai-station', name: 'AI Engineer Station' }
    ];
    
    // Create stations
    stationData.forEach(station => {
      const stationSprite = this.physics.add.sprite(station.x, station.y, station.image);
      stationSprite.setScale(0.5);
      stationSprite.setImmovable(true);
      stationSprite.stationType = station.type;
      stationSprite.stationName = station.name;
      
      // Add to stations array
      this.stations.push(stationSprite);
      
      // Add overlap detection
      this.physics.add.overlap(this.player, stationSprite, this.handleStationInteraction, null, this);
    });
  }
  
  createNPCs() {
    // Define NPC positions and behaviors
    const npcData = [
      { x: 300, y: 200, frame: 0, name: 'Manager', dialogue: 'Welcome to SimWork! Complete tasks to improve your skills.' },
      { x: 500, y: 300, frame: 4, name: 'Mentor', dialogue: 'Each station offers different challenges. Try them all!' },
      { x: 250, y: 400, frame: 8, name: 'Colleague', dialogue: 'The Developer Station has coding challenges. Good luck!' }
    ];
    
    // Create NPCs
    npcData.forEach(npc => {
      const npcSprite = this.physics.add.sprite(npc.x, npc.y, 'npcs', npc.frame);
      npcSprite.setImmovable(true);
      npcSprite.name = npc.name;
      npcSprite.dialogue = npc.dialogue;
      
      // Play idle animation
      npcSprite.anims.play('npc-idle');
      
      // Add to NPCs array
      this.npcs.push(npcSprite);
      
      // Add overlap detection
      this.physics.add.overlap(this.player, npcSprite, this.handleNPCInteraction, null, this);
    });
  }
  
  createUI() {
    // Create quest panel
    const questPanel = this.add.image(400, 550, 'quest-panel');
    questPanel.setScrollFactor(0);
    questPanel.setScale(0.5);
    
    // Create quest text
    this.questText = this.add.text(400, 550, 'No active quest', {
      font: '16px Arial',
      fill: '#ffffff',
      align: 'center'
    });
    this.questText.setScrollFactor(0);
    this.questText.setOrigin(0.5);
  }
  
  handlePlayerMovement() {
    // Reset velocity
    this.player.setVelocity(0);
    
    // Handle movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('player-walk-left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('player-walk-right', true);
    }
    
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
        this.player.anims.play('player-walk-up', true);
      }
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
        this.player.anims.play('player-walk-down', true);
      }
    }
    
    // Play idle animation if not moving
    if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
      this.player.anims.play('player-idle', true);
    }
  }
  
  checkStationInteractions() {
    // This is handled by the overlap callbacks
  }
  
  updateNPCs() {
    // Simple NPC behavior - just idle animations for now
    this.npcs.forEach(npc => {
      npc.anims.play('npc-idle', true);
    });
  }
  
  handleStationInteraction(player, station) {
    // Only trigger if spacebar is pressed
    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))) {
      console.log(`Interacting with ${station.stationName}`);
      
      // Generate a station-specific quest
      this.generateQuestForStation(station.stationType);
      
      // Show interaction UI (to be implemented)
      this.showStationInterface(station.stationType);
    }
  }
  
  handleNPCInteraction(player, npc) {
    // Only trigger if spacebar is pressed
    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))) {
      console.log(`Talking to ${npc.name}: ${npc.dialogue}`);
      
      // Show dialogue (to be implemented)
      this.showDialogue(npc.name, npc.dialogue);
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
    // This would open the appropriate interface based on station type
    // For MVP, just log to console
    console.log(`Opening ${stationType} interface`);
    
    // In a full implementation, this would trigger a UI overlay
    // with the appropriate tools for the station type
  }
  
  showDialogue(name, text) {
    // This would show a dialogue box with the NPC's message
    // For MVP, just log to console
    console.log(`${name}: ${text}`);
    
    // In a full implementation, this would create a dialogue box
    // with the NPC's name and message
  }
}
