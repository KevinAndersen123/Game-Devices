class TitleScene extends Scene
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
     * changes colour of background and calls its inherited classs render
     * @param {CanvasRenderingContext2d} ctx 
     */
    render(ctx)
    {
        
        super.render(ctx);
        document.body.style.background = this.t_colour;
    }
}