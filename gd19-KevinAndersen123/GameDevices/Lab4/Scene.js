class Scene
{
    /**
     * constructor
     * @param {String} t_title 
     */
    constructor(t_title)
    {
        this.title = t_title;
    }
    /**
     * displays starting title in console
     */
    start()
    {

        console.log(this.title + " starting.\n");
    }
    /**
     * displays stopping title in console
     */
    stop()
    {
        console.log(this.title + " stopping.\n");
    }

    /**
     * draws a text of the current screens title
     * @param {CanvasRenderingContext2d} ctx 
     */
    render(ctx)
    { 
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.font = "48px serif";
        ctx.fillText(this.title,10,48);
    }

}