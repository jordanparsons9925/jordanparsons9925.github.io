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
var displaySymbol = function(displayPic) {
    displayPic = "../symbols/" + displayPic + ".png";
    $("displayImage").src = displayPic;
    $("displayImage").style.animationDuration = (animateSpeed + "s");
};

var buildSequence = function() {
    var symbolArray = [];
    for (var i = 0; i < numSymbols; i++) {
        genNum = Math.floor(Math.random() * (4 - 1) + 1); // from mozilla's javascript documentation
        switch (genNum) {
            case 1:
                symbolArray.push("Club");
                break;
            case 2:
                symbolArray.push("Diamond");
                break;
            case 3:
                symbolArray.push("Heart");
                break;
            case 4:
                symbolArray.push("Spade");
                break;
            default:
                symbolArray.push("Club");
                break;
        }
    }
    return symbolArray;
}

// main game loop
while (!lose) {
    var currentSequence = buildSequence();
    console.log(currentSequence);
    var i = 0;
    animateSpeed = 2;
    displaySymbol(currentSequence[i++]);
    var countDown = setInterval(function(){
        displaySymbol(currentSequence[i++]);
    }, animateSpeed * 1000);
    var finishCount = setTimeout(function(){
        clearInterval(countDown);
        $("displayImage").style.animationPlayState = "paused";
    }, animateSpeed * 1000 * numSymbols);

    lose = true;
}