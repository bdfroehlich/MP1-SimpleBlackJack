//***variables***
var deck = new Deck();
deck.shuffleDeck();

var isDealClicked = false;
var canHit = false;

let playerArray = [];
let dealerArray = [];


const dealerCards = document.querySelector(".dealer-cards");
const playerCards = document.querySelector(".player-cards");
const playerTotal = document.querySelector(".player-total")

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
    if(canHit == true){
        var createImage = document.createElement("img");
        createImage.src = getPlayerCard(drawTopCard());
        updatePlayerTotal();
        document.querySelector('.player-cards').appendChild(createImage);
        checkTotal()
    }
}


function stand(){

}

function updateTotal(array){
    let sum = 0;
    for(let i=0; i < array.length; i++){
        // console.log(array[i])
        sum += array[i].weight;
    }
    return sum;
}

function checkTotal(){
    if (updateTotal(playerArray) > 21)
    {
        console.log("player lost")
    }
}


function updatePlayerTotal(){
    document.querySelector(".player-total").innerHTML = 'Player Total: ' + updateTotal(playerArray)
}

function refreshDeck(){
    deck = new Deck();
    deck.shuffleDeck();
}

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

function clearTable(){
    dealerCards.innerHTML = "";
    playerCards.innerHTML = "";
    playerTotal.innerText = "";

    refreshDeck();
    playerArray = [];
    dealerArray = [];

}

//***handlers***
document.querySelector('.deal').addEventListener("click", dealCards)
document.querySelector('.hit').addEventListener("click", hitCard)
document.querySelector('.newround').addEventListener("click", function(){
    document.querySelector('.deal').addEventListener("click", dealCards)
    clearTable()

})
