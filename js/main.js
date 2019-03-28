function Garland(garlandContainer, lampCount, lampColors, lampStep, lampBlinkTimeout) {
  this.garlandContainer = garlandContainer;
  this.lampCount = lampCount;
  this.lampColors = lampColors;
  this.lampStep = lampStep;
  this.lampBlinkTimeout = lampBlinkTimeout;
  this.firstLampColor = this.lampColors.length - 1;
  this.matrixPosSquare = [];
  this.matrixPosCircle = [];
  this.drawMode = 'SQUARE';
}

Garland.prototype.changeFigure = function() {
  this.drawMode = this.drawMode === 'SQUARE' ? 'CIRCLE' : 'SQUARE';
}

Garland.prototype.lampColorChange = function() {
  var lampArr = document.getElementsByTagName('circleDiv');

  var lampColorIndex = this.firstLampColor;

  for (var i = 0; i < lampArr.length; i++) {

      lampArr[i].style['background'] = this.lampColors[lampColorIndex].background;
      lampArr[i].style['box-shadow'] = this.lampColors[lampColorIndex].box_shadow;

      lampColorIndex--;

      if (lampColorIndex < 0) {
          lampColorIndex = this.lampColors.length - 1;
      }
  }

  this.firstLampColor++;
  if (this.firstLampColor >= this.lampColors.length) {
      this.firstLampColor = 0;
  }
}

Garland.prototype.initMatrixSquare = function() {
  var lPosX = 20;
  var lPosY = 60;

  for (let i = 0; i < this.lampCount; i++) {

      if (i <= ((this.lampCount / 4) * 1) - 1) {
          lPosX += this.lampStep;
          this.matrixPosSquare.push({
              x: lPosX + 'px',
              y: lPosY + 'px'
          });
      }

      if ((i >= (this.lampCount / 4) * 1) && (i <= ((this.lampCount / 4) * 2) - 1)) {
          lPosY += this.lampStep;
          this.matrixPosSquare.push({
              x: lPosX + 'px',
              y: lPosY + 'px'
          });
      }

      if (i >= ((this.lampCount / 4) * 2) && i <= ((this.lampCount / 4) * 3) - 1) {
          lPosX -= this.lampStep;
          this.matrixPosSquare.push({
              x: lPosX + 'px',
              y: lPosY + 'px'
          });
      }

      if (i >= ((this.lampCount / 4) * 3) && i <= ((this.lampCount / 4) * 4) - 0) {
          lPosY -= this.lampStep;
          this.matrixPosSquare.push({
              x: lPosX + 'px',
              y: lPosY + 'px'
          });
      }

  }

}

Garland.prototype.initMatrixCircle = function() {
  var sectorSize = 360 / this.lampCount;
  var radians, x, y;

  for (var i = 1; i <= 360; i += sectorSize) {
      radians = (Math.PI / 180) * i;
      x = Math.cos(radians) * 220 + 230;
      y = Math.sin(radians) * 220 + 280;

      this.matrixPosCircle.push({
          x: x + 'px',
          y: y + 'px'
      });

  }
}

Garland.prototype.initGarlandLamps = function() {
  this.initMatrixSquare();
  this.initMatrixCircle();

  for (var i = 0; i < this.lampCount; i++) {
      var circleEl = document.createElement('circleDiv');
      circleEl.className = 'lamp ';
      circleEl.setAttribute('id', 'circleLamp' + (i + 1));

      if (this.drawMode === 'SQUARE') {
          circleEl.style.left = this.matrixPosSquare[i].x;
          circleEl.style.top = this.matrixPosSquare[i].y;
      } else {
          circleEl.style.left = this.matrixPosCircle[i].x;
          circleEl.style.top = this.matrixPosCircle[i].y;
      }

      this.garlandContainer.appendChild(circleEl);
  }

}

Garland.prototype.drawMatrixSquare = function() {
  var lampElemArr = document.getElementsByTagName('circleDiv');

  for (var i = 0; i < lampElemArr.length; i++) {
      lampElemArr[i].style.left = this.matrixPosSquare[i].x;
      lampElemArr[i].style.top = this.matrixPosSquare[i].y;
  }
}

Garland.prototype.drawMatrixCircle = function() {
  var lampElemArr = document.getElementsByTagName('circleDiv');

  for (var i = 0; i < lampElemArr.length; i++) {
      lampElemArr[i].style.left = this.matrixPosCircle[i].x;
      lampElemArr[i].style.top = this.matrixPosCircle[i].y;
  }
}

Garland.prototype.run = function() {
  this.initGarlandLamps();
  var thisPtr = this;

  setInterval(function() {
      thisPtr.lampColorChange();
      if (thisPtr.drawMode === 'SQUARE') {
          thisPtr.drawMatrixSquare();
      } else {
          thisPtr.drawMatrixCircle();
      }
  }, this.lampBlinkTimeout);
}


//--------------------------------------------------------------------------


var idGarland = document.getElementById('idGarland');

var LAMP_COLORS = [
  {
      background: 'radial-gradient(circle at 30% 30%, #3d9eff, #00e1ff)',
      box_shadow: '0 0 20px #3d9eff'
  },
  {
      background: 'radial-gradient(circle at 30% 30%, #ff8b3d, #fbff00)',
      box_shadow: '0 0 20px #ff9d41'
  },
  {
      background: 'radial-gradient(circle at 30% 30%, #2cac13, #09ff00)',
      box_shadow: '0 0 20px #1adb13'
  },
  {
      background: 'radial-gradient(circle at 30% 30%, #ac1313, #ff0000)',
      box_shadow: '0 0 20px #c91d1d'
  }
];

var LAMP_BLINK_TIMEOUT = 300; // milisec

var LAMP_COUNT = 40;
var LAMP_STEP = 40;

var garl = new Garland(idGarland, LAMP_COUNT, LAMP_COLORS, LAMP_STEP, LAMP_BLINK_TIMEOUT);
garl.run();