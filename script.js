const images = {
  dog: "https://ibb.co/Wv2xHr2L",
  dolphin: "https://ibb.co/FkqH3WzV",
  fire: "https://ibb.co/xKyv27Dq",
  globe: "https://ibb.co/S4YgL3pV",
  lion: "https://ibb.co/yc4Wwk5T",
  lock: "https://ibb.co/GfTDGQg8",
  piano: "https://ibb.co/7NKwY6cZ",
  pizza: "https://ibb.co/MDnwRxTW",
  present: "ahttps://ibb.co/fzBH1RZd",
  silly: "https://ibb.co/SXVxNmLz",
  sunflower: "https://ibb.co/svBhN8YD",
  target: "https://ibb.co/nNNSsQTJ",
  hat: "https://ibb.co/20WTT7bv",
  umbrella: "https://ibb.co/zTFtHjDw"
};


let HScore = localStorage.getItem("HScore") || 0;

document.getElementById("highest-score").innerHTML = `highest Score: ${HScore}`

const Rcards = [
  images.dog, images.dog, images.dolphin, images.dolphin, images.fire, images.fire, images.globe, images.globe,
  images.lion, images.lion, images.lock, images.lock, images.piano, images.piano, images.pizza, images.pizza,
  images.present, images.present, images.silly, images.silly, images.sunflower, images.sunflower, images.target, images.target,
  images.hat, images.hat, images.umbrella, images.umbrella
];

const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const shuffledCards = shuffleArray(Rcards);

const cardsArea = document.querySelector(".cards-area");
shuffledCards.forEach(card => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  const frontImg = document.createElement("img");
  frontImg.src = "./assets/images/Rectangle 3.png";
  frontImg.classList.add("front");

  const backImg = document.createElement("img");
  backImg.src = card;
  backImg.classList.add("back");

  cardDiv.appendChild(frontImg);
  cardDiv.appendChild(backImg);
  cardsArea.appendChild(cardDiv);
});

// Memory Game Logic
let flippedCards = [];
let matchedPairs = 0;
let score = document.getElementById("score");
let currentScore = 0;

const flipCard = (card) => {
  if (flippedCards.length >= 2) return;

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const img1 = card1.querySelector(".back").src;
  const img2 = card2.querySelector(".back").src;

  if (img1 === img2) {
    matchedPairs++;
    let currentScore = matchedPairs * Math.floor(Math.random() * 20);
    score.innerHTML = `score: ${currentScore}`
    flippedCards = [];
    if (matchedPairs === Rcards.length / 2) {
      if(currentScore >= HScore) {
        localStorage.setItem("HScore", currentScore);
      }
      setTimeout(() => alert("You won! 🎉"), 300);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    if (!card.classList.contains("flipped")) {
      flipCard(card);
    }
  });
});

document.getElementById("restart").addEventListener("click", ()=> {
  location.reload()
})
