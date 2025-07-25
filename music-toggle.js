// Avoid redeclaring if used on multiple pages
const toggleBtn = document.getElementById("toggleMusic");

if (toggleBtn) {
  // Check if bgAudio is already defined globally
  if (!window.bgAudio) {
    window.bgAudio = new Audio('dandelions.mp3');
    window.bgAudio.loop = true;
    window.bgAudio.volume = 0.5;
  }

  toggleBtn.addEventListener("click", () => {
    if (window.bgAudio.paused) {
      window.bgAudio.play();
      toggleBtn.innerText = "⏸️ Pause Music";
      toggleBtn.classList.add("playing");
    } else {
      window.bgAudio.pause();
      toggleBtn.innerText = "▶️ Play Music";
      toggleBtn.classList.remove("playing");
    }
  });

  // Optional: play automatically on supported pages
  if (window.location.pathname.includes("index.html") || window.location.pathname.includes("home.html")) {
    window.bgAudio.play().catch(() => {
      console.warn("Autoplay blocked.");
    });
  }
}
