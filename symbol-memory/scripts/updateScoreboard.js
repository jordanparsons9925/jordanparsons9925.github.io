var newScore = true;

// this function retrieves the numerical score value from the scoreboard
var getCurrentScore = function(currentScore) {
  var scoreArray = currentScore.split("-");
  return parseInt(scoreArray[scoreArray.length - 1]);
}

// this function generates a new score object based on whether the
// player has made it or not
var getNewScores = function(scoresObject, playerName, playerScore) {
  if (playerScore > getCurrentScore(scoresObject.scores.first)) {
    scoresObject.scores.tenth = scoresObject.scores.ninth;
    scoresObject.scores.ninth = scoresObject.scores.eighth;
    scoresObject.scores.eighth = scoresObject.scores.seventh;
    scoresObject.scores.seventh = scoresObject.scores.sixth;
    scoresObject.scores.sixth = scoresObject.scores.fifth;
    scoresObject.scores.fifth = scoresObject.scores.fourth;
    scoresObject.scores.fourth = scoresObject.scores.third;
    scoresObject.scores.third = scoresObject.scores.second;
    scoresObject.scores.second = scoresObject.scores.first;
    scoresObject.scores.first = playerName + " - " + playerScore;

  } else if (playerScore > getCurrentScore(scoresObject.scores.second)) {
    scoresObject.scores.tenth = scoresObject.scores.ninth;
    scoresObject.scores.ninth = scoresObject.scores.eighth;
    scoresObject.scores.eighth = scoresObject.scores.seventh;
    scoresObject.scores.seventh = scoresObject.scores.sixth;
    scoresObject.scores.sixth = scoresObject.scores.fifth;
    scoresObject.scores.fifth = scoresObject.scores.fourth;
    scoresObject.scores.fourth = scoresObject.scores.third;
    scoresObject.scores.third = scoresObject.scores.second;
    scoresObject.scores.second = playerName + " - " + playerScore;

  } else if (playerScore > getCurrentScore(scoresObject.scores.third)) {
    scoresObject.scores.tenth = scoresObject.scores.ninth;
    scoresObject.scores.ninth = scoresObject.scores.eighth;
    scoresObject.scores.eighth = scoresObject.scores.seventh;
    scoresObject.scores.seventh = scoresObject.scores.sixth;
    scoresObject.scores.sixth = scoresObject.scores.fifth;
    scoresObject.scores.fifth = scoresObject.scores.fourth;
    scoresObject.scores.fourth = scoresObject.scores.third;
    scoresObject.scores.third = playerName + " - " + playerScore;
    
  } else if (playerScore > getCurrentScore(scoresObject.scores.fourth)) {
    scoresObject.scores.tenth = scoresObject.scores.ninth;
    scoresObject.scores.ninth = scoresObject.scores.eighth;
    scoresObject.scores.eighth = scoresObject.scores.seventh;
    scoresObject.scores.seventh = scoresObject.scores.sixth;
    scoresObject.scores.sixth = scoresObject.scores.fifth;
    scoresObject.scores.fifth = scoresObject.scores.fourth;
    scoresObject.scores.fourth = playerName + " - " + playerScore;
    
  } else if (playerScore > getCurrentScore(scoresObject.scores.fifth)) {
    scoresObject.scores.tenth = scoresObject.scores.ninth;
    scoresObject.scores.ninth = scoresObject.scores.eighth;
    scoresObject.scores.eighth = scoresObject.scores.seventh;
    scoresObject.scores.seventh = scoresObject.scores.sixth;
    scoresObject.scores.sixth = scoresObject.scores.fifth;
    scoresObject.scores.fifth = playerName + " - " + playerScore;
    
  } else if (playerScore > getCurrentScore(scoresObject.scores.sixth)) {
    scoresObject.scores.tenth = scoresObject.scores.ninth;
    scoresObject.scores.ninth = scoresObject.scores.eighth;
    scoresObject.scores.eighth = scoresObject.scores.seventh;
    scoresObject.scores.seventh = scoresObject.scores.sixth;
    scoresObject.scores.sixth = playerName + " - " + playerScore;
    
  } else if (playerScore > getCurrentScore(scoresObject.scores.seventh)) {
    scoresObject.scores.tenth = scoresObject.scores.ninth;
    scoresObject.scores.ninth = scoresObject.scores.eighth;
    scoresObject.scores.eighth = scoresObject.scores.seventh;
    scoresObject.scores.seventh = playerName + " - " + playerScore;
    
  } else if (playerScore > getCurrentScore(scoresObject.scores.eighth)) {
    scoresObject.scores.tenth = scoresObject.scores.ninth;
    scoresObject.scores.ninth = scoresObject.scores.eighth;
    scoresObject.scores.eighth = playerName + " - " + playerScore;
    
  } else if (playerScore > getCurrentScore(scoresObject.scores.ninth)) {
    scoresObject.scores.tenth = scoresObject.scores.ninth;
    scoresObject.scores.ninth = playerName + " - " + playerScore;
    
  } else if (playerScore > getCurrentScore(scoresObject.scores.tenth)) {
    scoresObject.scores.tenth = playerName + " - " + playerScore;
  } else {
    newScore = false;
  }
  return scoresObject;
}

// code for updating scores, taken straight from the JSONBin website
// www.jsonbin.io
function updateScores(playerName, playerScore) {
let req = new XMLHttpRequest();

// the scoreboard is retrieved from JSONbin
req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log(req.responseText);
    var scoresObject = JSON.parse(req.responseText);
    scoresObject = getNewScores(scoresObject, playerName, playerScore);
    if (newScore) {
      postNewScores(scoresObject);
    } else {
      sessionStorage.clear();
      window.location.href = "scoreboard.html";
    }
  }
};

req.open("GET", "https://api.jsonbin.io/v3/b/5d0574442808a77fb8096f53/latest", true);
req.setRequestHeader("X-Master-Key", "$2a$10$i1CbSe3/MA5qTHWLYi10h.aFktmulIwidRSjv8d3pz1hVlCWQC476");
req.send();

// the new scoreboard is sent to the bin
var postNewScores = function(scoresObject) {
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
          sessionStorage.clear();
          window.location.href = "scoreboard.html";
        }
      };
      
    req.open("PUT", "https://api.jsonbin.io/v3/b/5d0574442808a77fb8096f53", true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("X-Master-Key", "$2a$10$i1CbSe3/MA5qTHWLYi10h.aFktmulIwidRSjv8d3pz1hVlCWQC476");
    req.setRequestHeader("X-Bin-Versioning", "false");
    
    req.send(JSON.stringify(scoresObject));
}
}
