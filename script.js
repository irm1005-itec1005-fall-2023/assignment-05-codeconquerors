const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

function jump() {
  if (!dino.classList.contains("jump")) {
    dino.classList.add("jump");

    setTimeout(function () {
      dino.classList.remove("jump");
    }, 300);
  }
}

let isAlive = setInterval(function () {
  // get current dino Y position
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));

  // get current cactus X position
  let cactusLeft = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("right")
  );

  // detect collision
  if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
    // collision
    alert("Game Over!");
    clearInterval(isAlive); // Stop checking for collisions
  }
}, 10);

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") { // Check if the pressed key is Space
    jump();
  }
});
