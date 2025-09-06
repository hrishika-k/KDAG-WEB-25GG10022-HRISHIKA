const questions = [
  {
    q: "What does ML stand for in the context of data analytics?",
    options: ["A. Machine Language", "B. Machine Learning", "C. Multiple Logic", "D. Manual Learning"],
    answer: 1,
    explanation: "ML stands for Machine Learning, a field of AI that focuses on algorithms learning from data."
  },
  {
    q: "Which algorithm is commonly used for classification problems?",
    options: ["A. Decision Trees", "B. Linear Regression", "C. K-Means Clustering", "D. Principal Component Analysis"],
    answer: 0,
    explanation: "Decision Trees are a popular choice for classification tasks due to their interpretability and ease of use."
  },
  {
    q: "What is the purpose of data preprocessing?",
    options: ["A. To increase file size", "B. Data Cleaning", "C. To reduce file size", "D. To make data look pretty"],
    answer: 1,
    explanation: "Data preprocessing is essential for cleaning and organizing raw data to make it suitable for analysis."
  },
  {
    q: "Which library is used for machine learning in Python?",
    options: ["A. NumPy", "B. Pandas", "C. Scikit-learn", "D. Matplotlib"],
    answer: 2,
    explanation: "Scikit-learn is the most widely used library in Python for machine learning algorithms."
  },
  {
    q: "Which Python library is most commonly used for data manipulation?",
    options: ["A. OpenCV", "B. matplotlib", "C. Scikit-learn", "D. Pandas"],
    answer: 3,
    explanation: "Pandas is the most commonly used library for data manipulation and analysis in Python."
  }
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const qNumEl = document.getElementById("question-number");
const explanationEl = document.getElementById("explanation");

let currentQ = 0;
let score = 0;

function loadQuestion() {
  const q = questions[currentQ];
  questionEl.textContent = q.q;
  qNumEl.textContent = `Question ${currentQ + 1} of ${questions.length}`;
  scoreEl.textContent = `Score: ${score}/${questions.length}`;
  optionsEl.innerHTML = "";
  explanationEl.style.display = "none";
  explanationEl.textContent = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(i);
    optionsEl.appendChild(btn);
  });

  progressEl.style.width = `${((currentQ) / questions.length) * 100}%`;
}

function selectAnswer(selected) {
  const q = questions[currentQ];
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    btn.classList.add("disabled");  // 🔹 make them dull
    if (i === q.answer) btn.classList.add("correct");
    else if (i === selected) btn.classList.add("wrong");
  });

  if (selected === q.answer) score++;
  scoreEl.textContent = `Score: ${score}/${questions.length}`;
  nextBtn.style.display = "block";

  // Show explanation
  explanationEl.textContent = `Explanation: ${q.explanation}`;
  explanationEl.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQ++;
  if (currentQ < questions.length) {
    loadQuestion();
    nextBtn.style.display = "none";
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.textContent = `You scored ${score} out of ${questions.length}!`;
  optionsEl.innerHTML = "";
  explanationEl.style.display = "none";
  progressEl.style.width = "100%";
  nextBtn.style.display = "none";
}

// Trigger animation on page load
window.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".logout_outer_container_01");
  if (el) {
    el.style.animation = "fadeSlideUp 0.6s ease-out forwards";
  }
});

// Load the first question
loadQuestion();
