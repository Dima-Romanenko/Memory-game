const section = document.querySelector("section");
let playerLivesCount = document.querySelector(".playerLivesCount");
let playerLives = 7;


// link text 

playerLivesCount.textContent = playerLives;


// Generate the data
const getData = () => [
    { imgSrc: "./images/balloon.jpg", name: "balloon" },
    { imgSrc: "./images/beach.jpg", name: "beach" },
    { imgSrc: "./images/buterfly.jpg", name: "buterfly" },
    { imgSrc: "./images/flower.jpg", name: "flower" },
    { imgSrc: "./images/mountains.jpg", name: "mountains" },
    { imgSrc: "./images/rain.jpg", name: "rain" },
    { imgSrc: "./images/waves.jpg", name: "waves" },
    { imgSrc: "./images/whale.jpg", name: "whale" },
    { imgSrc: "./images/balloon.jpg", name: "balloon" },
    { imgSrc: "./images/beach.jpg", name: "beach" },
    { imgSrc: "./images/buterfly.jpg", name: "buterfly" },
    { imgSrc: "./images/flower.jpg", name: "flower" },
    { imgSrc: "./images/mountains.jpg", name: "mountains" },
    { imgSrc: "./images/rain.jpg", name: "rain" },
    { imgSrc: "./images/waves.jpg", name: "waves" },
    { imgSrc: "./images/whale.jpg", name: "whale" },
];

// const data = getData()

const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
}

const cardGenerator = () => {
    const cardData = randomize();

    // generate HTML 
    cardData.forEach((item, index) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        // attach info to the cards
        face.src = item.imgSrc;
        card.setAttribute("name", item.name);
        // attach cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        })
    })
}
// check cards
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    if (flippedCards.length === 2) {
        if (
            flippedCards[0].getAttribute("name") ===
            flippedCards[1].getAttribute("name")) {
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            })
        } else {
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            })
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                restart("try again!!!")
            }
        }
    }
    if (toggleCard.length === 16) {
        restart("you won!!!")
    }
};

// restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";

    cardData.forEach((item, index) => {

        setTimeout(() => {
            cards[index].classList.remove("toggleCard");
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all";

        }, 1000)
    });
    playerLives = 7;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => {
        window.alert(text);
    }, 100)
}

cardGenerator()