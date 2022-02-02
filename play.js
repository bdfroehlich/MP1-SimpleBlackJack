//***variables***
var deck = new Deck();
deck.shuffleDeck();
var isDealClicked = false;

let playerArray = [];
let dealerArray = [];
// console.log(deck.cards)

const dealerCards = document.querySelector(".dealer-cards");
const playerCards = document.querySelector(".player-cards");


//***create new Queue to put our shuffled array of cards into a playQueue***
// let playQueue = new Queue();
// deck.cards.map(element =>{
//     playQueue.enqueue(element)
// })

//***deal card & image render functions***
function dealPlayerCard(){
    //create image element associated with first card off top of deck
    var createImage = document.createElement("img");
    createImage.src = getPlayerCard(drawTopCard());
    document.querySelector('.player-cards').appendChild(createImage);
}

function dealDealerCard(cardIsFaceUp = true){
    var createImage = document.createElement("img");
    var card = drawTopCard();
    card.cardIsFaceUp = cardIsFaceUp;
    createImage.src = getDealerCard(card);
    document.querySelector('.dealer-cards').appendChild(createImage);
}

function hitCard(){
    var createImage = document.createElement("img");
    createImage.src = getPlayerCard(drawTopCard());
    document.querySelector('.player-cards').appendChild(createImage);
}

function stand(){

}

function clearTable(){
    dealerCards.innerHTML = "";
    playerCards.innerHTML = "";

    refreshDeck();
    playerArray = [];
    dealerArray = [];
}

function refreshDeck(){
    deck = new Deck();
    deck.shuffleDeck();
}

var dealCards = function(){
    dealPlayerCard()
    dealDealerCard(false)
    dealPlayerCard()
    dealDealerCard()
    if(isDealClicked == false) { 
        this.removeEventListener("click", dealCards);
    }
}

//***handlers***
document.querySelector('.deal').addEventListener("click", dealCards)
document.querySelector('.hit').addEventListener("click", hitCard)
document.querySelector('.newround').addEventListener("click", function(){
    document.querySelector('.deal').addEventListener("click", dealCards)
    clearTable()

})


// playQueue.dequeue()
// console.log(playQueue)
