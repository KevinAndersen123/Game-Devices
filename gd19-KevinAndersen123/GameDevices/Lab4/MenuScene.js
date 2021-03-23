class MenuScene extends Scene
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
     * changes colour of background and displays a text 
     * @param {CanvasRenderingContext2d} ctx 
     */
    render(ctx)
    {
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.font = '70px arial';
        ctx.fillText(this.title,10,70);
        document.body.style.background = this.t_colour;
    }
}