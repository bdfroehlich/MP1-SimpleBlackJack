# Simple Blackjack

## Project Description and Introduction
Simple Blackjack was created as an elementary version of the original Blackjack poker game. Simple Blackjack is played between the dealer and one player.

To play the game click [here.](https://bdfroehlich.github.io/MP1-SimpleBlackJack/?# "This link will take you to Simple Blackjack.")

### How to Use
Upon launching the game the player will be prompted to place a bet. Once a bet is placed and submitted the player may hit the deal button to start the hand. Once the first two cards are dealt to the player and the dealer, the player can choose to hit (take another card) or stand (keep their current cards and allow the dealer to draw if they can). Once the dealer has drawn their cards the outcome of the hand will be displayed to the screen and the players bet amount will be added or taken away from their total currency depending on if they win or lose. After the hand is finished the player can start a new round.

Blackjack rules **Ammended for Simple Blackjack** [here.](https://www.ildado.com/blackjack_rules.html "This link will take you the rules of Blackjack.")

### Setup
To run this project in your browser launch it via the published link in the repository or from the link above.

### Technologies
- Bootstrap v5.1
- HTML
- CSS
- Javascript

### Challenges
- The amount of comparative logic that went into checking the dealer and player hands when the turns ended.
- Adding weighted values for face cards until discovering the use of dictionaries and passing it into the Card class constructor.
- Correcting the logic for placeBet and updateCurrency so the players currency would not revert back to the default amount after each round.

### Future Features & Updates
- Make better use of class constructors and class methods.
- Implement other play features and bets including doubling down and splitting.
- Add logic for Aces to be equal to 1 or 11.
- Add media queries for different media types/devices and clean up styling.
- Sound files for theme music and a sound effect to be played when cards are dealt.
- Total currency needs to be a decimal.
- Add some CSS effects to make the cards being dealt appear to come off the center deck.

### Current Bugs To Be Fixed
- On initialization of the page the player bet is not accepted on the first submit. It must be submitted a second time. Betting will continue to work as intended after.

### Sources
PNGs of playing cards: [here.](https://code.google.com/archive/p/vector-playing-cards "This link will take you the deck of cards PNG download.")

