//*** VARIABLES ***///
var deck = new Deck();
deck.shuffleDeck();
// let cardSound = new Audio("assets/Audio/240777__f4ngy__dealing-card.wav");

var isDealClicked = false;
var canPlayerHit = false;
var canPlayerStand = false;
var hasBet = false;
var canStartNewRound = false;
var currencyTotal = "1000";
var winnings = "none";

let playerArray: (number | string | boolean )[] = [];
let dealerArray: (number | string | boolean )[] = [];

//*** HTML SELECTOR CONSTANTS ***///
const dealerCards = document.querySelector(".dealer-cards") as HTMLElement;
const playerCards = document.querySelector(".player-cards") as HTMLElement;
const playerTotal = document.querySelector(".player-total-text") as HTMLElement;
const outcomeText = document.querySelector(".outcome-text") as HTMLElement;
const currency = document.querySelector(".player-currency-text") as HTMLElement;
const playerBet =  document.querySelector(".player-bet-text") as HTMLElement;
const placeBetText = document.getElementById("submit-alert") as HTMLElement;
const alertPlayer = document.getElementById("zero-alert") as HTMLElement;

//*** BET LOGIC & PLAYER CURRENCY FUNCTIONALITY ***//
function getCurrency(){
    currency.innerText = currencyTotal;
    canStartNewRound = false;
}

function checkForZero(){
    if(currency.innerText == "0"){
        alertPlayer.innerText = "You have lost all your money! Ask the dealer for more by refreshing the page."
        outcomeText.innerText = "Dealer wins! You lost your bet."
        canStartNewRound = false;
    }
}

function placeBet() {
        if(hasBet == false){
            var betEle = document.getElementById("bet") as HTMLInputElement;
            var bet = parseInt(betEle.value)
            let newTotal = parseInt(currencyTotal) - bet;
            if(newTotal < 0){
                alertPlayer.innerText = "You can't bet more money than you have!";
                hasBet = false;
            } else {
                playerBet.innerHTML = bet.toString();
                placeBetText.innerText = "";
                alertPlayer.innerText = "";
                hasBet = true;
                canStartNewRound = false;
                currency.innerText = (parseInt(currencyTotal) - bet).toString();
                currencyTotal = currency.innerText;
            }
        }
    return playerBet.innerHTML;
}

function updateCurrency() {
    var betNum = parseInt(placeBet());
    var currencyTotalNum = parseInt(currencyTotal);
    if(winnings == "1"){
        currency.innerText = (currencyTotalNum + (betNum*2)).toString()
    } else if (winnings == "1.5"){
        currency.innerText = (currencyTotalNum + (betNum*2.5)).toString()
    } else if (winnings == "lose"){
        currency.innerText = currencyTotalNum.toString();
    } else if (winnings == "tie") {
        currency.innerText = (currencyTotalNum + betNum).toString();
    }
    betNum = 0;
    winnings = "none";
    currencyTotal = currency.innerText;
    canStartNewRound = true;
    checkForZero();
}


//*** PLAYER ***//

//create image element associated with first card off top of deck
function dealPlayerCard(){
    // cardSound.play();
    var createImage = document.createElement("img");
    createImage.src = getPlayerCard(drawTopCard());
    createImage.alt = "A picture of a playing card."
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
    // cardSound.play();
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
    }
    updateTotal(dealerArray);
    checkDealerTotal();
}

//player can stand (stop hitting) at which time the dealer will hit or show their cards to end the round
function stand(){
    if(canPlayerStand == true){
    canPlayerHit = false;
    showDealerCard();
    checkDealerTotal();
    }
}

//check total weighted value of cards in hand
function updateTotal(array: (any)[]){
    let sum = 0;
    for(let i=0; i < array.length; i++){
        // console.log(array[i])
        sum += array[i].weight;
    }
    return sum;
}

//*** COMPARATIVE LOGIC & VALUE CHECKING ***//
function checkPlayerTotal(){
    if (updateTotal(playerArray) > 21)
    {
        showDealerCard();
        outcomeText.innerText = "Dealer wins! You lost your bet. Click start new round.";
        winnings = "lose";
        updateCurrency();
    } else if (updateTotal(playerArray) == 21) {
        showDealerCard();
        if(updateTotal(playerArray) == updateTotal(dealerArray)){
            outcomeText.innerText = "It's a tie! You get your bet back. Click start new round.";
            winnings = "tie";
            updateCurrency();
        } else if (updateTotal(playerArray) == 21 && updateTotal(dealerArray) < 17 ) {
            dealerHit();
            canPlayerHit = false;
        } else if (updateTotal(playerArray) == 21 && updateTotal(dealerArray) >= 17 ) {
            outcomeText.innerText = "You have won your bet! Click start new round.";
            winnings = "1";
            updateCurrency();
        }
        canPlayerHit = false;
        canStartNewRound = true;
        canPlayerStand = false;
    }
}

function checkDealerTotal(){
    if(updateTotal(dealerArray) < 17){
        dealerHit();
    }else if (updateTotal(dealerArray) > 21)
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
        checkDealerTotal();
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
    if(isDealClicked == false) { 
        this.removeEventListener("click", dealCards);
    }
    
    if (hasBet == true){
        setTimeout(function() {
            dealPlayerCard();
        }, 500);

        setTimeout(function() {
            dealDealerCard(false);
        }, 1000);

        setTimeout(function() {
            dealPlayerCard();
        }, 1500);

        setTimeout(function() {
            dealDealerCard();
        }, 2000);

        setTimeout(function() {
            updatePlayerTotal();
            
    
            if(updateTotal(playerArray) == 21) {
                showDealerCard();
                outcomeText.innerText = "BLACKJACK! You win 1.5 times your bet. Click start new round.";
                canPlayerHit = false;
                canPlayerStand = false;
                canStartNewRound = true;
                winnings = "1.5";
                updateCurrency();
            }
            checkPlayerTotal();
            canPlayerHit = true;
            canPlayerStand = true;
            placeBetText.innerText = "";
        }, 2000);
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
        placeBetText.innerText = "Submit your bet below & hit Deal above!";
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
document.querySelector('#bet-submit').addEventListener("click", placeBet);


//*** ON LOAD ***//

window.onload = function() {
    getCurrency();
}