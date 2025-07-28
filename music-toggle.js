// Get the toggle button
const toggleBtn = document.getElementById("toggleMusic");

if (toggleBtn) {
  // Create bgAudio only once globally
  if (!window.bgAudio) {
    window.bgAudio = new Audio("dandelions.mp3");
    window.bgAudio.loop = true;
    window.bgAudio.volume = 0.5;

    // Only start on user's first interaction (click anywhere)
    const startMusicOnce = () => {
      window.bgAudio.play().catch(() => {
        console.warn("Autoplay blocked by browser.");
      });
      document.removeEventListener("click", startMusicOnce);
    };

    document.addEventListener("click", startMusicOnce);
  }

  // Toggle play/pause on button click
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

  // Reflect correct button state on page load
  if (window.bgAudio.paused) {
    toggleBtn.innerText = "▶️ Play Music";
    toggleBtn.classList.remove("playing");
  } else {
    toggleBtn.innerText = "⏸️ Pause Music";
    toggleBtn.classList.add("playing");
  }
}
