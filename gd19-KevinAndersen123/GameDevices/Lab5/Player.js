//Kevin Andersen
class Player
{
    /**
    * player constructer that takes a position,size and colour
    * @param {Number} x 
    * @param {Number} y 
    * @param {Number} width 
    * @param {Number} height 
    * @param {String} colour 
    */
    constructor(x, y, width, height, colour)
    {
        //sets values
        this.x = x;
        this.y =y;
        this.width = width;
        this.height = height;
        this.colour = colour;
    }

    /**
    * Draws square on the browser, takes ctx as a paramater
    * @param {CanvasRenderingContext2D} ctx canvas on the page
    */
    draw(ctx)
    {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    /**
     * Checks collision with the object E that is passed in 
     * @param {Object} e 
     */
    checkCollision(e)
    {
        var collides = false;
        if( (this.x < e.x + e.width) &&
            (this.x + this.width > e.x) &&
            (this.y + this.height > e.y) &&
            (this.y < e.y + e.height) )
        {
            collides = true;
        }
        return collides;
    }
}
