class PlayingScene extends Scene
{
    /**
     * Constructor for title screen
     * @param {String} t_title 
     * @param {String} t_colour hex value of colour
     */
    constructor(t_title, t_colour)
    {
        super(t_title);
        this.t_colour = t_colour;
    }

    /**
     * changes background to aqua blue and displays text of its title
     * @param {CanvasRenderingContext2d} ctx 
     */
    render(ctx)
    {
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.font = "40px arial";
        ctx.fillText(this.title,10,70);
        document.body.style.background = this.t_colour;
    }
}