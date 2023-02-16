var newScore = true;

// this function retrieves the numerical score value from the scoreboard
var getCurrentScore = function(currentScore) {
  var scoreArray = currentScore.split("-");
  return parseInt(scoreArray[scoreArray.length - 1]);
}

// this function generates a new score object based on whether the
// player has made it or not
var getNewScores = function(scoresObject, playerName, playerScore) {
  if (playerScore > getCurrentScore(scoresObject.record.scores.first)) {
    scoresObject.record.scores.tenth = scoresObject.record.scores.ninth;
    scoresObject.record.scores.ninth = scoresObject.record.scores.eighth;
    scoresObject.record.scores.eighth = scoresObject.record.scores.seventh;
    scoresObject.record.scores.seventh = scoresObject.record.scores.sixth;
    scoresObject.record.scores.sixth = scoresObject.record.scores.fifth;
    scoresObject.record.scores.fifth = scoresObject.record.scores.fourth;
    scoresObject.record.scores.fourth = scoresObject.record.scores.third;
    scoresObject.record.scores.third = scoresObject.record.scores.second;
    scoresObject.record.scores.second = scoresObject.record.scores.first;
    scoresObject.record.scores.first = playerName + " - " + playerScore;

  } else if (playerScore > getCurrentScore(scoresObject.record.scores.second)) {
    scoresObject.record.scores.tenth = scoresObject.record.scores.ninth;
    scoresObject.record.scores.ninth = scoresObject.record.scores.eighth;
    scoresObject.record.scores.eighth = scoresObject.record.scores.seventh;
    scoresObject.record.scores.seventh = scoresObject.record.scores.sixth;
    scoresObject.record.scores.sixth = scoresObject.record.scores.fifth;
    scoresObject.record.scores.fifth = scoresObject.record.scores.fourth;
    scoresObject.record.scores.fourth = scoresObject.record.scores.third;
    scoresObject.record.scores.third = scoresObject.record.scores.second;
    scoresObject.record.scores.second = playerName + " - " + playerScore;

  } else if (playerScore > getCurrentScore(scoresObject.record.scores.third)) {
    scoresObject.record.scores.tenth = scoresObject.record.scores.ninth;
    scoresObject.record.scores.ninth = scoresObject.record.scores.eighth;
    scoresObject.record.scores.eighth = scoresObject.record.scores.seventh;
    scoresObject.record.scores.seventh = scoresObject.record.scores.sixth;
    scoresObject.record.scores.sixth = scoresObject.record.scores.fifth;
    scoresObject.record.scores.fifth = scoresObject.record.scores.fourth;
    scoresObject.record.scores.fourth = scoresObject.record.scores.third;
    scoresObject.record.scores.third = playerName + " - " + playerScore;
    
  } else if (playerScore > getCurrentScore(scoresObject.record.scores.fourth)) {
    scoresObject.record.scores.tenth = scoresObject.record.scores.ninth;
    scoresObject.record.scores.ninth = scoresObject.record.scores.eighth;
    scoresObject.record.scores.eighth = scoresObject.record.scores.seventh;
    scoresObject.record.scores.seventh = scoresObject.record.scores.sixth;
    scoresObject.record.scores.sixth = scoresObject.record.scores.fifth;
    scoresObject.record.scores.fifth = scoresObject.record.scores.fourth;
    scoresObject.record.scores.fourth = playerName + " - " + playerScore;
    
  } else if (playerScore > getCurrentScore(scoresObject.record.scores.fifth)) {
    scoresObject.record.scores.tenth = scoresObject.record.scores.ninth;
    scoresObject.record.scores.ninth = scoresObject.record.scores.eighth;
    scoresObject.record.scores.eighth = scoresObject.record.scores.seventh;
    scoresObject.record.scores.seventh = scoresObject.record.scores.sixth;
    scoresObject.record.scores.sixth = scoresObject.record.scores.fifth;
    scoresObject.record.scores.fifth = playerName + " - " + playerScore;
    
  } else if (playerScore > getCurrentScore(scoresObject.record.scores.sixth)) {
    scoresObject.record.scores.tenth = scoresObject.record.scores.ninth;
    scoresObject.record.scores.ninth = scoresObject.record.scores.eighth;
    scoresObject.record.scores.eighth = scoresObject.record.scores.seventh;
    scoresObject.record.scores.seventh = scoresObject.record.scores.sixth;
    scoresObject.record.scores.sixth = playerName + " - " + playerScore;
    
  } else if (playerScore > getCurrentScore(scoresObject.record.scores.seventh)) {
    scoresObject.record.scores.tenth = scoresObject.record.scores.ninth;
    scoresObject.record.scores.ninth = scoresObject.record.scores.eighth;
    scoresObject.record.scores.eighth = scoresObject.record.scores.seventh;
    scoresObject.record.scores.seventh = playerName + " - " + playerScore;
    
  } else if (playerScore > getCurrentScore(scoresObject.record.scores.eighth)) {
    scoresObject.record.scores.tenth = scoresObject.record.scores.ninth;
    scoresObject.record.scores.ninth = scoresObject.record.scores.eighth;
    scoresObject.record.scores.eighth = playerName + " - " + playerScore;
    
  } else if (playerScore > getCurrentScore(scoresObject.record.scores.ninth)) {
    scoresObject.record.scores.tenth = scoresObject.record.scores.ninth;
    scoresObject.record.scores.ninth = playerName + " - " + playerScore;
    
  } else if (playerScore > getCurrentScore(scoresObject.record.scores.tenth)) {
    scoresObject.record.scores.tenth = playerName + " - " + playerScore;
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
