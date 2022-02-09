# Simple Blackjack

## Project Description and Introduction
Simple Blackjack was created as an elementary version of the original Blackjack poker game. Simple Blackjack is played between the dealer and one player.

### Challenges
- The amount of comparative logic that went into checking the dealer and player hands when the turns ended.
- Adding weighted values for face cards until discovering the use of dictionaries and passing it into the Card class constructor.
- Correcting the log for placeBet and updateCurrency - after a new round was started and the player placed a new bet total currency reverted back to its original value.


### Future Features & Updates
- Make better use of classes, constructors and class methods.
- Implement other play features and bets including doubling down and splitting.
- Add logic for Aces to be equal to 1 or 11 if the player or dealers hand is greater than 21 but they have an Ace.
- Add media queries for different media types/devices and clean up styling.
- Set timeouts for dealing cards to they do not instantly appear on the screen.
- Sound files for theme music and a sound effect to be played when cards are dealt.


## Technologies
- Bootstrap v5.1
- HTML
- CSS
- Javascript


## Setup
To run this project in your browser launch it via the published link in the repository.


## How to Use
Upon launching the game the player will be prompted to place a bet. Once a bet is placed and submitted the player may hit the deal button to start the hand. Once the first two cards are dealt to the player and the dealer, the player can choose to hit (take another card) or stand (keep their current cards and allow the dealer to draw if they can). Once the dealer has drawn their cards the outcome of the hand will be displayed to the screen and the players bet amount will be added or taken away from their total currency depending on if they win or lose. After the outcome text has been displayed the player can start a new round.

Blackjack rules **Ammended for Simple Blackjack** [here.](https://www.ildado.com/blackjack_rules.html "This link will take you the rules of Blackjack.")


### Sources
PNGs of playing cards: [here.](https://code.google.com/archive/p/vector-playing-cards "This link will take you the deck of cards PNG download.")

