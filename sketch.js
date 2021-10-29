//  (c) 2020 Benjamin Aster


let fieldWidth = 10;
let fieldHeight = 20;

let field = Array(fieldHeight).fill(null).map(() => Array(fieldWidth).fill(0));

let currentFigure;
let currentBag;
let bagIndex = 0;

let squareSize;
let fieldOffset = 0;
let figStrokeWeight = 6;

let abc;

let tetrisMusic;
let volume = 0.01;
//let playMusic = true;

function preload() {
  soundFormats('mp3', 'ogg');
  tetrisMusic = loadSound('https://upload.wikimedia.org/wikipedia/commons/e/e5/Tetris_theme.ogg');
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  windowResized();

  for (let row = 0; row < fieldHeight; row++) {
    for (let clm = 0; clm < fieldWidth; clm++) {
      field[row][clm] = null;
    }
  }

  currentBag = createShuffledArray(figArray.length);

  currentFigure = new Figure(figArray[currentBag[bagIndex]].bmp, figArray[currentBag[bagIndex]].col);


  tetrisMusic.play();
  tetrisMusic.setVolume(volume);
  tetrisMusic.loop();

}

function draw() {
  background(50);

  noStroke(255);
  fill(0);

  if (keyIsPressed && keyCode == DOWN_ARROW) {
    currentFigure.enableDown();
  } else {
    currentFigure.disableDown();
  }

  currentFigure.update();
  currentFigure.show();

  if (currentFigure.onFloor) {
    currentFigure = null;

    for (let row = 0; row < fieldHeight; row++) {
      let numOfBlocks = 0
      for (let clm = 0; clm < fieldWidth; clm++) {
        if (field[row][clm] != null) {
          numOfBlocks++;
        }
      }
      if (numOfBlocks == fieldWidth) {
        field.splice(row, 1);
        field.unshift(Array(fieldWidth));
      }

    }

    bagIndex++;
    if (bagIndex >= figArray.length) {
      bagIndex = 0;
      currentBag = createShuffledArray(figArray.length);
      print(currentBag);
    }
    currentFigure = new Figure(figArray[currentBag[bagIndex]].bmp, figArray[currentBag[bagIndex]].col);

  }







  rect(fieldOffset, 0, height / 2, height);

  for (let row = 0; row < fieldHeight; row++) {
    for (let clm = 0; clm < fieldWidth; clm++) {
      let col = field[row][clm];
      if (col == null) {
        strokeWeight(figStrokeWeight);
        stroke(0);
        fill(0x11);
      } else {
        strokeWeight(figStrokeWeight);
        stroke(lerpColor(color(col), color(0), 0.5));
        fill(col);
      }

      square(
        fieldOffset + clm * squareSize + figStrokeWeight / 2,
        row * squareSize + figStrokeWeight / 2,
        squareSize - figStrokeWeight);

    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  fieldOffset = (width - height * fieldWidth / fieldHeight) / 2;
  squareSize = height / fieldHeight;
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    currentFigure.move(1, 0);
  } else if (keyCode == LEFT_ARROW) {
    currentFigure.move(-1, 0);
  }

  if (keyCode == UP_ARROW) {
    currentFigure.togglePaused();
  }

  if (key == '+') {
    volume += 0.01;
    volume = constrain(volume, 0, 1);
    tetrisMusic.setVolume(volume)
  } else if (key == '-') {
    volume -= 0.01;
    volume = constrain(volume, 0, 1);
    tetrisMusic.setVolume(volume)
  }

  if (key == 'p') {
    // playMusic = !playMusic;
    print(tetrisMusic.isPlaying());
    if (tetrisMusic.isPlaying()) {
      tetrisMusic.stop()
    } else {
      tetrisMusic.play();
    }
    print(tetrisMusic.isPlaying());
  }

  if (key == ' ') {
    currentFigure.rotate();
  }
}

function createShuffledArray(length) {
  let returnArray = Array(length).fill(null);
  let pos;

  for (let i = 0; i < length; i++) {
    do {
      pos = int(random(0, length));
    } while (returnArray[pos] != null);
    returnArray[pos] = i;
  }
  return returnArray;
}








































//