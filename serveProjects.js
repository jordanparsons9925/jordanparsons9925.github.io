var projectTitle = document.getElementById("project_title");
var projectText = document.getElementById("project_text");
var projectPics = document.getElementById("project_pics");
var mainFadedYet = sessionStorage.getItem("mainFadedYet");
var projDisplay = sessionStorage.getItem("projDisplay");

document.getElementById("symbol_memory").addEventListener("click", function() {displayProject(0)});
document.getElementById("symbol_memory").addEventListener("touchend", function() {displayProject(0)});
document.getElementById("symbol_memory_2").addEventListener("click", function() {displayProject(1)});
document.getElementById("symbol_memory_2").addEventListener("touchend", function() {displayProject(1)});
document.getElementById("learning_lizards").addEventListener("click", function() {displayProject(2)});
document.getElementById("learning_lizards").addEventListener("touchend", function() {displayProject(2)});

if (mainFadedYet) {
    document.getElementsByTagName("h1")[0].style.animationName = "none";
    document.getElementById("projects_title").style.animationName = "none";
    document.getElementById("project_list").style.animationName = "none";
    document.getElementsByTagName("h1")[0].style.opacity = 1;
    document.getElementById("projects_title").style.opacity = 1;
    document.getElementById("project_list").style.opacity = 1;
} else {
    sessionStorage.setItem("mainFadedYet", true);
}

if (projDisplay != null) {
    document.getElementById("project_description").style.animationSpeed = 0;
    displayProject(parseInt(projDisplay));
    document.getElementById("project_description").style.opacity = 1;
}

function displayProject(projectName) {
    document.getElementById("project_description").style.animationName = "siteFade";
    switch (projectName) {
        case 0:
            projectTitle.innerText = "symbol memory";
            projectText.innerText = 
                "My first main school project. This one was an android app developed in thunkable. It was... challenging to get working right without extensive rewrites. Even then, the way the software worked ended up making the display of symbols erratic, causing players to lose pretty easily. ";
            projectText.innerHTML += "<a href=\"https://x.thunkable.com/copy/8312483dee6e057e48713f83019536d2\">Click here</a> to take a look!";
            projectPics.innerHTML = "<img src=\"symbol-memory/images/Title Logo.png\"></img>";
            sessionStorage.setItem("projDisplay", 0);
            break;
        case 1:
            projectTitle.innerText = "symbol memory 2";
            projectText.innerText = 
                "My second main school project. Written in JavaScript, Symbol Memory 2 is a sequel that improves on the original in every way. The speed is now limited, with the difficulty established in both the speed of symbols and number of symbols displayed. It even incorporates an online scoreboard system. ";
            projectText.innerHTML += "<a href=\"https://jordanparsons9925.github.io/symbol-memory\">Click here</a> to have a go!";
            projectPics.innerHTML = "<img src=\"symbol-memory/images/Title Logo.png\"></img>";
            sessionStorage.setItem("projDisplay", 1);
            break;
        case 2:
            projectTitle.innerText = "learnin' lizards";
            projectText.innerText = 
                "My third main school project. It was developed in Unity, using C# scripts, and exported to WebGL. Learnin' Lizards is my first attempt at both a Unity project, and a Machine Learning project. After a long time, and various generations, the lizard will eventually learn to walk and complete the course. When it's finished, you will be able to try it out ";
            projectText.innerHTML += "<a>here</a>!";
            projectPics.innerHTML = "";
            sessionStorage.setItem("projDisplay", 2);
            break;
        default:
            break;
    }
}
