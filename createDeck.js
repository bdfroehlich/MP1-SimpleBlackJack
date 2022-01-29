//set up card value array, suit array and empty deck class to push card objects into

let cardValue = [2,3,4,5,6,7,8,9,10,'Jack','Queen','King','Ace'];

let cardSuit = ['Clubs','Diamonds','Hearts','Spades'];

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
}

class Deck {
    constructor(){
        this.deck = [];
    }

    createDeck(cardValue,cardSuit){
        for(let value of cardValue){
            for(let suit of cardSuit){
                this.deck.push(new Card(value, suit))
            }
        }
        return this.deck;
    }
}

//create deck
const deck = new Deck();
deck.createDeck(cardValue,cardSuit)
console.log(deck)

//convert deck object to an array
const deckArray = Object.values(deck)
console.log(deckArray)

//insert key-value pair conditionally to the deckArray



// function weightedDeck(array) {array.map(element => {
//         if(typeof(element.value) == 'number') {
//                 element.weightvalue = element.value;
//         } else if (element.value == 'Jack' || element.value == 'Queen' || element.value == 'King') {
//                 element.weightvalue = 10;
//         } else if (element.value == 'Ace'){
//                 element.weightvalue = 11;
//         }
// })
// };

// console.log(addCardValue(deck))
