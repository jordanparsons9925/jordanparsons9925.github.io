var lose = false; // is the user in a state of loss?
var animateSpeed; // speed at which the animation will move
var currentSpeed = 1.2; // the current game speed based on round progression
var numSymbols = 3; // the number of symbols in the sequence
var currentRound = 1; // the current round the user is on
var totalSymbols = 4; // the total number of unique symbols ingame, can be adjusted
                      // to add more symbols beyond the main four
var playerScore = 0; // the score that the player has
var playerTimeLimit = 4;
var currentSequence;
var timeLimit;
var playerHitNum;

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
        }, 100);
    });
}

function checkPlayerAnswer(playerAnswer) {
    if (playerAnswer == currentSequence[playerHitNum] && playerHitNum == currentSequence.length - 1) {
        endPlayer();
        return true;
    } else if (playerAnswer == currentSequence[playerHitNum]) {
        playerHitNum++;
        return false;
    } else {
        lose = true;
        endPlayer();
        return true;
    }
}

function endPlayer() {
    clearInterval(timeLimit);
    $("playerPortion").style.animation = "";
    $("playerPortion").style.animationDirection = "reverse";
    $("playerPortion").style.opacity = 0;
    $("ClubButton").disabled = true;
    $("DiamondButton").disabled = true;
    $("HeartButton").disabled = true;
    $("SpadeButton").disabled = true;
}

// the function that resolves the player input promise and changes the result to win
// or lose depending on how the player plays
function playerInput(x) {
    playerHitNum = 0;
    $("displayImage1").style.display = "none";
    $("playerPortion").style.animation = "";
    $("playerPortion").style.animationDuration = "2s";
    $("playerPortion").style.animationDirection = "initial";
    $("playerPortion").style.opacity = 1;

    $("ClubButton").disabled = false;
    $("DiamondButton").disabled = false;
    $("HeartButton").disabled = false;
    $("SpadeButton").disabled = false;
    

    secondsLeft = playerTimeLimit;
    $("timeLeft").innerText = "Seconds Left: " + secondsLeft--;
    return new Promise(resolve => {
        $("ClubButton").onclick = function() {
            if (checkPlayerAnswer("../symbols/Club.png")) {
                resolve(x);
            }
        };
        $("DiamondButton").onclick = function() {
            if (checkPlayerAnswer("../symbols/Diamond.png")) {
                resolve(x);
            }
        };
        $("HeartButton").onclick = function() {
            if (checkPlayerAnswer("../symbols/Heart.png")) {
                resolve(x);
            }
        };
        $("SpadeButton").onclick = function() {
            if (checkPlayerAnswer("../symbols/Spade.png")) {
                resolve(x);
            }
        };
        $("playerPortion").style.animation = "none";
        timeLimit = setInterval(() => {
            if (secondsLeft < 0) {
                lose = true;
                endPlayer();
                resolve(x);
            } else {
                $("timeLeft").innerText = "Seconds Left: " + secondsLeft--;
            }
        }, 1000);
    });
    
}

var buildSequence = function() {
    var symbolArray = [];
    for (var i = 0; i < numSymbols; i++) {
        genNum = Math.floor(Math.random() * (5 - 1) + 1); // from mozilla's javascript documentation
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
                symbolArray.push("../symbols/Spade.png");
                break;
        }
    }
    
    return symbolArray;
}

// main game loop
gameSequence();
async function gameSequence() {
    while (!lose) {
        currentSequence = buildSequence();
        console.log(currentSequence);
        animateSpeed = 1.2;
        playerTimeLimit = numSymbols * 1;
        
        $("displayImage1").style.display = "block";
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
        if (!lose) {
            console.log("Good job!");
        } else {
            console.log("You lose!");
        }
    }
}
