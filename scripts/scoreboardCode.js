// code for updating scores, taken straight from the JSONBin website
// www.jsonbin.io
let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    var scoresObject = JSON.parse(req.responseText);
    postNewScores(scoresObject);
  }
};

req.open("GET", "https://api.jsonbin.io/b/5cf68a2ee36bab4cf31198d8", true);
req.setRequestHeader("secret-key", "$2a$10$i1CbSe3/MA5qTHWLYi10h.aFktmulIwidRSjv8d3pz1hVlCWQC476");
req.send();

var postNewScores = function(scoresObject) {
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
          console.log(req.responseText);
        }
      };
      
    req.open("PUT", "https://api.jsonbin.io/b/5cf68a2ee36bab4cf31198d8", true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("secret-key", "$2a$10$i1CbSe3/MA5qTHWLYi10h.aFktmulIwidRSjv8d3pz1hVlCWQC476");
    req.setRequestHeader("versioning", "false");
    scoresObject.scores.fourth = "Hai - 7";
    req.send(JSON.stringify(scoresObject));
}
