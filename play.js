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