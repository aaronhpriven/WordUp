var words = {};
var alphabet = ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "B", "C", "C", "C", "D", "D", "D", "D", "D", "D", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "F", "G", "G", "G", "G", "H", "H", "H", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "J", "J", "K", "K", "L", "L", "L", "L", "L", "M", "M", "M", "N", "N", "N", "N", "N", "N", "N", "N", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "P", "P", "P", "Q", "Q", "R", "R", "R", "R", "R", "R", "R", "R", "S", "S", "S", "S", "S", "S", "T", "T", "T", "T", "T", "T", "T", "T", "T", "U", "U", "U", "U", "U", "U", "U", "V", "V", "V", "W", "W", "W", "X", "X", "Y", "Y", "Y", "Z", "Z"];
var letters = [];
var starttime;
var ellapsedtime;
var wordtime;
var wordwaittime;
var myword = "";
var found = 0;
var theScore = 0;
var running = 0;
var wordlength;
var gamewait;
var gameover;
var healthbarH;
var canvas;
var pause;
var header;


function preload() {
  loadStrings('Many_Words.txt', function(wordsList) {
    var word;
    for (var i = 0; i < wordsList.length; i++) {
      word = wordsList[i];
      words[word] = true;
    }
  });
}

function setup() {
  healthbarH = .2 * height;
  canvas = createCanvas(700, 700);
  canvas.position(windowWidth/2 - canvas.width/2, windowHeight-canvas.height);
  // header = createElement("h1", "Word Up");
  // header.position(windowWidth/2 - 170,200);
  
  
  // image(header, windowWidth/2 - 55, (canvas.height-600)/2)
  starttime = millis();
  ellapsedtime;
  start = createButton("Start");
  start.position(canvas.x + canvas.width / 2 - 50, canvas.y + canvas.height / 2 - .07 * canvas.height);
  start.size(100, 60);
  start.mousePressed(startGame);

  instruct = createButton("How to Play");
  instruct.position(canvas.x + canvas.width / 2 - 50, canvas.y + canvas.height / 2 + .07 * canvas.height);
  instruct.size(100, 60);
  instruct.mousePressed(instructions);
  myp = createElement('h2',"Click on the letters to create words. <br> Press space-bar to enter your word. <br> The longer the word, the more points!")
  myp.position(canvas.x + canvas.width/2 -250, canvas.y + canvas.height/2 - 100);
  myp.hide();
  back = createButton("Back");
  back.position(canvas.x + canvas.width / 2 - 50, canvas.y + canvas.height / 2 + .15 * canvas.height);
  back.size(100, 60);
  back.mousePressed(goBack);
  back.hide();


  restart = createButton("Re-start");
  restart.position(canvas.x + canvas.width / 2 - 50, canvas.y + canvas.height / 2 + .1 * canvas.height);
  restart.size(100, 60);
  restart.mousePressed(restartGame);
  restart.hide();

}

function startGame() {
  gametime = millis();
  running = 1;
  for (var i = 0; i < 6; i++) {
    letters[i] = new createLetter();
  }
}

function instructions() {
  running = -1;
  myp.show();
  start.hide();
  instruct.hide();
  back.show();
  
}

function goBack() {
  running = 0;
}

function restartGame() {
  gamewait = 0;
  starttime = millis();
  gametime = millis();
  running = 1;
  theScore = 0;
  for (var i = 0; i < 6; i++) {
    letters[i] = new createLetter();
  }
}

function createLetter() {
  this.isBold = false;
  this.hasnotbeenclicked = true;
  this.letter = alphabet[int(random(0, alphabet.length))];
  this.wall = (int(random(0, 4)));
  this.dir = int(random(0, 1));
  if (this.wall === 0) {
    this.x = 0;
    this.y = random(textWidth(this.letter), height - textWidth(this.letter) - healthbarH);
    this.dx = random(.25, .75);
    if (this.dir === 0) {
      this.dy = random(-.75, -.25);
    } else {
      this.dy = random(.25, .75);
    }
  }
  if (this.wall == 1) {
    this.x = random(textWidth(this.letter), width - textWidth(this.letter));
    this.y = textWidth(this.letter) + healthbarH;
    this.dy = random(.25, .75);
    if (this.dir === 0) {
      this.dx = random(-.75, -.25);
    } else {
      this.dx = random(.25, .75);
    }
  }
  if (this.wall == 2) {
    this.x = width - textWidth(this.letter);
    this.y = random(textWidth(this.letter), height - textWidth(this.letter) - healthbarH);
    this.dx = random(-.75, -.25);
    if (this.dir === 0) {
      this.dy = random(-.75, -.25);
    } else {
      this.dy = random(.25, .75);
    }
  }
  if (this.wall >= 3) {
    this.x = random(textWidth(this.letter), width - textWidth(this.letter));
    this.y = height;
    this.dy = random(-.75, -.25);
    if (this.dir === 0) {
      this.dx = random(-.75, -.25);
    } else {
      this.dx = random(.25, .75);
    }
  }
  this.display = function() {
    fill(map(letters.length, 0, 12, 0, 255), map(letters.length, 0, 12, 255, 0), 0);
    textSize(60);
    textFont("Courier New");
    if (this.isBold) {
      textStyle(BOLD);
    } else {
      textStyle(NORMAL);
    }
    text(this.letter, this.x, this.y); 
    //rect(this.x, this.y-textWidth(this.letter), textWidth(this.letter),textWidth(this.letter))
  }
  this.move = function() {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    if (this.x > width - textWidth(this.letter)) {
      this.dx = -this.dx;
      this.x = width - textWidth(this.letter);
    }
    if (this.x < 0) {
      this.dx = -this.dx;
      this.x = 0;
    }
    if (this.y > height) {
      this.dy = -this.dy;
      this.y = height;
    }
    if (this.y < textWidth(this.letter) + healthbarH) {
      this.dy = -this.dy;
      this.y = textWidth(this.letter) + healthbarH;
    }
  }
  this.clicked = function() {
    if (this.hasnotbeenclicked) {
      this.hasnotbeenclicked = !this.hasnotbeenclicked
      this.oldx = this.dx;
      this.oldy = this.dy;
      this.dx = 0;
      this.dy = 0;
      this.isBold = true;
      myword = myword + this.letter
      console.log(myword)

    }
  }
  this.unclicked = function() {
    if (this.hasnotbeenclicked == false) {
      this.dx = this.oldx;
      this.dy = this.oldy;
      this.hasnotbeenclicked = !this.hasnotbeenclicked;
      this.isBold = false;
    }
  }
}

function mousePressed() {
  for (var i = 0; i < letters.length; i++) {
    if (mouseX >= letters[i].x && mouseX <= (letters[i].x + textWidth(letters[i]) / 2) && mouseY <= letters[i].y && mouseY >= letters[i].y - textWidth(letters[i]) / 2) {
      if (letters[i].hasnotbeenclicked) {
        letters[i].clicked();
      } else {
        var letterpos = myword.indexOf(letters[i].letter);
        if (myword.length - 1 == letterpos) {
          letters[i].unclicked();
          myword = myword.slice(0, myword.length - 1)
        }
      }
    }
  }
}

function keyTyped() {
  if (keyCode == 32) {
    found = 0;
    var newLetters = []
    myword = myword.toLowerCase();
    if (words[myword]) {
      println("That's a word!")
      found = 1;
      theScore = theScore + int(Math.pow(myword.length, 3) / 8);
      for (var i = 0; i < letters.length; i++) {
        if (letters[i].dy !== 0) {
          newLetters.push(letters[i])
        }
      }
      myword = myword.substring(0, -1);
      letters = newLetters;
      wordtime = millis();
    } else {
      println("That's NOT a word!");
      found = 2;
      for (var i = 0; i < letters.length; i++) {
        letters[i].unclicked();
      }
      myword = myword.substring(0, -1);
      wordtime = millis();
    }
  }
  if (key == 'p' && running == 1) {
    running = 1.5;
  } else if (key == 'p' && running == 1.5) {
    running = 1;
  }
}


function draw() {
  background(255);
  //image(header, canvas.width/2 - header.width/2, -100 );
  if (running == 0) {
    start.show();
    instruct.show();
    back.hide();
    myp.hide();
  }


  if (running == 1) {
    fill(255, 0, 0);
    rect(0, 0, width, healthbarH, 3, 3);
    fill(0, 255, 0);
    rect(0, 0, map(letters.length, 12, 0, 0, width), healthbarH, 3, 3);
    start.hide();
    restart.hide();
    instruct.hide();
    for (var i = 0; i < letters.length; i++) {
      letters[i].display();
      letters[i].move();
    }
    if (ellapsedtime > 2000) {
      letters.push(new createLetter());
      starttime = millis();
    }
    ellapsedtime = millis() - starttime;
    fill(0);
    textSize(30);
    textFont('Helvetica');
    textAlign(CENTER);
    text(myword, .5 * width, .916 * height);
    if (found === 1) {
      wordwaittime = millis() - wordtime;
      if (wordwaittime < 1500) {
        textAlign(CENTER);
        text("That's a word!", width / 2, .95 * height);
      }
    }
    if (found === 2) {
      wordwaittime = millis() - wordtime;
      if (wordwaittime < 1500) {
        textAlign(CENTER);
        text("That's NOT a word!", width / 2, .95 * height);
      }
    }
    text(theScore, .0333 * width, .075 * height);

    if (letters.length > 11) {
      running = 2;
      gameover = millis();
    }
  }

  if (running == 1.5) {

    fill(200, 200, 200, 250);
    rect(0, 0, width, height);
    fill(0);
    textSize(30);
    textAlign(CENTER)
    text("PAUSED", width / 2, height / 2)
      // fill(255,255,255,.7);

  }

  if (running == 2) {
    gamewait = millis() - gameover;
    for (var i = 0; i < letters.length; i++) {
      letters[i].display();
    }
    if (gamewait > 2500) {
      running = 3;
    }
  }
  if (running == 3) {
    letters = [];
    myword = "";
    textSize(50);
    textFont('Helvetica');
    textAlign(CENTER);
    fill(0);
    text("You scored " + theScore + " points!", width / 2, height / 2)
    restart.show();
  }
}