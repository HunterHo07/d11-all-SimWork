# SimWork Development Guide

## Tech Stack

### Frontend
- **Framework**: Next.js (React)
- **Game Engine**: Phaser 3
- **Animation Libraries**:
  - GSAP (GreenSock Animation Platform)
  - Framer Motion
  - Three.js for 3D elements
- **Styling**: CSS Modules with custom variables

### Data Management
- **State Management**: React Context API
- **Local Storage**: For user data and session persistence
- **Dummy Data**: JSON files simulating API responses

### Deployment
- **Hosting**: GitHub Pages (static deployment)
- **Build Process**: Next.js static export

## Project Structure
```
simwork/
├── app/                  # Next.js app directory
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React context providers
│   ├── game/             # Phaser game implementation
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # Global styles and variables
│   ├── utils/            # Utility functions
│   ├── (routes)/         # Page routes
│   └── layout.js         # Root layout
├── public/               # Static assets
│   ├── images/           # Images and icons
│   ├── fonts/            # Custom fonts
│   ├── game-assets/      # Phaser game assets
│   └── data/             # JSON dummy data
└── ...config files
```

## Phased Rollout - Development Plan

### Current Phase (MVP)
- 2.5D interactive office environment
- Basic role stations (Developer, Designer, PM, Data Entry, AI Engineer)
- Simple quest system with procedurally generated tasks
- Local storage for user progress
- Basic analytics dashboard

### Phase 2 Development
- Expanded role scenarios with more complex tasks
- Enhanced analytics with visualization
- Improved AI-driven quest generation
- Mobile-responsive design
- User profile customization

### Phase 3 Development
- WebGL/Three.js enhanced 3D environment
- Multiplayer capabilities
- Advanced AI agents for realistic NPCs
- VR/AR compatibility layer
- Enterprise integration options

## How to Use SimWork

### For Learners
1. **Create Profile**: Sign up with basic information
2. **Select Role**: Choose your desired career path
3. **Navigate Office**: Explore the 2.5D environment
4. **Complete Tasks**: Engage with role-specific challenges
5. **Track Progress**: View your performance metrics
6. **Earn Badges**: Unlock achievements as you improve

### For Hiring Managers
1. **Create Company**: Set up your organization profile
2. **Design Assessments**: Configure task parameters
3. **Invite Candidates**: Send assessment links
4. **Monitor Performance**: View real-time analytics
5. **Review Recordings**: Watch candidate task completion
6. **Compare Results**: Evaluate candidates against benchmarks

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/simwork.git

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```
