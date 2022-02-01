const deck = new Deck()
deck.shuffleDeck()
console.log(deck.cards)

//create new Queue to put our shuffled array of cards into a playQueue
let playQueue = new Queue()
deck.cards.map(element =>{
    playQueue.enqueue(element)
})

// console.log(playQueue.dequeue())
// console.log(playQueue.dequeue())
console.log(getCardImageName(playQueue.dequeue()))

function firstPlayerCard(){
    //create image element associated with first card off top of deck
    // var playerCard = getCardImageName(playQueue.dequeue());
    var createImage = document.createElement("img");
    createImage.src = "assets/3_of_hearts.png";
    document.body.appendChild(createImage);

}

function firstDealerCard(){
    //create image element associated with first card off top of deck
}

function secondPlayerCard(){
    //create image element associated with first card off top of deck
}

function secondDealerCard(){
    //create image element associated with first card off top of deck
}

function testCardImage(){
    for(let i=0; i<=10; i++){
        firstPlayerCard()
    }
}

testCardImage()