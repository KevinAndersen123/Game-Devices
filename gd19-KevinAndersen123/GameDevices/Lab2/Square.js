function Square(x, y, width, height, colour)
{
    //sets values
    this.x = x;
    this.y =y;
    this.width = width;
    this.height = height;
    this.colour = colour;
    this.draw();
}

//draws squares
Square.prototype.draw = function()
{
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = this.colour;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}