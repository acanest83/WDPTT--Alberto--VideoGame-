class Bullet {
  constructor(ctx, x, y, color = "red") {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 20;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = -0.52;

   this.sprite = new Image();
   this.sprite.src = "/assets/js/img/disparo.png";
   this.sprite.verticalFrames = 1;
   this.sprite.verticalFrameIndex = 0;
   this.sprite.horizontalFrames = 1;
   this.sprite.horizontalFrameIndex = 0;
   this.color = color;
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
  }

  draw() {
    if (this.sprite.isReady) {

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
  }
}