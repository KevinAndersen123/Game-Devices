//Kevin Andersen

/**
 * goal constructer that takes a position,size and colour
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} width 
 * @param {Number} height 
 * @param {String} colour 
 */
function Goal(x, y, width, height, colour)
{
    //sets values
    this.x = x;
    this.y =y;
    this.width = width;
    this.height = height;
    this.colour = colour;
    this.alive = true;
}

/**
 * Draws goal on the browser, takes ctx as a paramater
 * @param {CanvasRenderingContext2D} ctx canvas on the page
 */
Goal.prototype.draw = function(ctx)
{
    ctx.strokeStyle = this.colour;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
}

