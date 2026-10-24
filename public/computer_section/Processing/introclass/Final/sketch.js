//image arrays
let scene1 = [];
let idleAnimation = [];
let idleAnimation2 = [];
//scene managers
let scrollingBackground;
let scene1manager = 0;
let playerAnimationManager = 0;
//true false statments
let idle = true;
let scrolling = false;
let hold = true;

function preload() {
  //loading the moose into varibles
  playerImg1 = loadImage("Moose_player.png");
  playerImg2 = loadImage("Moose_player2.png");
  //loading the background into a varible
  spaceImg = loadImage("Pixel_backgrounds_space.png");
  scrollingBackground = loadImage("Pixel_backgrounds-long.png");
  //loading the UFO animation in a list
  for (scene1manager = 0; scene1manager < 10; scene1manager++) {
    scene1[scene1manager] = loadImage(
      "Animation/Pixel_backgrounds_" + scene1manager + ".png"
    );
  }
  //loading the right idle animaiton into a list
  for (playerAnimationManager = 0; playerAnimationManager < 5; playerAnimationManager++ ) {
    idleAnimation[playerAnimationManager] = loadImage(
      "idel animation/Moose_player" + playerAnimationManager + ".png"
    );
  }
  //loading the left idle animation into a list
  for(playerAnimationManager = 0; playerAnimationManager < 5; playerAnimationManager++){
    idleAnimation2[playerAnimationManager] = loadImage("idelanimation2/Moose_player"+playerAnimationManager+".png")
  }
  
}

function setup() {
  //setting all the scene managers to 0
  scene1manager = 0;
  playerAnimationManager = 0;
  //image mode to center and creating the canvas
  imageMode(CENTER);
  var canvas = createCanvas(400, 400);
  canvas.parent('container1');
  
  //creating the player
  player1 = new player(
    100,//player x
    335,//player y
    75,//player size
    75,
    1,//speed the player moves
    playerImg1,//the images for the player
    playerImg2,
    idle,//idle animaiton check
    idleAnimation,//idle animations
    idleAnimation2,
    scrollingBackground,//scrolling background
    0,//location of the background
    true//if backgorund is scrolling
  );
  //the UFO animaiton defionition
  UFOAnimation1 = new UFOAnimation();
}

function draw() {
  // background(220);

  //calling player functions
  player1.displayBackground();
  player1.display();
  player1.move();

  //cheking if the player is between x values
  if (player1.x > 284 && player1.x < 311) {
    //if true set player speed to 0 and move the player to 900 y
    player1.y = 900;
    player1.spx = 0;
    if (hold) {//playing the UFO animation if true
      UFOAnimation1.animate();
    } else {//if false display a image
      UFOAnimation1.space();
      console.log("click the mousepad to restart!")
    }
  }
}

class player {
  constructor(
    x,
    y,
    sizex,
    sizey,
    speedx,
    image1,
    image2,
    check,
    idleani,
    idleani2,
    long_background,
    locationX,
    imageMove
  ) {
    this.x = x;
    this.y = y;
    this.sx = sizex;
    this.sy = sizey;
    this.spx = speedx;
    this.img = image1;
    this.img1 = image1;
    this.img2 = image2;
    this.chk = check;
    this.IA = idleani;
    this.IA1 = idleani;
    this.IA2 = idleani2;
    this.longBackground = scrollingBackground;
    this.imageX = locationX;
    this.imMove = imageMove;
  }

  display() {
    //checking if the idle animation boolean
    if (this.chk) {
      //setting the idle animation to the correct spot
      image(this.IA[playerAnimationManager], this.x, this.y, this.sx, this.sy);
      //if it's true then we play the animation
      if (frameCount % 6 == 1) {//setting the frame count
        playerAnimationManager++;
        //checking if the playerAnimaitonManager is greater than the lenght of the list
        if (playerAnimationManager >= this.IA.length) {
          playerAnimationManager++;
          playerAnimationManager = 0;
        }
      }
    } else {//if its not true then the image is the regular moose.
      image(this.img, this.x, this.y, this.sx, this.sy);
    }
  }

  move() {
    if (keyIsDown(RIGHT_ARROW)) {
      //sets the display image to the right facing moose image
      this.img = this.img1;
      //sets the idle animation to the right facing idle animation
      this.IA = this.IA1;
      //checking to see if the backgorund needs to be moved
      if (this.imageX * -1 >= 1600) {
        this.imMove = false;
        this.x += this.spx;
      } else this.imMove = true;
      //checking to see if the moose needs to move or stay still
      if (this.x >= 200) {
        //setting the idle animation check to false
        this.chk = false;
        if (this.imMove) {
          this.imageX -= this.spx;
        }
      } else {
        this.x += this.spx;
        //setting the idle animation check to false
        this.chk = false;
      }
      
    } else if (keyIsDown(LEFT_ARROW)) {
      //sets the display image to the left facing moose image
      this.img = this.img2;
      //sets the idle animation to the left facing idle animation
      this.IA = this.IA2;
      //checking to see if the backgorund needs to be moved
      if (this.imageX * -1 <= 0) {
        this.imMove = false;
        this.x -= this.spx;
      } else this.imMove = true;
      //checking to see if the moose needs to move or stay still
      if (this.x <= 200) {
        //setting the idle animation check to false
        this.chk = false;
        if (this.imMove) {
          this.imageX += this.spx;
        }
      } else {
        this.x -= this.spx;
        //setting the idle animation check to false
        this.chk = false;
      }
      
    } else this.chk = true;//setting the idle animation check to true
    if(keyIsDown(UP_ARROW)){
      this.y -= this.spx;
    }
    if(keyIsDown(DOWN_ARROW)){
      this.y += this.spx;
    }
  }

  displayBackground() {
    //displays the background
    push();
    imageMode(CORNER);
    image(this.longBackground, this.imageX, 0);
    pop();
  }
}

class UFOAnimation {
  constructor() {}
  animate() {
    //animates the UFO going up
    image(scene1[scene1manager], 200, 200);
    if (frameCount % 6 == 1) {
      scene1manager++;
      if (scene1manager >= scene1.length) {
        hold = false;
        scene1manager = 0;
      }
    }
  }

  space() {
    //dispays the UFO in space
    push();
    imageMode(CORNER);
    image(spaceImg, 0, 0);
    pop();
  }
}

function mousePressed() {
  scene1manager = 0;
  player1.x = 100;
  player1.y = 335;
  player1.spx = 1;
  player1.imageX = 0;
  hold = true;
}
