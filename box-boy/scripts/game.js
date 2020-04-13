// function for retrieving elements from the DOM
var $ = function(elementName) {
    return document.getElementById(elementName);
}

// getting the canvas and context, sets the gameState
var canvas = $("screen");
canvas.width = 1024;
canvas.height = 896;
var screen = canvas.getContext("2d");

// values for the keyboard key actions
var goJump = false;
var goRight = false;
var goLeft = false;

// the player character
var playerChar;

// the bounds for the game camera and some functions that manipulate it's position
let camera = {
    left: 0,
    right: 255,
    top: 0,
    bottom: 223
};
function cameraX(numPixels) {
    camera.left += numPixels;
    camera.right += numPixels;
}
function cameraY(numPixels) {
    camera.top += numPixels;
    camera.bottom += numPixels;
}

// class for gameObjects
class gameObject {

    // the constructor to create a game object
    constructor(objectID, sprite = new Image(1, 1), x = 0, y = 0, forceAffected = false, collider = true) {
        this.objectID = objectID;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.collider = collider;
        this.forceAffected = forceAffected;

        // if the object is impacted by forces, it will execute this code as well
        if (forceAffected) {
            this.xEnergy = 0;
            this.yEnergy = 0.1;
            this.left = false;
            this.leftHit = null;
            this.right = false;
            this.rightHit = null;
            this.top = false;
            this.topHit = null;
            this.bottom = false;
            this.bottomHit = null;
            this.bottomRecheck = false;

            // the function for checking collisions and applying forces
            this.applyForces = function () {

                // checking collisions
                
                for (var i = 0; i < gameObjects.length; i++) {
                    var currentObject = gameObjects[i];
                    if (currentObject.objectID != this.objectID && currentObject.collider) {
                        if (this.yEnergy == 0) {
                            this.bottomRecheck = true;
                            this.yEnergy = 0.1;
                        }
                        // bottom collisions
                        if (this.y < currentObject.y && 
                        this.y + this.height + this.yEnergy >= currentObject.y &&
                        this.x <= currentObject.x + currentObject.width - 1 && 
                        this.x + this.width - 1 >= currentObject.x) {
                            this.bottom = true;
                            this.bottomHit = currentObject.y;
                            break;
                        } else if (this.bottomRecheck) {
                            this.yEnergy = 0.1;
                            this.bottom = false;
                            this.bottomRecheck = false;
                        }

                        // top collisions
                        if (!this.top) {
                            if (this.y > currentObject.y + currentObject.height - 1 && 
                            this.y + this.yEnergy <= currentObject.y + currentObject.height - 1 &&
                            this.x <= currentObject.x + currentObject.width - 1 && 
                            this.x + this.width >= currentObject.x + 1) {
                                this.top = true;
                                this.topHit = currentObject.y + currentObject.height;
                                break;
                            }
                        }

                        // right collisions
                        if (this.x < currentObject.x && 
                        this.x + this.width + this.xEnergy - 1 >= currentObject.x &&
                        this.y <= currentObject.y + currentObject.height - 1 && 
                        this.y + this.height - 1 >= currentObject.y) {
                            this.right = true;
                            this.rightHit = currentObject.x - 1;
                            break;
                        } else {
                            this.right = false;
                        }

                        // left collisions
                        if (this.x > currentObject.x + currentObject.width - 1 && 
                        this.x + this.xEnergy <= currentObject.x + currentObject.width - 1 &&
                        this.y <= currentObject.y + currentObject.height - 1 && 
                        this.y + this.height - 1 >= currentObject.y) {
                            this.left = true;
                            this.leftHit = currentObject.x + currentObject.width;
                            break;
                        } else {
                            this.left = false;
                        }
                    }
                }

                // applying forces

                // down/gravity
                if (this.yEnergy >= 0) {
                    if (this.bottom) {
                        this.yEnergy = 0;
                        this.y = this.bottomHit - this.height;
                    } else {
                        if (this.top) {
                            this.top = false;
                        } else if (goJump) {
                            goJump = false;
                        } else if (this.yEnergy == 0) {
                            this.yEnergy = .1;
                        }
                        this.y += this.yEnergy;
                        if (this.yEnergy < 5) {
                            this.yEnergy += .1;
                        }
                    }
                    
                } else if (!goJump) {
                    this.yEnergy = .1;
                }

                // up / jump
                if (this.objectID == 'playerChar' && goJump) {
                    if (this.top) {
                        this.yEnergy = 0.1;
                        this.y = this.topHit;
                    } else {
                        this.y += this.yEnergy;
                        if (this.yEnergy <= 0) {
                            this.yEnergy += 0.1;
                        }
                    }
                }

                // left move
                if (this.xEnergy < 0) {
                    if (this.left) {
                        this.x = this.leftHit;
                        if (this.objectID == 'playerChar') {
                            this.yEnergy *= -this.xEnergy;
                            this.xEnergy = 2;
                            this.yEnergy -= 0.5;
                            this.left = false;
                        }
                    } else {
                        this.x += this.xEnergy;
                        if (goLeft && this.objectID == 'playerChar' && this.xEnergy > -2)
                            if (this.xEnergy <= -0.2) {
                                this.xEnergy -= 0.2;
                                playerChar.sprite = $('boxy_left');
                            } else {
                                this.xEnergy = 0;
                            }
                        else {
                            if (this.xEnergy <= -0.2)
                                this.xEnergy += 0.2;
                            else
                                this.xEnergy = 0;
                        }
                    }
                } else if (this.xEnergy > 0) {
                    if (this.right) {
                        this.x = this.rightHit - this.width + 1;
                        if (this.objectID == 'playerChar') {
                            this.yEnergy *= this.xEnergy;
                            this.xEnergy = -2;
                            this.yEnergy -= 0.5;
                            this.right = false;
                        }  
                    } else {
                        this.x += this.xEnergy;
                        if (goRight && this.objectID == 'playerChar' && this.xEnergy < 2)
                            if (this.xEnergy >= 0.2) {
                                this.xEnergy += 0.2;
                                playerChar.sprite = $('boxy_right');
                            } else {
                                this.xEnergy = 0;
                            }
                        else {
                            if (this.xEnergy >= 0.2)
                                this.xEnergy -= 0.2;
                            else
                                this.xEnergy = 0;
                        }
                    }
                } else {
                    if (goLeft) {
                        playerChar.xEnergy -= 0.2;
                    } else if (goRight) {
                        playerChar.xEnergy += 0.2;
                    }
                }
            };
        }
    }
}

// the array that holds all objects that are loaded into the level
let gameObjects = new Array();

// this function loads all necessary objects into the gameObject array
function loadObjects() {
    // the default camera position
    cameraY(800);
    cameraX(-10);

    // the first instruction icon
    var instruction_1 = new gameObject("instruction_1", $("instruction_1"), 105, 950, false, false);
    gameObjects.push(instruction_1);

    // starting platform
    var small_plat_left = new gameObject("small_plat_left", $("small_plat_left"), 0, 1000);
    gameObjects.push(small_plat_left);
    for (var x = 0; x < 8; x++) {
        var top_tile = new gameObject("top_tile", $("top_tile"), (x * $("top_tile").width) + 1, 1000);
        gameObjects.push(top_tile);
    }
    var small_plat_right = new gameObject("small_plat_right", $("small_plat_right"), 208, 1000);
    gameObjects.push(small_plat_right);

    // the second instruction icon
    var instruction_2 = new gameObject("instruction_2", $("instruction_2"), 250, 950, false, false);
    gameObjects.push(instruction_2);

    // level geometry
    small_plat_left = new gameObject("small_plat_left", $("small_plat_left"), 300, 950);
    small_plat_right = new gameObject("small_plat_right", $("small_plat_right"), 326, 950);
    gameObjects.push(small_plat_left);
    gameObjects.push(small_plat_right);

    small_plat_left = new gameObject("small_plat_left", $("small_plat_left"), 400, 900);
    small_plat_right = new gameObject("small_plat_right", $("small_plat_right"), 426, 900);
    gameObjects.push(small_plat_left);
    gameObjects.push(small_plat_right);

    small_plat_left = new gameObject("small_plat_left", $("small_plat_left"), 300, 845);
    small_plat_right = new gameObject("small_plat_right", $("small_plat_right"), 326, 845);
    gameObjects.push(small_plat_left);
    gameObjects.push(small_plat_right);

    small_plat_left = new gameObject("small_plat_left", $("small_plat_left"), 400, 790);
    gameObjects.push(small_plat_left);
    for (var x = 0; x < 3; x++) {
        var top_tile = new gameObject("top_tile", $("top_tile"), (x * $("top_tile").width) + 426, 790);
        gameObjects.push(top_tile);
    }
    small_plat_right = new gameObject("small_plat_right", $("small_plat_right"), 504, 790);
    gameObjects.push(small_plat_left);
    gameObjects.push(small_plat_right);

    var bottom_vertical = new gameObject("bottom_vertical", $("bottom_vertical"), 510, 710);
    gameObjects.push(bottom_vertical);
    for (var y = 1; y < 4; y++) {
        var middle_vertical = new gameObject("middle_vertical", $("middle_vertical"), 510, 710 - (26 * y));
        gameObjects.push(middle_vertical);
    }
    var top_vertical = new gameObject("top_vertical", $("top_vertical"), 510, 610);
    gameObjects.push(top_vertical);

    bottom_vertical = new gameObject("bottom_vertical", $("bottom_vertical"), 432, 710);
    gameObjects.push(bottom_vertical);
    for (var y = 1; y < 4; y++) {
        var middle_vertical = new gameObject("middle_vertical", $("middle_vertical"), 432, 710 - (26 * y));
        gameObjects.push(middle_vertical);
    }
    top_right_corner = new gameObject("top_right_corner", $("top_right_corner"), 432, 610);
    gameObjects.push(top_right_corner);
    for (var x = 1; x < 3; x++) {
        var top_tile = new gameObject("top_tile", $("top_tile"), 432 - (x * $("top_tile").width), 610);
        gameObjects.push(top_tile);
    }
    small_plat_left = new gameObject("small_plat_left", $("small_plat_left"), 354, 610);
    gameObjects.push(small_plat_left);

    // the third instruction icon
    var instruction_3 = new gameObject("instruction_3", $("instruction_3"), 475, 740, false, false);
    gameObjects.push(instruction_3);

    // the fourth instruction icon
    var instruction_4 = new gameObject("instruction_4", $("instruction_4"), 473, 675, false, false);
    gameObjects.push(instruction_4);

    // the third instruction icon
    instruction_3 = new gameObject("instruction_3", $("instruction_3"), 475, 620, false, false);
    gameObjects.push(instruction_3);

    // single tile section above wall jumping
    var single_tile = new gameObject("single_tile", $("single_tile"), 290, 535);
    gameObjects.push(single_tile);
    single_tile = new gameObject("single_tile", $("single_tile"), 400, 475);
    gameObjects.push(single_tile);
    single_tile = new gameObject("single_tile", $("single_tile"), 490, 400);
    gameObjects.push(single_tile);
    single_tile = new gameObject("single_tile", $("single_tile"), 575, 450);
    gameObjects.push(single_tile);

    // the mini tiles before the end
    var mini_tile = new gameObject("mini_tile", $("mini_tile"), 675, 440);
    gameObjects.push(mini_tile);
    mini_tile = new gameObject("mini_tile", $("mini_tile"), 775, 440);
    gameObjects.push(mini_tile);

    // end platform
    small_plat_left = new gameObject("small_plat_left", $("small_plat_left"), 875, 440);
    gameObjects.push(small_plat_left);
    for (var x = 1; x < 4; x++) {
        var top_tile = new gameObject("top_tile", $("top_tile"), (x * $("top_tile").width) + 875, 440);
        gameObjects.push(top_tile);
    }
    small_plat_right = new gameObject("small_plat_right", $("small_plat_right"), 953, 440);
    gameObjects.push(small_plat_left);
    gameObjects.push(small_plat_right);
    var end_face = new gameObject("end_face", $("end_face"), 925, 400, false, false);
    gameObjects.push(end_face);

    // a new gameObject is inserted into the player character variable
    playerChar = new gameObject("playerChar", $("boxy_center"), 110, 950, true);
}

// renders the background of the screen
function renderBackground() {
    screen.fillStyle = "#EEEEEE";
    screen.fillRect(0, 0, 256, 224);
}

// renders foreground objects onscreen
function renderForeground() {
    gameObjects.forEach(function(object) {
        if (object.forceAffected) {
            object.applyForces();
        }
        // this code is for culling anything that isn't within the rendering area
        if (object.x + object.width >= camera.left - 10 
            && object.x <= camera.right + 10
            && object.y + object.height >= camera.top - 10
            && object.y <= camera.bottom + 10) {
                screen.drawImage(object.sprite, object.x - camera.left, object.y - camera.top);
        }
    });
    playerChar.applyForces();
    screen.drawImage(playerChar.sprite, playerChar.x - camera.left, playerChar.y - camera.top);
}

// renders screen
function renderScreen() {
    // moves the camera's x position based on the player's x position
    if (playerChar.x < camera.left) {
        cameraX(-10);
    } else if (playerChar.x + playerChar.width - 1 > camera.right) {
        cameraX(10);
    } else if (playerChar.x - camera.left < 103) {
        if (playerChar.xEnergy < 0)
            cameraX(playerChar.xEnergy);
        else
            cameraX(-2);
    } else if (playerChar.x + playerChar.width - 1 - camera.left > 150) {
        if (playerChar.xEnergy > 0)
            cameraX(playerChar.xEnergy);
        else
            cameraX(2);
    }

    // moves the camera's y position based on the player's y position
    if (playerChar.y < camera.top) {
        cameraY(-10);
    } else if (playerChar.y + playerChar.height - 1 > camera.bottom && camera.top < 800) {
        cameraY(10);
    } else if (playerChar.y - camera.top < 96) {
        if (playerChar.yEnergy < 0)
            cameraY(playerChar.yEnergy);
        else
            cameraY(-2);
    } else if (playerChar.y + playerChar.height - 1 - camera.top > 128 && camera.top < 800) {
        if (playerChar.yEnergy > 0)
            cameraY(playerChar.yEnergy);
        else
            cameraY(2);
    }

    // resets the player if they fall out of bounds
    if (playerChar.y >= 1100) {
        playerChar.x = 110;
        playerChar.y = 950;
        playerChar.top = false;
        playerChar.bottom = false;
        playerChar.left = false;
        playerChar.right = false;
    }

    // renders the background, foreground, and then requests the next frame
    renderBackground();
    renderForeground();
    requestAnimationFrame(renderScreen);
}

// gets the game started
window.onload = function() {
    // upscales the small resolution
    screen.scale(4, 4);
    // disables image smoothing
    screen.imageSmoothingEnabled = false;

    // calls the loading function
    loadObjects();

    // assigns button events
    window.addEventListener("keydown", function(event) {
        switch(event.code) {
            case 'KeyZ':
                if (playerChar.bottom) {
                    goJump = true;
                    playerChar.yEnergy = -3.5;
                    playerChar.bottom = false;
                }
                break;
            case 'ArrowRight':
                if (!playerChar.right && !goRight) {
                    playerChar.xEnergy += 0.2;
                    goRight = true;
                }
                break;
            case 'ArrowLeft':
                if (!playerChar.left && !goLeft) {
                    playerChar.xEnergy -= 0.2;
                    goLeft = true;
                }
                break;
        }
    });
    window.addEventListener("keyup", function(event) {
        switch(event.code) {
            case 'KeyZ':
                if (goJump)
                    playerChar.yEnergy = -0.5;
                break;
            case 'ArrowRight':
                if (goRight)
                    goRight = false;
                break;
            case 'ArrowLeft':
                if (goLeft)
                    goLeft = false;
                break;
        }
    });

    // requests the initial frame of animation
    requestAnimationFrame(renderScreen);
}