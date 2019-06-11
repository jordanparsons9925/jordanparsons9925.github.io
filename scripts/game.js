var lose = false; // is the user in a state of loss?
var animateSpeed; // speed at which the animation will move
var currentSpeed = 2; // the current game speed based on round progression
var numSymbols = 3; // the number of symbols in the sequence
var currentRound = 1; // the current round the user is on
var totalSymbols = 4; // the total number of unique symbols ingame, can be adjusted
                      // to add more symbols beyond the main four
var playerScore = 0; // the score that the player has

// token for retrieving elements in on the website by ID
var $ = function(ID) {
    return document.getElementById(ID);
};

// displays a symbol/number in the center of the screen
function displaySymbol() {
    console.log("This")
    $("displayImage1").style.animation = "";
    $("displayImage1").style.animationDuration = (animateSpeed + "s");
    var finishCount = setTimeout(function(){
        $("displayImage1").style.animation = "none";
        console.log("Here");
    }, animateSpeed * 1000);
};

function resolveAfterAnimation(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, animateSpeed * 1000 + 100);
    });
}

var buildSequence = function() {
    var symbolArray = [];
    for (var i = 0; i < numSymbols; i++) {
        genNum = Math.floor(Math.random() * (4 - 1) + 1); // from mozilla's javascript documentation
        switch (genNum) {
            case 1:
                symbolArray.push("../symbols/Club.png");
                break;
            case 2:
                symbolArray.push("../symbols/Diamond.png");
                break;
            case 3:
                symbolArray.push("../symbols/Heart.png");
                break;
            case 4:
                symbolArray.push("../symbols/Spade.png");
                break;
            default:
                break;
        }
    }
    $("displayImage1").src = symbolArray[0];
    
    return symbolArray;
}

// main game loop
while (!lose) {
    var currentSequence = buildSequence();
    console.log(currentSequence);
    animateSpeed = 1;
    displaySequence(currentSequence);
    async function displaySequence(currentSequence) {
        for await (const currentSymbol of currentSequence) {
            $("displayImage1").src = currentSymbol;
            displaySymbol();
            await resolveAfterAnimation("a");
        }
    }
    
    lose = true;
}