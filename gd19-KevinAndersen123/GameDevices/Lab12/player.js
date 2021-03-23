const Direction = {
    UP: "Up",
    DOWN: "Down",
    LEFT: "Left",
    RIGHT: "Right"
}

class Player
{
    /**
    * Player constructor
    * @param {Number} posY y position
    * @param {Number} posX x position
    * @param {Number} width width of the player.
    * @param {Number} height height of the player.
    * @param {String} colour string for the colour of the player 
    */
    constructor(posX, posY, width, height, colour)
    {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.speed = 5; //The speed of the player
    }

    /**
     * draws the players square on the canvas
     * @param {CanvasRenderingContext2D} ctx the canvas
     */
    draw(ctx)
    {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }

    /**
    * Moves the player
    */
    move(direction)
    {
        switch(direction)
        {
            case Direction.UP:
                this.posY -= this.speed;
                break;
            case Direction.DOWN:
                this.posY += this.speed;
                break;  
            case Direction.RIGHT:
                this.posX += this.speed;
                break;
            case Direction.LEFT:
                this.posX -= this.speed;
                break;          
        }      
    }
    /**
     * sets the position of the player
     * @param {Number} posX players x pos
     * @param {Number} posY players y pos
     */
    setPosition(posX, posY)
    {
        this.posY = posY;
        this.posX = posX;
    }
 
    /**
     * Check for collision between the player and a passed in game object
     * @param {Object} e the other game object
     * @returns a bool if the player has collided with the object or not
     */
    checkCollision(e)
    {
        var collides = false;

        if((this.posX < e.posX + e.width) && 
        (this.posX + this.width > e.posX) && 
        (this.posY + this.height > e.posY) &&
        (this.posY < e.posY + e.height))
        {
            collides = true;
        }

        return collides;
    }
}