class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro")
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        this.player = new Player(
            this.gameScreen,
            200,
            500,
            100,
            150,
            "./images/car.png");
        this.height = 600;
        this.width = 500;
        this.obstacles = [];
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId;
        this.gameLoopFrequency = Math.round(1000/60); // 60fps
    }

    start() {
        // Set the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // Hide the start screen
    this.startScreen.style.display = "none";
    
    // Show the game screen
    this.gameScreen.style.display = "block";

    // Runs the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
    this.gameIntervalId = setInterval(() => {
      this.gameLoop()
    }, this.gameLoopFrequency)
    }

    gameLoop() {
        console.log("in the game loop");
    
        this.update();
    
        // If "gameIsOver" is set to "true" clear the interval to stop the loop
        if (this.gameIsOver) {
          clearInterval(this.gameIntervalId)
        }
    }

    update() {
        console.log("in the update");
        this.player.move();

        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i]
            obstacle.move()
        

        if(this.player.didCollide(obstacle)) {
            obstacle.element.remove()
            this.obstacles.splice(i, 1)
            this.lives--
            i--
        } else if (obstacle.top > this.height) {
            this.score++
            obstacle.element.remove()
            this.obstacles.splice(i, 1)
            i--
        }
    }
    if(this.lives === 0) {
        this.endGame()
    }
    
    if(Math.random() > 0.98 && this.obstacles.length < 1) {
        this.obstacles.push(new Obstacle(this.gameScreen))
    }
}
endGame() {
    this.player.element.remove() 
    this.obstacles.forEach(obstacle => obstacle.element.remove())

    this.gameIsOver = true

    this.gameScreen.style.display = "none"
    this.gameEndScreen.style.display = "block"
    }
}

