// code for updating scores, taken straight from the JSONBin website
// www.jsonbin.io
let req = new XMLHttpRequest();

// the scoreboard is displayed from the retrieved JSON
req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    var scoresObject = JSON.parse(req.responseText);
    document.getElementById("firstScore").innerHTML = "1<sup>st</sup> Place - " + scoresObject.scores.first;
    document.getElementById("secondScore").innerHTML = "2<sup>nd</sup> Place - " + scoresObject.scores.second;
    document.getElementById("thirdScore").innerHTML = "3<sup>rd</sup> Place - " + scoresObject.scores.third;
    document.getElementById("fourthScore").innerHTML = "4<sup>th</sup> Place - " + scoresObject.scores.fourth;
    document.getElementById("fifthScore").innerHTML = "5<sup>th</sup> Place - " + scoresObject.scores.fifth;
    document.getElementById("sixthScore").innerHTML = "6<sup>th</sup> Place - " + scoresObject.scores.sixth;
    document.getElementById("seventhScore").innerHTML = "7<sup>th</sup> Place - " + scoresObject.scores.seventh;
    document.getElementById("eighthScore").innerHTML = "8<sup>th</sup> Place - " + scoresObject.scores.eighth;
    document.getElementById("ninthScore").innerHTML = "9<sup>th</sup> Place - " + scoresObject.scores.ninth;
    document.getElementById("tenthScore").innerHTML = "10<sup>th</sup> Place - " + scoresObject.scores.tenth;

    document.getElementById("leaderboardScreen").style.animationName = "boardFadeIn";
    document.getElementById("leaderboardScreen").style.opacity = 1;
  }
};

req.open("GET", "https://api.jsonbin.io/v3/b/5d0574442808a77fb8096f53/latest", true);
req.setRequestHeader("X-Master-Key", "$2a$10$i1CbSe3/MA5qTHWLYi10h.aFktmulIwidRSjv8d3pz1hVlCWQC476");
req.send();
