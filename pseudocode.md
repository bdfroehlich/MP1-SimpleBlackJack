*** deck creation and play ***
1. Need to create an array of a deck of 52 cards with suits and values
2. Is there a way to tie each corresponding suit / value to a png image of the specified card? 
    do we need to use css sprite? or maybe a regex to check the number value and suit value of 
    each PNG against the value and suit of the index in the deck array and assign the correct
    png to the image source for that card? This seems very convoluted...
3. The number cards will need to have a weighted value associated with its interger value and the face cards and ace
    will need to have weighted values as well.
4. Do we have to have a shuffle deck function or can the draw function just pick a random number from the deck array
    and remove it using .pop()
5. We need a new round or new game button that refresh the deck back to 52 cards
6. The deal function needs to give each player (dealer and player) 2 cards and the dealer cards need to be face down
7. Need functions to control player hit and player stand
8. Need function to control the dealer hit or stand depending on the conditonal that if the weighted value of the dealears cards is not 17
    the dealer hits until the weighted value is greater than 17
9. Need a function to check if the weighted value of cards is over 21 you automatically lose




