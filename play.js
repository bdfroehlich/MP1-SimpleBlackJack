//*** VARIABLES ***///
var deck = new Deck();
deck.shuffleDeck();

var isDealClicked = false;
var canPlayerHit = false;
var canPlayerStand = false;
var hasBet = false;
var canStartNewRound = false;
var currencyTotal = "2000";
var winnings = "none";


let playerArray = [];
let dealerArray = [];

//*** HTML SELECTOR CONSTANTS ***///
const dealerCards = document.querySelector(".dealer-cards");
const playerCards = document.querySelector(".player-cards");
const playerTotal = document.querySelector(".player-total-text");
const outcomeText = document.querySelector(".outcome-text");
const currency = document.querySelector(".player-currency-text");
const playerBet =  document.querySelector(".player-bet-text");
const placeBetText = document.getElementById("alert");
const alertPlayer = document.getElementById("zero-alert");

//*** GAME LOGIC & FUNCTIONALITY ***//
function getCurrency(){
    currency.innerText = currencyTotal;
    canStartNewRound = false;
}

function checkCurrency(){
    if(currency.innerText == "0"){
        alertPlayer.innerText = "You have lost all your money! Ask the dealer for more by refreshing the page."
        outcomeText.innerText = "Dealer wins! You lost your bet."
    }
}

function getBet() {
    var bet = document.getElementById("bet").value;
        if(hasBet == false){
                // if(bet.value > currency.innerText){
                //     alertPlayer.innerText = "You can't bet more than you have!"
                // } else if(bet.value < currency.innerText) {
            playerBet.innerHTML = bet;
            hasBet = true;
            canStartNewRound = false;
            currency.innerText = parseInt(currencyTotal) - bet;
                // }
        }
    return playerBet.innerHTML
}

function updateCurrency() {
    var betNum = parseInt(getBet());
    var currencyTotalNum = parseInt(currencyTotal);
    if(winnings == "1"){
        currency.innerText = (currencyTotalNum + betNum).toString();
    } else if (winnings == "1.5"){
        currency.innerText = (currencyTotalNum + betNum).toString();
    } else if (winnings == "lose"){
        currency.innerText = (currencyTotalNum - betNum).toString();
    } else if (winnings == "tie") {
        currency.innerText = (currencyTotalNum + betNum).toString();
    }
    canStartNewRound = true;
    currencyTotal = parseInt(currency.innerText);
    checkCurrency();
}


//*** PLAYER ***//
//create image element associated with first card off top of deck
function dealPlayerCard(){
    var createImage = document.createElement("img");
    createImage.src = getPlayerCard(drawTopCard());
    playerCards.appendChild(createImage);
}

//updating players total weighted value of cards in hand to the DOM
function updatePlayerTotal(){
    playerTotal.innerHTML = updateTotal(playerArray)
}

//allows the player to hit (get) an additional card if necessary and checks players total weighted value
function playerHit(){
    if(canPlayerHit == true){
        dealPlayerCard();
        updatePlayerTotal();
        checkPlayerTotal();
    }
}


//*** DEALER ***//
//create image element for dealer associated with first card off top of deck (one of the two cards called in dealCards will be dealt face down)
function dealDealerCard(cardIsFaceUp = true){
    var createImage = document.createElement("img");
    var card = drawTopCard();
    card.cardIsFaceUp = cardIsFaceUp;
    createImage.src = getDealerCard(card);
    dealerCards.appendChild(createImage);
}

//render all card images face up after player has hit stand
function showDealerCard(){
    dealerCards.innerHTML = "";
    for (let i=0; i < dealerArray.length; i++){
        var createImage = document.createElement("img");
        createImage.src = `assets/${dealerArray[i].value}_of_${dealerArray[i].suit}.png`;
        dealerCards.appendChild(createImage);
    }
}

//dealerhit function to be performed after player has hit stand
function dealerHit(){
    if(updateTotal(dealerArray) < 17){
            do {
                dealDealerCard(true);
                updateTotal(dealerArray);
            } while (updateTotal(dealerArray) < 17);
        } else {
            checkDealerTotal();
    }
    updateTotal(dealerArray);
    checkDealerTotal();
}

//player can stand (stop hitting) at which time the dealer will hit or show their cards to end the round
function stand(){
    if(canPlayerStand == true){
    canPlayerHit = false;
    showDealerCard();
    if(updateTotal(dealerArray) > updateTotal(playerArray)){
        outcomeText.innerText = "Dealer wins! You lost your bet. Click start new round.";
        canStartNewRound = true;
        canPlayerStand = false;
        winnings = "lose";
        updateCurrency();
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
        outcomeText.innerText = "Dealer wins! You lost your bet. Click start new round.";
        canPlayerHit = false;
        canStartNewRound = true;
        canPlayerStand = false;
        winnings = "lose";
        updateCurrency();
    } else if (updateTotal(playerArray) == 21) {
        showDealerCard();
        if(updateTotal(playerArray) == updateTotal(dealerArray)){
            outcomeText.innerText = "It's a tie! You get your bet back. Click start new round.";
            canPlayerHit = false;
            canStartNewRound = true;
            canPlayerStand = false;
            winnings = "tie";
            updateCurrency();
        } else if (updateTotal(playerArray) == 21 && updateTotal(dealerArray) < 17 ) {
            dealerHit();
            canPlayerHit = false;
        }
    }
}

function checkDealerTotal(){
    if (updateTotal(dealerArray) > 21)
    {
        outcomeText.innerText = "You have won your bet! Click start new round.";
        winnings = "1";
    } else if (updateTotal(dealerArray) == 21 && updateTotal(playerArray) !== 21){
        outcomeText.innerText = "Dealer wins! You lost your bet. Click start new round.";
        winnings = "lose";
    } else if (updateTotal(dealerArray) > 17 && updateTotal(dealerArray) > updateTotal(playerArray)){
        outcomeText.innerText = "Dealer wins! You lost your bet. Click start new round.";
        winnings = "lose";
    } else if (updateTotal(dealerArray) == 21 && updateTotal(playerArray) == 21){
        outcomeText.innerText = "It's a tie! You get your bet back. Click start new round.";
        winnings = "tie";
    } else {
        compareTotals();
    }
    canStartNewRound = true;
    canPlayerStand = false;
    updateCurrency();
}

function compareTotals(){
    if(updateTotal(dealerArray) > 21){
        checkDealerTotal()
    } else if (updateTotal(playerArray) > updateTotal(dealerArray)){
        outcomeText.innerText = "You have won your bet! Click start new round.";
        winnings = "1";
    } else if (updateTotal(playerArray) < updateTotal(dealerArray)) {
        outcomeText.innerText = "Dealer wins! You lost your bet. Click start new round.";
        winnings = "lose";
    } else if (updateTotal(playerArray) == updateTotal(dealerArray)) {
        outcomeText.innerText = "It's a tie! You get your bet back. Click start new round.";
        winnings = "tie";
    }
    canStartNewRound = true;
    canPlayerStand = false;
    updateCurrency();
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

        if(updateTotal(playerArray) == 21) {
            showDealerCard();
            outcomeText.innerText = "BLACKJACK! You win 1.5 times your bet. Click start new round.";
            canPlayerHit = false;
            canPlayerStand = false;
            canStartNewRound = true;
            winnings = "1.5";
            updateCurrency();
        }

        canPlayerHit = true;
        canPlayerStand = true;
        placeBetText.innerText = "";

    }
}

//clear table - remove card images, player total, hand outcome, refresh the deck and empty dealer and player array
function clearTable(){
    if(canStartNewRound == true) {
        dealerCards.innerHTML = "";
        playerCards.innerHTML = "";
        playerTotal.innerText = "";
        outcomeText.innerText = "";
        playerBet.innerHTML = "";
        refreshDeck();
        document.getElementById("betform").reset();
        playerArray = [];
        dealerArray = [];
        canPlayerStand = false;
        canPlayerHit = false;
        hasBet = false;

        placeBetText.innerText = "Submit your bet below & deal!";
    }
}

//*** HANDLERS ***//

document.querySelector('.deal').addEventListener("click", dealCards);
document.querySelector('.hit').addEventListener("click", playerHit);
document.querySelector('.stand').addEventListener("click", stand);
document.querySelector('.newround').addEventListener("click", function(){
    document.querySelector('.deal').addEventListener("click", dealCards);
    clearTable();
})
document.querySelector('#bet-submit').addEventListener("click", getBet);


//*** ON LOAD ***//
getCurrency();

