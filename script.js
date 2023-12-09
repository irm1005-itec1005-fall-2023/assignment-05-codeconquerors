let currentInstruction = 1;

function showNextInstruction() {
    const instructionContainer = document.getElementById("instructions-container");

    // Hide the current step
    const currentStep = document.getElementById(`step-${currentInstruction}`);
    currentStep.style.display = "none";

    // Move to the next step
    currentInstruction++;

    // Display the next step or start game if all steps are completed
    const nextStep = document.getElementById(`step-${currentInstruction}`);
    if (nextStep) {
        nextStep.style.display = "block";
    } else {
        // If there is no next step, hide the "Next" button
        document.getElementById("next-btn").style.display = "none";

        // Show the "Now you can start!" section with the start button
        document.getElementById("hellokitty").style.display = "block";
        document.getElementById("start-btn").style.display = "block";
    }
}

function startAdventure() {
    // Add functionality for starting the adventure
    console.log("Adventure started!");
}

function restartGame() {
    // Add functionality for restarting the game
    console.log("Game restarted!");
}

let walkImg = new Image();
walkImg.src = "./walk.png";

let kitty = {
    x: 50,
    y: 120,
    width: 130,
    height: 140,
    jumping: false,
    jumpHeight: 200,
    jumpCount: 0,
    img: walkImg // Set the initial image to walk.png
};

let bush = {
    x: 800,
    y: 220,
    width: 130,
    height: 140
};

let bushImg = new Image();
bushImg.src = "./bush.png";

let velocityX = -8;
let velocityY = 0;
let gravity = 0.2;

let score = 0;
let gameOver = false;

let board;
let context;

// Background music
let backgroundMusic = new Audio("./song.mp3");

// Window.onload
window.onload = function () {
    board = document.getElementById("board");
    board.width = 700;
    board.height = 300;
    context = board.getContext("2d");

    document.addEventListener("keydown", jumpKitty);

    // Load the walk image
    walkImg.onload = function () {
        // Load the bush image after the walk image has loaded
        bushImg.onload = function () {
            // Start background music
            backgroundMusic.play();
            // Start the game loop
            requestAnimationFrame(update);
        };
        bushImg.src = "./bush.png";
    };
    walkImg.src = "./walk.png";
};

function startAdventure() {
    document.getElementById("welcome-page").style.display = "none"; // Hide the welcome page
    document.getElementById("game-container").style.display = "block"; // Show the game container
    initGame(); // Initialize the game
}

function initGame() {
    // Reset any game variables if needed
    score = 0;
    gameOver = false;

    // Set up your game canvas and context
    board = document.getElementById("board");
    board.width = 700;
    board.height = 320;
    context = board.getContext("2d");

    // Load the walk and bush images
    walkImg.onload = function () {
        requestAnimationFrame(update);
    };
    walkImg.src = "./walk.png";

    bushImg.onload = function () {
        requestAnimationFrame(update);
    };
    bushImg.src = "./bush.png";

    // Add event listener for jumping
    document.addEventListener("keydown", jumpKitty);

    // Start the game loop
    requestAnimationFrame(update);
}

function update() {
    if (!gameOver) {
        context.clearRect(0, 0, board.width, board.height);

        // Draw Kitty
        context.drawImage(kitty.img, kitty.x, kitty.y, kitty.width, kitty.height);

        // Draw Bush
        context.drawImage(bushImg, bush.x, bush.y, bush.width, bush.height);

        // Update Kitty position
        if (kitty.jumping) {
            kitty.y -= velocityY;
            velocityY -= gravity;

            if (kitty.y >= 200) {
                kitty.y = 200;
                velocityY = 0;
                kitty.jumping = false;
            }
        }

        // Check for collision
        if (detectCollision(kitty, bush)) {
            gameOver = true;
            showGameOver();
        }

        // Move Bush with varying speed
        bush.x += velocityX;

        // Check if Bush is out of bounds
        if (bush.x + bush.width < 0) {
            bush.x = board.width;
            score++;
            updateScore();

            // Increase speed a little when the score reaches 50
            if (score >= 50) {
                velocityX = -10; // Adjust the speed as needed
            }
        }

        requestAnimationFrame(update);
    }
}

function jumpKitty(event) {
    if (event.code === "Space" && !kitty.jumping && kitty.y === 200) {
        kitty.jumping = true;
        velocityY = 9; // Initial jump velocity

        // Change the kitty image to walk.png
        kitty.img = walkImg;
    }
}

function detectCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function showGameOver() {
    document.getElementById("game-over").style.display = "block";
    document.getElementById("final-score").innerText = `final score: ${score}`;
    document.getElementById("restart-btn").style.display = "block";

    // Stop background music
    backgroundMusic.pause();
}

function updateScore() {
    document.getElementById("score-value").innerText = score;
}

function restartGame() {
    kitty.y = 200;
    bush.x = 500;
    velocityY = 0;
    score = 0;
    gameOver = false;

    document.getElementById("game-over").style.display = "none";
    document.getElementById("restart-btn").style.display = "none";
    updateScore();

    // Resume background music
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();

    requestAnimationFrame(update);
}
