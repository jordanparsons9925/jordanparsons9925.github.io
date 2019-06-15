// the events for clicking the yes and no buttons are attached
document.getElementById("yesButton").onclick = function() {
    var playerName = document.getElementById("playerName").value;
    var playerScore = sessionStorage.getItem("playerScore");
    updateScores(playerName, playerScore);
};
document.getElementById("noButton").onclick = function() { window.location.href = "scoreboard.html"; };