const pageDates = {
  "day1.html": "2026-11-28T19:30:00+05:00",
  "DAY2.html": "2026-11-29T20:00:00+05:00",
  "day3.html": "2026-11-30T19:00:00+05:00"
};
const currentPage = window.location.pathname.split("/").pop() || "day1.html";
const weddingDate = new Date(pageDates[currentPage] || pageDates["day1.html"]);

const invite = document.getElementById("invite");
const envelope = document.getElementById("envelope");
const openInvite = document.getElementById("openInvite");
const backgroundMusic = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const countdownIds = ["days", "hours", "minutes", "seconds"];

backgroundMusic.volume = 0.25;

function scrollToPanel(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

openInvite.addEventListener("click", () => {
  if (invite.classList.contains("is-open")) return;
  envelope.classList.add("opening");
  openInvite.disabled = true;
  backgroundMusic.play()
    .then(() => {
      musicToggle.hidden = false;
    })
    .catch(() => {
      musicToggle.textContent = "Play Music";
      musicToggle.hidden = false;
    });
  setTimeout(() => {
    invite.classList.add("is-open");
    scrollToPanel("#heroPanel");
  }, 1250);
});

musicToggle.addEventListener("click", () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    musicToggle.textContent = "Music On";
    musicToggle.setAttribute("aria-label", "Pause background music");
  } else {
    backgroundMusic.pause();
    musicToggle.textContent = "Music Off";
    musicToggle.setAttribute("aria-label", "Play background music");
  }
});

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => scrollToPanel(button.dataset.scroll));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
    }
  });
}, { root: invite, threshold: 0.45 });

document.querySelectorAll(".panel").forEach((panel) => observer.observe(panel));

function updateCountdown() {
  const now = new Date();
  const remaining = Math.max(0, weddingDate - now);
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  const values = [days, hours, minutes, seconds];

  countdownIds.forEach((id, index) => {
    document.getElementById(id).textContent = String(values[index]).padStart(2, "0");
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

window.addEventListener("load", () => {
  document.getElementById("envelopePanel").classList.add("in-view");
});
