const toggleBtn = document.getElementById("toggleMusic");

// Load previous time if available
const previousTime = sessionStorage.getItem("bgAudioTime");

// Create only once globally
if (!window.bgAudio) {
  window.bgAudio = new Audio("dandelions.mp3");
  window.bgAudio.loop = true;
  window.bgAudio.volume = 0.5;

  if (previousTime) {
    window.bgAudio.currentTime = parseFloat(previousTime);
  }

  // Start music on first click
  const startMusic = () => {
    window.bgAudio.play().catch(() => {
      console.warn("Autoplay blocked.");
    });
    document.removeEventListener("click", startMusic);
  };

  document.addEventListener("click", startMusic);
}

// Save current playback time before page unloads
window.addEventListener("beforeunload", () => {
  if (window.bgAudio) {
    sessionStorage.setItem("bgAudioTime", window.bgAudio.currentTime);
  }
});

// Toggle music manually
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    if (window.bgAudio.paused) {
      window.bgAudio.play();
      toggleBtn.innerText = "⏸️ Pause Music";
    } else {
      window.bgAudio.pause();
      toggleBtn.innerText = "▶️ Play Music";
    }
  }

  );

  // Set initial state
  if (window.bgAudio.paused) {
    toggleBtn.innerText = "▶️ Play Music";
  } else {
    toggleBtn.innerText = "⏸️ Pause Music";
  }
}
