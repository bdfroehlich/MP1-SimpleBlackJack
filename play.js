//***variables***
const deck = new Deck()
deck.shuffleDeck()
var isDealClicked = false;
// console.log(deck.cards)

//***create new Queue to put our shuffled array of cards into a playQueue***
let playQueue = new Queue()
deck.cards.map(element =>{
    playQueue.enqueue(element)
})

// console.log(playQueue.dequeue())
// console.log(getCardImageName(playQueue.dequeue()))


//***deal card & image render functions***
async function firstPlayerCard(){
    //create image element associated with first card off top of deck
    var createImage = document.createElement("img");
    createImage.src = getCardImageName(playQueue.dequeue());
    document.querySelector('.player-cards').appendChild(createImage);
}

function firstDealerCard(){
    var createImage = document.createElement("img");
    createImage.src = getCardImageName(playQueue.dequeue());
    document.querySelector('.dealer-cards').appendChild(createImage);
}

async function secondPlayerCard(){
    var createImage = document.createElement("img");
    createImage.src = getCardImageName(playQueue.dequeue());
    document.querySelector('.player-cards').appendChild(createImage);
}

function secondDealerCard(){
    var createImage = document.createElement("img");
    createImage.src = getCardImageName(playQueue.dequeue());
    document.querySelector('.dealer-cards').appendChild(createImage);
}

//***handlers***
document.querySelector('.deal').addEventListener('click', () =>{
    firstPlayerCard()
    firstDealerCard()
    secondPlayerCard()
    secondDealerCard()
    console.log(playQueue)
})



// firstPlayerCard()
// firstDealerCard()
// secondPlayerCard()
// secondDealerCard()
// playQueue.dequeue()
// console.log(playQueue)
