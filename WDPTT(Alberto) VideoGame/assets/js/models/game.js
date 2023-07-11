class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.explorer = new Explorer(this.ctx, 1024, 768);
        this.bubbles = new Bubbles(this.ctx, 1024, 768);


        this.drawIntervalId = undefined;
        this.fps = 60;

        //Sounds//
        this.sounds = new Audio("/assets/js/sounds/Venice.mp3");
        this.gameOverSound = new Audio("/assets/js/sounds/Game Over.mp3");
        this.sounds.shoot = new Audio("/assets/js/sounds/disparo.mp3");
        this.sounds.volume = 0.1;
        this.gameOverSound.volume = 0.2;

        //Posición Elementos//
        this.background = new Background(this.ctx);
        this.explorer = new Explorer(this.ctx, 500, this.canvas.height - 100);
        this.bubbles = new Bubbles(this.ctx, 120, this.canvas.height - 530);



    }

    onKeyDown(event) {
        this.explorer.onKeyDown(event);
    }

    onKeyUp(event) {
        this.explorer.onKeyUp(event);
    }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.sounds.play();
                this.clear();
                this.draw();
                this.move();
                this.checkCollidePlayer();
                this.checkCollideBullet();

            }, 1000 / this.fps);
        }
    }

    // Motor de Colisiones//


    //Derrota del jugador//

    checkCollidePlayer() {
        const player = this.explorer;
        const bubble = this.bubbles;
        const colx = player.x + player.w >= bubble.x && player.x < bubble.x + bubble.w;
        const coly = player.y + player.h >= bubble.y && player.y < bubble.y + bubble.h;

        if (colx && coly) {
            this.gameOver();
        }
    }
    //Colisión Bullets con bubble//

    checkCollideBullet() {
        const bullets = this.explorer.harpoon.bullets;
        const bubbles = this.bubbles;

        bullets.forEach((bullet) => {
            if (
                bullet.x < bubbles.x + bubbles.w &&
                bullet.x + bullet.w > bubbles.x &&
                bullet.y < bubbles.y + bubbles.h &&
                bullet.y + bullet.h > bubbles.y
            ) {

                bullets.splice(bullets.indexOf(bullet), 1); // bullet desaparece al colisionar con bubbles//
                bubbles.isDestroyed = true; // Verificar si bubbles ha sido destruida// 

            }
        });
    }
    //Vicotria del jugador//



    //Condiciones de partida//

    stageClear() {
        this.stop();
        this.ctx.font = "100px Verdana";
        this.ctx.textAlign = "center";
        this.ctx.fillText(
            "Stage Clear",
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2
        );
    }

    gameOver() {
        this.gameOverSound.play();
        this.stop();
        this.ctx.font = "80px Verdana";
        this.ctx.textAlign = "center";
        this.ctx.fillText(
            "GAME OVER",
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2
        );
    }

    //Opciones del Canvas//

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.background.draw();
        this.explorer.draw();
        this.bubbles.draw();

    }

    move() {
        this.explorer.move();
        this.bubbles.move();

    }
}