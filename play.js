//*** VARIABLES ***///
var deck = new Deck();
deck.shuffleDeck();

var isDealClicked = false;
var canHit = false;


let playerArray = [];
let dealerArray = [];

//*** HTML SELECTOR VARIABLES ***///
const dealerCards = document.querySelector(".dealer-cards");
const playerCards = document.querySelector(".player-cards");
const playerTotal = document.querySelector(".player-total");
const outcomeText = document.querySelector(".outcome-text");


//*** GAME LOGIC & FUNCTIONALITY ***//

//*** PLAYER ***//
//create image element associated with first card off top of deck
function dealPlayerCard(){
    var createImage = document.createElement("img");
    createImage.src = getPlayerCard(drawTopCard());
    document.querySelector('.player-cards').appendChild(createImage);
}

//updating players total weighted value of cards in hand to the DOM
function updatePlayerTotal(){
    document.querySelector(".player-total").innerHTML = 'Player Total: ' + updateTotal(playerArray)
}

//allows the player to hit (get) an additional card if necessary and checks players total weighted value
function playerHit(){
    if(canHit == true){
        // var createImage = document.createElement("img");
        // createImage.src = getPlayerCard(drawTopCard());
        dealPlayerCard()
        updatePlayerTotal();
        // document.querySelector('.player-cards').appendChild(createImage);
        checkPlayerTotal()
    }
}


//*** DEALER ***//
//create image element for dealer associated with first card off top of deck (one of the two cards called in dealCards will be dealt face down)
function dealDealerCard(cardIsFaceUp = true){
    var createImage = document.createElement("img");
    var card = drawTopCard();
    card.cardIsFaceUp = cardIsFaceUp;
    createImage.src = getDealerCard(card);
    document.querySelector('.dealer-cards').appendChild(createImage);
}

function dealerHit(){
 dealDealerCard(true);
}


//player can stand (stop hitting) at which time the dealer will hit or show their cards to end the round
function stand(){
    canHit = false;
    dealerHit();
}

//check total weighted value of cards in hand
function updateTotal(array){
    let sum = 0;
    for(let i=0; i < array.length; i++){
        // console.log(array[i])
        sum += array[i].weight;
    }
    return sum;
}

//check total weighted value of cards in hand and display win/loss on screen
function checkPlayerTotal(){
    if (updateTotal(playerArray) > 21)
    {
        document.querySelector(".outcome-text").innerText = "Dealer wins! Start New Round";
        canHit = false;
    }
}

function checkDealerTotal(){
    if (updateTotal(dealerArray) > 21)
    {
        document.querySelector(".outcome-text").innerText = "You have won this round!";
    }
}


//function to create new deck and shuffle again when new round is started
function refreshDeck(){
    deck = new Deck();
    deck.shuffleDeck();
}

//deal intial cards to player and dealer
var dealCards = function(){
    dealPlayerCard();
    dealDealerCard(false);
    dealPlayerCard();
    dealDealerCard();
    
    if(isDealClicked == false) { 
        this.removeEventListener("click", dealCards);
    }
    updatePlayerTotal();
    canHit = true;
}

//clear table - remove card images, player total, hand outcome, refresh the deck and empty dealer and player array
function clearTable(){
    dealerCards.innerHTML = "";
    playerCards.innerHTML = "";
    playerTotal.innerText = "";
    outcomeText.innerText = "";

    refreshDeck();
    playerArray = [];
    dealerArray = [];

}

//*** HANDLERS ***//
document.querySelector('.deal').addEventListener("click", dealCards);
document.querySelector('.hit').addEventListener("click", playerHit);
document.querySelector('.stand').addEventListener("click", stand);
document.querySelector('.newround').addEventListener("click", function(){
    document.querySelector('.deal').addEventListener("click", dealCards);
    clearTable();

})
