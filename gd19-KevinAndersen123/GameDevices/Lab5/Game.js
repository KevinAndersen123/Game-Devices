class Game
{
	/**
	 * this is the constructor of the game class
	 */
	constructor()
	{
        this.ctx;
		this.player = new Player(10,10,50,50,"#ff12ef");
		this.goal = new Goal(200,100,80,80,"#00eaff");
		this.boundRecursiveUpdate = () => this.update(this);
	}
	/**
	 * Initialises the canvas - the drawing surface. The canvas
	 * is added to the document. When a HTML document is loaded into a
	 * browser, it becomes a document object. This document object is
	 * the root node of the HTML document and is considered the 'owner' of all other
 	* nodes such as forms, buttons, the canvas etc.
 	*/
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
    /**
     * prints out “Initialising game world"
     */
    initWorld()
    {
        document.addEventListener("keydown", () => this.keyDownHandler(event));
        console.log("Initilising game world");
    }
	/**
	 * updates the window and checks for collison
	 */
	update()
	{
		this.draw();
		if(this.goal.alive === true)
		{
			if(this.player.checkCollision(this.goal))
			{
				this.goal.alive = false;
			}
		}

        window.requestAnimationFrame(this.boundRecursiveUpdate); 
	}
	/**
	*draws player and goal on screen
 	*/
	draw()
	{
		this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
		this.player.draw(this.ctx);
		//checks if goal is alive
		if(this.goal.alive)
		{
			this.goal.draw(this.ctx);
		}
		else
		{
			//draws win text if goal is not alive
			this.ctx.save();
			this.ctx.fillStyle="#ffff00";
			this.ctx.font = "italic 50pt Arial";
			this.ctx.textBaseline = "top";
			this.ctx.fillText("Level Complete",700,this.ctx.canvas.height/2);
			this.ctx.restore();
		}
		
	}
    /**
    * moves player with keyboard input, e is a parameter
    * @param {Event} e is an event that is passed in
    */
    keyDownHandler(e) 
    {
		if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
			e.preventDefault();
		}
	
		if(e.keyCode === 37) // move left
		{
			this.player.x-=15;
		}
		if(e.keyCode === 38) // moves up
		{
			this.player.y-=15;
		}
		if(e.keyCode === 39) //moves right
		{
			this.player.x+=15;
		}
		if(e.keyCode === 40) //moves down
		{
			this.player.y+=15;
		}
    }
}
