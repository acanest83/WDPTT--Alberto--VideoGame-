class Bubbles {
  constructor(ctx, x = canvas.width / 2 - explorerSize / 2, y = 0) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.w = 150;
    this.h = 150;

    this.vx = 2;
    this.vy = 1;
    this.ax = 0;
    this.ay = 0.1;

   
    
    this.isDestroyed = false;

    // Escoger las imagénes de bubble//
    this.sprite = new Image();
    this.sprite.src = "/assets/js/img/bubbles150.png";
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 3;
    this.sprite.horizontalFrameIndex = 0;

    //Recorte de imagen//
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.floor(
        this.sprite.width / this.sprite.horizontalFrames
      );
      this.sprite.frameHeight = Math.floor(
        this.sprite.height / this.sprite.verticalFrames
      );
    };
    this.animationTick = 0;
  }

  draw() {
    if ( this.sprite.isReady && !this.isDestroyed) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
  }
  
  move() {
    this.vx += this.ax;
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;
    
   //Acotar movimiento a Canvas//
    const canvasLimit = {
      x: 20, // Límite izquierdo del lienzo//
      y: 100, // Límite superior del lienzo//
      width: canvas.width - 40, // Ancho del límite dentro del lienzo//
      height: canvas.height - 115, // Altura del límite dentro del lienzo//
    };

    if (this.x + this.w > canvasLimit.x + canvasLimit.width) {
      this.x = canvasLimit.x + canvasLimit.width - this.w;
      this.vx *= -1; // Invertir la velocidad horizontal al llegar al límite derecho//
    } else if (this.x < canvasLimit.x) {
      this.x = canvasLimit.x;
      this.vx *= -1; // Invertir la velocidad horizontal al llegar al límite izquierdo//
    }

    if (this.y + this.h > canvasLimit.y + canvasLimit.height) {
      this.y = canvasLimit.y + canvasLimit.height - this.h;
      this.vy *= -1; // Invertir la velocidad vertical al llegar al límite inferior//
    } else if (this.y < canvasLimit.y) {
      this.y = canvasLimit.y;
      this.vy *= -1; // Invertir la velocidad vertical al llegar al límite superior//
    }
  }
}
