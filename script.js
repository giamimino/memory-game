const images = {
  dog: "https://i.ibb.co/F4DxhQDF/Image-Dog.png",
  dolphin: "https://i.ibb.co/DPgrWbQp/Image-Dolphin.png",
  fire: "https://i.ibb.co/vCb5cjH4/Image-Fire.png",
  globe: "https://i.ibb.co/gLq8nRCt/Image-Globe.png",
  lion: "https://i.ibb.co/0Rshg9ZN/Image-Lion.png",
  lock: "https://i.ibb.co/20NrR3XC/Image-Lock.png",
  piano: "https://i.ibb.co/NnK8VHhJ/Image-Piano.png",
  pizza: "https://i.ibb.co/VWVnvcyr/Image-Pizza.png",
  present: "https://i.ibb.co/9kzW8XBH/Image-Present.png",
  silly: "https://i.ibb.co/BVTPL619/Image-Silly.png",
  sunflower: "https://i.ibb.co/Z6Z3FqDw/Image-Sunflower.png",
  target: "https://i.ibb.co/9kkj9yJ5/Image-Target.png",
  hat: "https://i.ibb.co/MyZmmDXc/Image-Tophat.png",
  umbrella: "https://i.ibb.co/bMFGRqDn/Image-Umbrella.png"
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
