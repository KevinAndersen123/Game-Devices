class Game
{
	/**
	 * this is the constructor of the game class
	 */
	constructor()
	{
		this.ctx;
		this.addScenes();
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
	 * creates the different scenes and calls the addScene function to add to list
	 */
	addScenes()
	{
		this.sceneManager = new SceneManager();
		var titleScreen = new TitleScene("Gameover","#ff66ff");
		var menuScreen = new MenuScene("Menu","#00ff00");
		var playingScreen = new PlayingScene("Playing","#00ffff");

		//adds menu
		this.sceneManager.addScene(menuScreen);
		//adds playing screen
		this.sceneManager.addScene(playingScreen);
		//add title screne
		this.sceneManager.addScene(titleScreen);
		this.sceneManager.goToScene("Menu");
	}
	/**
	* renders the current screen
 	*/
	render()
	{
		this.sceneManager.currentScene.render(this.ctx);
	}

}
