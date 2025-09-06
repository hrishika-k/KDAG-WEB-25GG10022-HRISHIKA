// ==========================
// Navbar Active State Handler
// ==========================
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // remove active from all
    navLinks.forEach(l => l.classList.remove('active'));
    // add to clicked one
    link.classList.add('active');
  });
});

// ==========================
// Typing + Erasing Animation
// ==========================
const phrases = ["Machine Learning", "Data Analytics"];
let i = 0; // phrase index
let j = 0; // letter index
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function loop() {
  const typingEl = document.getElementById("typing");
  if (!typingEl) return; // safety check

  isEnd = false;
  typingEl.innerHTML = currentPhrase.join("");

  if (i < phrases.length) {
    if (!isDeleting && j <= phrases[i].length) {
      // typing forward
      currentPhrase.push(phrases[i][j]);
      j++;
      typingEl.innerHTML = currentPhrase.join("");
    }

    if (isDeleting && j <= phrases[i].length) {
      // deleting backward
      currentPhrase.pop();
      j--;
      typingEl.innerHTML = currentPhrase.join("");
    }

    if (j === phrases[i].length) {
      // end of a word
      isEnd = true;
      isDeleting = true;
    }

    if (isDeleting && j === 0) {
      // word fully erased, move to next
      currentPhrase = [];
      isDeleting = false;
      i++;
      if (i === phrases.length) {
        i = 0;
      }
    }
  }

  const speedUp = Math.random() * (80 - 50) + 50;   // faster typing
  const normalSpeed = Math.random() * (200 - 100) + 100; // slower deleting
  const time = isEnd ? 1500 : isDeleting ? speedUp : normalSpeed;

  setTimeout(loop, time);
}

// Start the typing loop once page is loaded
window.addEventListener("DOMContentLoaded", loop);
