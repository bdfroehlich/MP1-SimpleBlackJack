//set up card value array, suit array, CARDWEIGHT dictionary and create deck
let cardValue = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];

let cardSuit = ['clubs','diamonds','hearts','spades'];

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

function createDeck() {
    return cardValue.flatMap(value => {
        return cardSuit.map(suit =>{
            return new Card(value,suit)
        })
    })
}

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

class Queue {
   
    constructor(){
      
      this.data = [];
      this.rear = 0;
    }
    
    enqueue(element) {
           this.data[this.rear] = element;
           this.rear = this.rear + 1;
   }
   length() {
     
      return this.rear;
   }
   isEmpty() {
    
     return this.rear === 0;
   }
   getFront() {
    
     if(this.isEmpty() === false) {
         return this.data[0];
     }
   }
   getLast() {
     
      if(this.isEmpty() === false) {
        
           return this.data[ this.rear - 1 ] ;
      }
   }
   dequeue() {
    
      if(this.isEmpty() === false) {
           
           this.rear = this.rear-1;
           return this.data.shift();
      }
   }
   print() { 
    for(let i =0; i < this.rear; i++) {
       console.log(this.data[i]);
     }
   }
    clear() {
       this.data.length = 0;
       this.rear = 0;
    }
 }

function getCardImageName(card){
    return `${card.value}_of_${card.suit}.png`
}


