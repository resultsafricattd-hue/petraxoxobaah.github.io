const toggleBtn = document.getElementById("toggleMusic");

// Load last playback time
const previousTime = sessionStorage.getItem("bgAudioTime");

// Prevent redeclaration across pages
if (!window.bgAudio) {
  window.bgAudio = new Audio("dandelions.mp3");
  window.bgAudio.loop = true;
  window.bgAudio.volume = 0.5;

  if (previousTime) {
    window.bgAudio.currentTime = parseFloat(previousTime);
  }

  // Autoplay on first interaction
  const startMusic = () => {
    window.bgAudio.play().then(() => {
      if (toggleBtn) toggleBtn.innerText = "⏸️ Pause Music";
    }).catch(() => {
      console.warn("Autoplay blocked.");
    });

    document.removeEventListener("click", startMusic);
  };

  document.addEventListener("click", startMusic, { once: true });
}

// Save current time before switching pages
window.addEventListener("beforeunload", () => {
  if (window.bgAudio) {
    sessionStorage.setItem("bgAudioTime", window.bgAudio.currentTime);
  }
});

// Music toggle button
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    if (window.bgAudio.paused) {
      window.bgAudio.play();
      toggleBtn.innerText = "⏸️ Pause Music";
    } else {
      window.bgAudio.pause();
      toggleBtn.innerText = "▶️ Play Music";
    }
  });

  // Show correct label on load
  toggleBtn.innerText = window.bgAudio.paused
    ? "▶️ Play Music"
    : "⏸️ Pause Music";
}
