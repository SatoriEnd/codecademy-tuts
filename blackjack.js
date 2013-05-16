// Card Constructor
function cardConstructor(suit, number){
    var cardSuit = suit;
    var cardNumber = number;
    // Return the card face value
    this.getNumber = function(){
        return cardNumber;
    };
    // Return  the card suit value
    this.getSuit = function(){
        return cardSuit;
    };
    // Return the face value of the card
    // 1 || 11 are Ace cards, we'll factor out
    // how to score them later, 2 - 10 should
    // return face value, and 11 - 13 should return 10
    this.getValue = function(){
        if(cardNumber > 10){
            return 10;
        }else if (cardNumber > 1){
            return cardNumber;
        }else{
            return 11;
        }
    };
}

// Dealing out cards is relatively straight forward,
// we build a card object, by calling the card 
// constructor and feeding it two random values.
function deal(){
        var suit = Math.floor(Math.random() * 4)+1;
        var number = Math.floor(Math.random() * 13)+1;
        var Card = new cardConstructor(suit, number);
        return Card;
}

// The hand is the majority of our work horse. We 
// need an array to hold our hand (this would work)
// better as a linked list in the future, but for 
// the sake of this exercise..
//
// Then we pre-load it with two cards by calling deal();
// twice. This allows us to get the score value, and
// display the card suits and values (for error checking),
// and eventually so we can see what we actually have to 
// work with.
function hand(){
    var inHand = [];
        
    // Kind of pointless at this point, this method
    // returns what is currently in the inHand array
    // to an outside source.
    this.getHand = function(){
        inHand[0] = new deal();
        inHand[1] = new deal();
        return inHand;
    };

    // This method gathers the point values of the cards
    // adds them up, and displays it for the player's 
    // decision to hit, or stay
    // 
    // The HandlingAces exercise has us determine if
    // the score is > 21 and there is one or more aces
    // in the hand. If either condition is true, the
    // value of the aces should be reduced to 1 instead
    // of 11.
    this.score = function(){
        var sum = 0;
        var aces = 0;
        for (var i = 0; i < inHand.length; i++){
            sum += inHand[i].getValue();
            if(inHand[i].getNumber() === 1){
                aces++;
            }
        }
        while ((aces > 0) && (sum > 21))
        {
            sum -= 10;
            aces--;
        }
        //console.log("Aces: " + aces);
        //return console.log("Points: " + sum);
        return sum;
    };
    
    // The sizeable switch in this determines if the card
    // in a given array is an Ace, number, or face
    // card. Then it displays the output in a 
    // pretty, user friendly format.
    this.printHand = function(){
        for(var i = 0; i < inHand.length; i++){
            switch(inHand[i].getNumber()){
                
                case 1:
                    if(inHand[i].getSuit() === 1){
                        console.log("Card #"+i+" Ace of Spades");
                    }else if(inHand[i].getSuit() === 2){
                        console.log("Card #"+i+" Ace of Hearts");
                    }else if(inHand[i].getSuit() === 3){
                        console.log("Card #"+i+" Ace of Clubs");
                    }else if(inHand[i].getSuit() === 4){
                        console.log("Card #"+i+" Ace of Diamonds");
                    }
                break;

                case 11:
                    if(inHand[i].getSuit() === 1){
                        console.log("Card #"+i+" Jack of Spades");
                    }else if(inHand[i].getSuit() === 2){
                        console.log("Card #"+i+" Jack of Hearts");
                    }else if(inHand[i].getSuit() === 3){
                        console.log("Card #"+i+" Jack of Clubs");
                    }else if(inHand[i].getSuit() === 4){
                        console.log("Card #"+i+" Jack of Diamonds");
                    }
                break;
                
                case 12:
                    if(inHand[i].getSuit() === 1){
                        console.log("Card #"+i+" Queen of Spades");
                    }else if(inHand[i].getSuit() === 2){
                        console.log("Card #"+i+" Queen of Hearts");
                    }else if(inHand[i].getSuit() === 3){
                        console.log("Card #"+i+" Queen of Clubs");
                    }else if(inHand[i].getSuit() === 4){
                        console.log("Card #"+i+" Queen of Diamonds");
                    }
                break;
                
                case 13:
                    if(inHand[i].getSuit() === 1){
                        console.log("Card #"+i+" King of Spades");
                    }else if(inHand[i].getSuit() === 2){
                        console.log("Card #"+i+" King of Hearts");
                    }else if(inHand[i].getSuit() === 3){
                        console.log("Card #"+i+" King of Clubs");
                    }else if(inHand[i].getSuit() === 4){
                        console.log("Card #"+i+" King of Diamonds");
                    }
                break;
                
                default:
                    if(inHand[i].getSuit() === 1){
                        console.log("Card #"+i+" "+inHand[i].getNumber()+" of Spades");
                    }else if(inHand[i].getSuit() === 2){
                        console.log("Card #"+i+" "+inHand[i].getNumber()+" of Hearts");
                    }else if(inHand[i].getSuit() === 3){
                        console.log("Card #"+i+" "+inHand[i].getNumber()+" of Clubs");
                    }else if(inHand[i].getSuit() === 4){
                        console.log("Card #"+i+" "+inHand[i].getNumber()+" of Diamonds");
                    }
            }
            //console.log("Card " + i + " Number: " + inHand[i].getNumber());
            //console.log("Card " + i + " Suit: " + inHand[i].getSuit());
            //console.log("Card " + i + " Value: " + inHand[i].getValue());
        }
    };
    
    // This function will push a new card onto the 
    // inHand array setup by getHand.
    this.hitMe = function(){
        inHand.push(deal());
    };
}

// Setups up a dealer object, grabs a new hand
// then  checks if the hand value is lower than 17.
// Once the score is above 17 it returns the hand
// to the calling function (playGame) for score
// determination.
function playAsDealer(){
    var dealer = new hand();
    dealer.getHand();
    console.log("Dealer's hand is:");
    dealer.printHand();
    while (dealer.score() < 17){
        console.log("Dealer hits.");
        dealer.hitMe();
        console.log("Dealer's hand is:");
        dealer.printHand();
    }
    return dealer;
}

// Setups up a player object, grabs a new hand
// then draws out the worst in people..
// Actually it checks if the player wants to add
// a card to their hand. At the end of it all
// it returns the hand to the calling function
// (playGame) for score determination.
function playAsUser(){
    var player = new hand();
    player.getHand();
    console.log("Your hand so far:");
    player.printHand();
    player.score();    
    var decision = confirm("Hit OK to hit (take another card) or Cancel to stand");
    while (decision){
        console.log("Adding a card...");
        player.hitMe();
        player.printHand();
        decision = confirm("Do you want to hit again?");
        console.log("\n");
    }
    console.log("\n");
    return player;
}


// This determines who won a given game by checking that the 
// user's hand didn't go over 21, but was above the dealer's
// hand value. 
function declareWinner(userHand, dealerHand){
    // console.log("Declare Winner.");
    if(((userHand > dealerHand)&&(userHand<=21))||((dealerHand > 21)&&(userHand < 21))){
        return "You win!";
    }else if((userHand === dealerHand) && (userHand <= 21)){
        return "You tied!";
    }else{
        return "You lose!";
    }
}

// Runs the game by generating two third level
// objects (playerScore/dealerScore), and running
// them through all of our game logic
function playGame(){
    var playerScore = playAsUser();
    // console.log("Player hand: ");
    // playerScore.printHand();
    console.log("Player score: " + playerScore.score());
    var dealerScore = playAsDealer();
    // console.log("Dealer hand: ");
    // dealerScore.printHand();
    console.log("Dealer score: " + dealerScore.score());
    var winMessage = declareWinner(playerScore.score(), dealerScore.score());
    console.log(winMessage);
}

playGame();