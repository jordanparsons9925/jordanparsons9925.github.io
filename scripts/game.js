var lose = false; // is the user in a state of loss?
var animateSpeed; // speed at which the animation will move
var currentSpeed = 1.2; // the current game speed based on round progression
var numSymbols = 10; // the number of symbols in the sequence
var currentRound = 1; // the current round the user is on
var totalSymbols = 4; // the total number of unique symbols ingame, can be adjusted
                      // to add more symbols beyond the main four
var playerScore = 0; // the score that the player has
var playerTimeLimit = 4;
var playerInputArray;

// token for retrieving elements in on the website by ID
var $ = function(ID) {
    return document.getElementById(ID);
};

// displays a symbol/number in the center of the screen
function displaySymbol() {
    $("displayImage1").style.animation = "";
    $("displayImage1").style.animationDuration = (animateSpeed + "s");
    var finishCount = setTimeout(function(){
        $("displayImage1").style.animation = "none";
    }, animateSpeed * 1000);
};

// these two functions resolve promises for timing the display of symbols onscreen
function resolveAfterAnimation(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, animateSpeed * 1000 + 100);
    });
}
function resolveAfterLoad(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 1);
    });
}

// the function that resolves the player input promise and changes the result to win
// or lose depending on how the player plays
function playerInput(x) {
    $("playerPortion").style.animation = "";
    $("playerPortion").style.animationDuration = "2s";
    $("playerPortion").style.animationDirection = "initial";
    $("playerPortion").style.opacity = 1;

    $("ClubButton").removeAttribute("disabled");
    $("ClubButton").onclick = function() {
        $("timeLeft").innerText = "Club";
    };
    $("DiamondButton").removeAttribute("disabled");
    $("DiamondButton").onclick = function() {
        $("timeLeft").innerText = "Diamond";
    };
    $("HeartButton").removeAttribute("disabled");
    $("HeartButton").onclick = function() {
        $("timeLeft").innerText = "Heart";
    };
    $("SpadeButton").removeAttribute("disabled");
    $("SpadeButton").onclick = function() {
        $("timeLeft").innerText = "Spade";
    };

    secondsLeft = playerTimeLimit;
    $("timeLeft").innerText = "Seconds Left: " + secondsLeft--;
    return new Promise(resolve => {
        $("playerPortion").style.animation = "none";
        /*var timeLimit = setInterval(() => {
            if (secondsLeft < 0) {
                lose = true;
                clearInterval(timeLimit);
                $("playerPortion").style.animation = "";
                $("playerPortion").style.animationDirection = "reverse";
                $("playerPortion").style.opacity = 0;
                resolve(x);
            } else {
                $("timeLeft").innerText = "Seconds Left: " + secondsLeft--;
            }
        }, 1000);*/
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
    
    return symbolArray;
}

// main game loop
while (!lose) {
    var currentSequence = buildSequence();
    playerInputArray = [];
    console.log(currentSequence);
    animateSpeed = 1.2;
    playerTimeLimit = numSymbols * 1;
    gameSequence(currentSequence);
    async function gameSequence(currentSequence) {
        $("displayImage1").src = "../symbols/3.png";
        await resolveAfterLoad("a");
        displaySymbol();
        await resolveAfterAnimation("a");
        $("displayImage1").src = "../symbols/2.png";
        await resolveAfterLoad("a");
        displaySymbol();
        await resolveAfterAnimation("a");
        $("displayImage1").src = "../symbols/1.png";
        await resolveAfterLoad("a");
        displaySymbol();
        await resolveAfterAnimation("a");
        $("displayImage1").src = "../symbols/GO.png";
        await resolveAfterLoad("a");
        displaySymbol();
        await resolveAfterAnimation("a");
        animateSpeed = currentSpeed;
        for await (const currentSymbol of currentSequence) {
            $("displayImage1").src = currentSymbol;
            await resolveAfterLoad("a");
            displaySymbol();
            await resolveAfterAnimation("a");
        }
        $("playerPortion").style.animation = "none";
        await playerInput("a");
    }


    
    lose = true;
}