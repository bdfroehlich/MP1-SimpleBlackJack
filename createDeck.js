//set up card value array, suit array, CARDWEIGHT dictionary and create deck
let cardValue = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];

let cardSuit = ['clubs','diamonds','hearts','spades'];

//dictionary used to add weighted values to the face cards and ace
const CARDWEIGHT = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "jack": 10,
    "queen": 10,
    "king": 10,
    "ace": 11,
}

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
        this.weight = CARDWEIGHT[value];
        this.cardIsFaceUp = false;
    }

}

class Deck {
    constructor(cards = createDeck()) {
        this.cards = cards;
    }

    shuffleDeck() {
        this.cards = shuffleArray(this.cards);
    }

}

//creating the deck of cards using flatMap, using just map gave back and array with a length of 4 each with 13 cards
function createDeck() {
    return cardValue.flatMap(value => {
        return cardSuit.map(suit =>{
            return new Card(value,suit)
        })
    })
}


//shuffles the created deck - grabs a random index, and swaps it with the current index over the length of the array
// source: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {

        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

//grabs the next card for the players hand
function getPlayerCard(card){
    playerArray.push(card)
    return `assets/${card.value}_of_${card.suit}.png`
}

//grabs the next card for the dealers hand.. if cardIsFaceUp is passed as false that card is dealt face down
function getDealerCard(card){
    dealerArray.push(card)
    if (card.cardIsFaceUp) {
        return `assets/${card.value}_of_${card.suit}.png`
    }
    return `assets/backcard.png`
}

//draws the first card from the shuffled deck
function drawTopCard(){
    return deck.cards.shift();
}