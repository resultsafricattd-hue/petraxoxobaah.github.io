const messages = [
  "🎈 A gift of joy: May your laughter never fade.",
  "💌 A gift of love: You’re cherished more than you know.",
  "🫶 A gift of friendship: I’ll always be here, ride or die.",
  "🌟 A gift of light: You shine in every space you enter.",
  "🎁 The final gift: You’re the best thing that ever happened to me, Petra."
];

const messageBox = document.getElementById("messageBox");
const opened = new Set();

const birthdayAudio = new Audio('dandelions.mp3');
birthdayAudio.loop = false;
let audioStarted = false;

function revealMessage(index) {
  if (!audioStarted) {
    birthdayAudio.play().catch(() => {
      console.warn("Autoplay blocked.");
    });
    audioStarted = true;
  }

  if (opened.has(index)) {
    showMessage("You already opened this one 👀 Try another!");
    return;
  }

  showMessage(messages[index]);
  opened.add(index);

  if (opened.size === messages.length) {
    setTimeout(() => {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      messageBox.innerText = "🎉 You’ve opened all the gifts! Happy Birthday, Petra 💖";
      messageBox.classList.remove("fade-in");
      messageBox.classList.add("final");
      void messageBox.offsetWidth;
      messageBox.classList.add("fade-in");
      birthdayAudio.currentTime = 0;
      birthdayAudio.play();
    }, 1000);
  }
}

function showMessage(text) {
  messageBox.innerText = text;
  messageBox.classList.remove("fade-in", "final");
  void messageBox.offsetWidth;
  messageBox.classList.add("fade-in");
}

// 🎵 Music Toggle (shared by both pages)
const bgAudio = new Audio('dandelions.mp3');
bgAudio.loop = true;
bgAudio.volume = 0.5;
bgAudio.play().catch(() => {
  console.warn("Autoplay blocked.");
});

const toggleBtn = document.getElementById("toggleMusic");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    if (bgAudio.paused) {
      bgAudio.play();
      toggleBtn.innerText = "⏸️ Pause Music";
    } else {
      bgAudio.pause();
      toggleBtn.innerText = "▶️ Play Music";
    }
  });
}
