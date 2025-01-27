// File: gameTimeSystem.js

class GameTimeSystem {
    constructor() {
      // Time management
      this.cycle = ['morning', 'day', 'evening', 'night'];
      this.currentCycleIndex = 0;
  
      // Work/Joy day management
      this.dayCount = 0; // Day counter
      this.workDays = 3; // Number of working days
      this.isPaused = true; // Pause state
      this.speedMultiplier = 1; // Speed (1x, 2x, 3x)
  
      // Reactive data
      this.beetleDead = 0; // Example reactive variable
      this.reactiveBeetleDead = (newValue) => {
        console.log(`Reactive BeetleDead Updated: ${newValue}`);
      };
  
      // Timer
      this.interval = null;
    }


  
              // Start or resume the game loop
              play() {
                if (!this.isPaused) return; // Already running
                this.isPaused = false;
            
                this.interval = setInterval(() => {
                  this.nextEvent();
                }, 2000 / this.speedMultiplier);
              }
            
              // Pause the game loop
              pause() {
                if (this.isPaused) return; // Already paused
                this.isPaused = true;
            
                clearInterval(this.interval);
              }
  
    // Adjust game speed
    setSpeed(speedMultiplier) {
      this.speedMultiplier = speedMultiplier;
      if (!this.isPaused) {
        this.pause();
        this.play(); // Restart with updated speed
      }
    }
  
              // Advance to the next event in the day cycle
              nextEvent() {
                // Trigger game loop logic
                                const currentEvent = this.cycle[this.currentCycleIndex];
                this.executeGameLogic(currentEvent);
            
                        // Move to the next event
                        this.currentCycleIndex = (this.currentCycleIndex + 1) % this.cycle.length;
                    
                        // Check if a full day (morning -> night) has passed
                        if (this.currentCycleIndex === 0) {
                          this.dayCount++;
                      }
              }
  
                          // Execute game loop logic for the current event
                    executeGameLogic(event) {
                          console.log(`---------------------------------------------`);
                          console.log(`Day: ${this.dayCount}, ${event}`);
                      
                          // Example: Increment reactive `beetleDead`
                          this.beetleDead++;
                          this.reactiveBeetleDead(this.beetleDead);
                      
                          // Check Work/Joy day logic
                          if (this.dayCount % (this.workDays + 1) === 0) {
                            console.log('It’s a joy day!');
                          } else {
                            console.log('It’s a working day.');
                          }
                    }
    }
  



  // === Example Usage ===
  const game = new GameTimeSystem();
  
  // Control buttons
  document.getElementById('playButton').addEventListener('click', () => game.play());
  document.getElementById('pauseButton').addEventListener('click', () => game.pause());
  document.getElementById('speed2xButton').addEventListener('click', () => game.setSpeed(2));
  document.getElementById('speed3xButton').addEventListener('click', () => game.setSpeed(3));
  document.getElementById('speed1xButton').addEventListener('click', () => game.setSpeed(1));
  