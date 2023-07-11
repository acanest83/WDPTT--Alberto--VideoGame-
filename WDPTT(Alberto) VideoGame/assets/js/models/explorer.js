class Explorer {

  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.w = Math.floor(150 / 2);
    this.h = Math.floor(150 / 2);
    this.h0 = this.h;

    this.vx = 0;
    this.vy = 0;

    

    // Escoger las imagénes del player//
    this.sprite = new Image();
    this.sprite.direction = "right";
    this.sprite.src = "/assets/js/img/player.png";
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 8;
    this.sprite.horizontalFrameIndex = 4;

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
    this.harpoon = new Harpoon(this.ctx, this.x + this.w, this.y + this.h / 2);

    this.animationTick = 0;

    //Retardo entre disparos//
    this.canShoot = true;
    this.shootDelay = 650;
  }

  //Asignación de controles//

  onKeyDown(event) {

    switch (event.keyCode) {
      case KEY_UP:
        this.vy = -EXPLORER_CLIMB;
        break;
      case KEY_DOWN:
        this.vy = EXPLORER_CLIMB;
        break;
      case KEY_LEFT:
        if (this.sprite.horizontalFrameIndex >= 0 && this.sprite.horizontalFrameIndex <= 3) {
          this.sprite.horizontalFrameIndex++;
        } else {
          this.sprite.horizontalFrameIndex = 0;
        }
        this.vx = - EXPLORER_SPEED;
        break;
      case KEY_RIGHT:

        this.vx = EXPLORER_SPEED;
        break;
      case KEY_SHOOT:
        if (this.canShoot) {
          this.canShoot = false; //desactivar la capacidad de disparo//
          this.harpoon.shoot();
          this.triggerShootDelay();//inicia el retardo entre bullets//
        }
        break;
    }
  }
  triggerShootDelay() {
    setTimeout(() => {
      this.canShoot = true; //habilitar la capacidad de disparar //
    }, this.shootDelay);
  }

  onKeyUp(event) {
    switch (event.keyCode) {
      case KEY_UP:
        this.vx = 0;
        break;
      case KEY_DOWN:
        this.vx = 0;
        break;
      case KEY_LEFT:
        this.sprite.horizontalFrameIndex = 4;
        this.vx = 0;

        break;
      case KEY_RIGHT:
        this.sprite.horizontalFrameIndex = 4;
        this.vx = 0;
        break;
      case KEY_SHOOT:
        
        break;
    }
  }
  //movimiento personaje//

  move() {
    this.x += this.vx;
    this.harpoon.x = this.x + this.w;
    this.harpoon.y = this.y + this.h / 2;
    this.harpoon.move();

    //Acotar movimiento a lienzo canvas//

    const canvasLimit = {
      x: 20, // Límite izquierdo del lienzo
      y: 100, // Límite superior del lienzo
      width: canvas.width - 40, // Ancho del límite dentro del lienzo
      height: canvas.height - 115, // Altura del límite dentro del lienzo
    };

    if (this.x + this.w > canvasLimit.x + canvasLimit.width) {
      this.x = canvasLimit.x + canvasLimit.width - this.w;
      this.vx *= 0; // Invertir la velocidad horizontal al llegar al límite derecho
    } else if (this.x < canvasLimit.x) {
      this.x = canvasLimit.x;
      this.vx *= 0; // Invertir la velocidad horizontal al llegar al límite izquierdo
    }
  }

  //dibujado de class en background//

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

      this.animate();
      this.harpoon.draw();
      
    }
  }
  //avanzar dentro de los frames//

  animate() {

    this.animationTick++;

    if (this.animationTick > PLAYER_ANIMATION_TICK) {
      this.animationTick = 0;
      this.sprite.horizontalFrameIndex--;
    }
    if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
      this.sprite.horizontalFrameIndex = 0;
    }
  }
} 