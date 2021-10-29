function Figure(bmp, col) {
  this.bmp = bmp;
  this.col = col;
  this.bmpHeight = bmp.length;
  this.bmpWidth = bmp[0].length;
  this.y = -1;
  this.x = int((fieldWidth - this.bmpWidth) / 2);

  this.waitTime = 800;
  this.prevYMove = 0;

  this.onFloor = false;
  this.downEnabled = false;
  this.downEnabledOnStart = false;
  this.paused = false;

  this.move = function(x, y) {
    this.hide();
    this.x += x;
    this.y += y;
    this.update();
    if (this.onFloor) {
      this.x -= x;
      this.y -= y;
    }
  }

  this.rotate = function(dir) {

    let newBmp = Array(this.bmpHeight).fill(null).map(() => Array(this.bmpWidth).fill(null));
    this.hide();

    for (let row = 0; row < this.bmpHeight; row++) {
      for (let clm = 0; clm < this.bmpHeight; clm++) {
        newBmp[row][clm] = this.bmp[this.bmpWidth - 1 - clm][row];
      }
    }
    this.bmp = newBmp;
  }

  this.update = function() {
    this.hide();

    if (millis() - this.waitTime >= this.prevYMove && !this.paused) {
      this.y++;
      this.prevYMove = millis();
    } else if (this.downEnabled) {
      this.y++;
    }

    for (let row = 0; row < this.bmpHeight; row++) {
      for (let clm = 0; clm < this.bmpHeight; clm++) {

        if (this.bmp[row][clm] == true) {
          if (this.x + clm < 0) {
            this.x++;
          } else if (this.x + clm >= fieldWidth) {
            this.x--;
          }
          if (this.y + row < 0) {
            this.y++;
          }

          if ((this.y + row) >= fieldHeight || field[this.y + row][this.x + clm] != null) {
            this.onFloor = true;
          }
        }
      }
    }

    if (this.onFloor) {
      this.y--;
    }
  }

  this.hide = function() {

    for (let row = 0; row < this.bmpHeight; row++) {
      for (let clm = 0; clm < this.bmpHeight; clm++) {

        if (this.bmp[row][clm] == true /* && (this.y + row) < fieldHeight */ ) {
          field[this.y + row][this.x + clm] = null;
        }
      }
    }
  }

  this.show = function() {

    for (let row = 0; row < this.bmpHeight; row++) {
      for (let clm = 0; clm < this.bmpHeight; clm++) {

        if (this.bmp[row][clm] == true && this.y + row >= 0) {
          field[this.y + row][this.x + clm] = col;
        }
      }
    }
  }

  this.down = function() {

    print("down");
    this.hide();
    let finished = false;

    do {
      this.y++;
      for (let row = 0; row < this.bmpHeight; row++) {
        for (let clm = 0; clm < this.bmpHeight; clm++) {

          if (this.bmp[row][clm] == true) {
            if ((this.y + row) >= fieldHeight || field[this.y + row][this.x + clm] != null) {
              finished = true;
            }
          }
        }
      }


    } while (finished == false);
    this.y--;
  }

  this.enableDown = function() {
    if (this.downEnabledOnStart) {
      this.downEnabled = true;
    }
  }

  this.disableDown = function() {
    this.downEnabled = false;
    this.downEnabledOnStart = true;
  }
  
  this.togglePaused = function() {
    this.paused = !this.paused;
  }
}





















//