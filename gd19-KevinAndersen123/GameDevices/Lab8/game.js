class Game
{
    constructor()
    {
        this.ctx;
        this.gameLoop;
        this.img = new Image();
        this.previousTime = 0;
        this.img.addEventListener('load', function() {
            // execute drawImage statements here
          }, false);
        this.img.src = 'coin.png';
        this.boundRecursiveUpdate = () => this.update(this);
    }
    initCanvas()
    {
     // Use the document object to create a new element canvas.
     var canvas = document.createElement("canvas");
     // Assign the canvas an id so we can reference it elsewhere.
     canvas.id = 'mycanvas';
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
     // We want this to be a 2D canvas.
     this.ctx = canvas.getContext("2d");
     // Adds the canvas element to the document.
     document.body.appendChild(canvas);
    }
    initWorld()
    {
        this.initCanvas();
        this.sprite = new Sprite(this.ctx, {
            posX: 0,
            posY: 0,
            width: 1000,
            height: 100,
            image: this.img,
            fps: 1,
            framesInRow: 10,
            framesInCol: 1,
            loop: this.gameLoop
        });
    }
    update()
    {
        var now = Date.now();
        var dt = (now - this.previousTime);
        this.previousTime = now;
        this.sprite.update(dt);
        this.draw();
        window.requestAnimationFrame(this.boundRecursiveUpdate);
    }
    
    draw()
    {
        //this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        this.sprite.drawImage();
    }
}