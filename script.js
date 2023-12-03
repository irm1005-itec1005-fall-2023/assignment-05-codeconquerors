const kitty = document.getElementById("kitty");
const bush = document.getElementById("bush");

function jump() {
  if (!kitty.classList.contains("jump")) {
    kitty.classList.add("jump");
    kitty.style.top = "-100px"; // Adjust the jump height as needed

    setTimeout(function () {
      kitty.style.top = "0";
      kitty.classList.remove("jump");
    }, 300);
  }
}

let isAlive = setInterval(function () {
  // get current kitty Y position
  let kittyTop = parseInt(window.getComputedStyle(kitty).getPropertyValue("top"));

  // get current bush X position
  let bushLeft = parseInt(
    window.getComputedStyle(bush).getPropertyValue("left")
  );

  // detect collision
  if (bushLeft < 50 && bushLeft > 0 && kittyTop >= 140) {
    // collision
    alert("Game Over!");
  }
}, 10);

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jump();
  }
}); 