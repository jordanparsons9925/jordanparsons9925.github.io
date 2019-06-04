// code for updating scores
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
    scoresObject.scores.third = "Devi - 8";
    req.send(JSON.stringify(scoresObject));
}

/*fetch('https://api.jsonbin.io/b/5cf6808c3185c64c762c9961', {
    headers:{
      'Content-Type': 'application/json',
      'secret-key': '$2a$10$i1CbSe3/MA5qTHWLYi10h.aFktmulIwidRSjv8d3pz1hVlCWQC476'
    }
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    scoresObject = myJson;
    scoresObject.scores.first = "Kyle - 11";
    return scoresObject;
  })
  .then(function(scoresObject) {
    postNewScores(scoresObject);
  });

var postNewScores = function(scoresObject) {
fetch('https://api.jsonbin.io/b/5cf6808c3185c64c762c9961', {
  method: 'PUT',
  headers:{
    'Content-Type': 'application/json',
    'secret-key': '$2a$10$i1CbSe3/MA5qTHWLYi10h.aFktmulIwidRSjv8d3pz1hVlCWQC476',
    'versioning': 'false'
  },
  body: JSON.stringify(scoresObject)
}).then(res => res.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
};*/
