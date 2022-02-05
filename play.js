//*** VARIABLES ***///
var deck = new Deck();
deck.shuffleDeck();

var isDealClicked = false;
var canPlayerHit = false;
var canPlayerStand = false;
var hasBet = false;
var currencyTotal = '2000';


let playerArray = [];
let dealerArray = [];

//*** HTML SELECTOR VARIABLES ***///
const dealerCards = document.querySelector(".dealer-cards");
const playerCards = document.querySelector(".player-cards");
const playerTotal = document.querySelector(".player-total-text");
const outcomeText = document.querySelector(".outcome-text");
const currency = document.querySelector(".player-currency-text");


//*** GAME LOGIC & FUNCTIONALITY ***//
function getCurrency(){
    currency.innerText = currencyTotal;
}

function updateBet() {
    if(hasBet == false){
        var bet = document.getElementById("bet").value;
        document.querySelector(".player-bet-text").innerHTML = bet;
        hasBet = true;
    }
}


//*** PLAYER ***//

//create image element associated with first card off top of deck
function dealPlayerCard(){
    var createImage = document.createElement("img");
    createImage.src = getPlayerCard(drawTopCard());
    document.querySelector('.player-cards').appendChild(createImage);
}

//updating players total weighted value of cards in hand to the DOM
function updatePlayerTotal(){
    playerTotal.innerHTML = updateTotal(playerArray)
}

//allows the player to hit (get) an additional card if necessary and checks players total weighted value
function playerHit(){
    if(canPlayerHit == true){
        dealPlayerCard()
        updatePlayerTotal();
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

//render all card images face up after player has hit stand
function showDealerCard(){
    dealerCards.innerHTML = "";
    for (let i=0; i < dealerArray.length; i++){
        var createImage = document.createElement("img");
        createImage.src = `assets/${dealerArray[i].value}_of_${dealerArray[i].suit}.png`;
        document.querySelector('.dealer-cards').appendChild(createImage);
    }
}

//dealerhit function to be performed after player has hit stand
function dealerHit(){
    updateTotal(dealerArray)
    if(updateTotal(dealerArray) < 17){
        do {
            dealDealerCard(true);
            compareTotals();
            checkDealerTotal();
            updateTotal(dealerArray);
        } while (updateTotal(dealerArray) < 17);
    } else {
        compareTotals();
        checkDealerTotal();
    }
}

//player can stand (stop hitting) at which time the dealer will hit or show their cards to end the round
function stand(){
    if(canPlayerStand == true){
    canPlayerHit = false;
    showDealerCard();
    if(updateTotal(dealerArray) > updateTotal(playerArray)){
        outcomeText.innerText = "Dealer wins! Start New Round";
    } else {
    dealerHit();
    }}
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

//*** COMPARATIVE LOGIC & VALUE CHECKING ***//

//check total weighted value of cards in hand and display win/loss on screen
function checkPlayerTotal(){
    if (updateTotal(playerArray) > 21)
    {
        showDealerCard();
        outcomeText.innerText = "Dealer wins! Start New Round";
        canPlayerHit = false;
    } else if (updateTotal(playerArray) == 21) {
        if(updateTotal(playerArray) == updateTotal(dealerArray)){
            showDealerCard();
            outcomeText.innerText = "It's a tie! You get your bet back.";
            canPlayerHit = false;
        } else {
            showDealerCard();
            outcomeText.innerText = "You have won this round!";
            canPlayerHit = false;
        }
    }
}

function checkDealerTotal(){
    if (updateTotal(dealerArray) > 21)
    {
        outcomeText.innerText = "You have won this round!";
    } else if (updateTotal(dealerArray) == 21){
        outcomeText.innerText = "Dealer wins! Start New Round";
    } else if (updateTotal(dealerArray) > 17 && updateTotal(dealerArray) <21){
        outcomeText.innerText = "Dealer wins! Start New Round";
    }
}

function compareTotals(){
    if (updateTotal(playerArray) > updateTotal(dealerArray)){
        outcomeText.innerText = "You have won this round!";
    } else if (updateTotal(playerArray) < updateTotal(dealerArray)) {
        outcomeText.innerText = "Dealer wins! Start New Round";
    } else if (updateTotal(playerArray) = updateTotal(dealerArray)) {
        outcomeText.innerText = "It's a tie! You get your bet back.";
    }
}


//function to create new deck and shuffle again when new round is started
function refreshDeck(){
    deck = new Deck();
    deck.shuffleDeck();
}

//deal intial cards to player and dealer
var dealCards = function(){
    if (hasBet == true){
        dealPlayerCard();
        dealDealerCard(false);
        dealPlayerCard();
        dealDealerCard();
        
        if(isDealClicked == false) { 
            this.removeEventListener("click", dealCards);
        }
        updatePlayerTotal();
        checkPlayerTotal();
        canPlayerHit = true;
        canPlayerStand = true;
    }
}

//clear table - remove card images, player total, hand outcome, refresh the deck and empty dealer and player array
function clearTable(){
    dealerCards.innerHTML = "";
    playerCards.innerHTML = "";
    playerTotal.innerText = "";
    outcomeText.innerText = "";
    currency.innerText = currencyTotal;
    refreshDeck();
    playerArray = [];
    dealerArray = [];
    canPlayerStand = false;
    canPlayerHit = false;
    hasBet = false;
}

//*** HANDLERS ***//

document.querySelector('.deal').addEventListener("click", dealCards);
document.querySelector('.hit').addEventListener("click", playerHit);
document.querySelector('.stand').addEventListener("click", stand);
document.querySelector('.newround').addEventListener("click", function(){
    document.querySelector('.deal').addEventListener("click", dealCards);
    clearTable();
})
document.querySelector('#bet-submit').addEventListener("click", updateBet);


//*** ON LOAD ***//
getCurrency();

