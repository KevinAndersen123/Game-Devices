const GameState = {
    GAME_STARTED: 'Game Has Started',
    GAME_IN_PROGRESS: 'Game Is In Progress',
    GAME_OVER: 'Game Over',
    GAME_IS_FULL: 'Game Is Full',
    WAITING_FOR_GAME: 'Waiting For Game',
    WAITING_TO_JOIN: 'Waiting To Join'
}

class Game
{
    /**
    * Constructor of the game.
    */
    constructor()
    {
        this.ctx;
        this.ws = new WebSocket("ws://149.153.106.133:8080/wstest?Id="+ this.createUUID());
        this.ws.game = this;
        this.gameState = GameState.WAITING_TO_JOIN;
        this.player;
        this.enemyPlayer;

        /** 
         * Sends message to the server to tell it that this websocket has connected
         */
        this.ws.onopen = function() 
        {
            var message={}
            message.type = "Server Update";
            message.info = "Connected";

            var objToSend = JSON.stringify(message)
            this.send(objToSend);
        }

        /**
         * The message is parsed from json to a dictionary.
         * The message is then proccessed based on it's type.
         */
        this.ws.onmessage = function (evt) 
        {
            var incomingObj = JSON.parse(evt.data);

            if(incomingObj.type === "Server Message")
            {
                this.game.proccessServerMessage(incomingObj);
            }    

            else if(incomingObj.type === "Game Update")
            {
                this.game.proccessGameMessage(incomingObj);
            }
        };

        this.boundRecursiveUpdate = () => this.update(this); 
        this.initWorld();
    }

    /**
    * Initialises the canvas - the drawing surface. The canvas
    * is added to the document. When a HTML document is loaded into a
    * browser, it becomes a document object. 
    */
    initCanvas()
    {
        //Use the document object to create a new element canvas.
        var canvas = document.createElement("canvas");
      
        //Assign the canvas an id so we can reference it elsewhere.
        canvas.id = 'mycanvas';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
       
        //We want this to be a 2D canvas.
        this.ctx = canvas.getContext("2d");
       
        //Adds the canvas element to the document.
        document.body.appendChild(canvas);
    }

    initWorld()
    {
        this.initCanvas();
        this.initButton();
        document.addEventListener("keydown", () => this.keyDownHandler(event));
        this.update();
    }

    /**
     * Creates the join button to connect to the game.
     */
    initButton()
    {
        this.joinButton = document.createElement("button");
        this.joinButton.innerHTML = "Join";
        this.joinButton.id = "JoinButton";
        this.joinButton.style.left = this.ctx.canvas.width / 2 - this.joinButton.style.width / 2 + 'px';
        this.joinButton.style.top = this.ctx.canvas.height / 2 - this.joinButton.style.height / 2 + 'px';
        document.body.appendChild(this.joinButton);
        this.joinButton.addEventListener("click", () => this.join());
    }

    /**
     * Process the keys that have been pressed
     * @param {Event} event The key event that has occured.
     */
    keyDownHandler(event)
    {
        if(this.gameState != GameState.GAME_IN_PROGRESS)
        {
            return;
        }

        //Prevents the default browser actions
	    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) 
	    {
            event.preventDefault();
        }

	    //UP arrow is pressed
	    if(event.keyCode === 38)
	    {
		    this.player.move("Up");
	    }

	    //Down arrow is pressed
	    if(event.keyCode === 40)
	    {
		    this.player.move("Down");
    	}

	    //Left arrow is pressed
	    if(event.keyCode === 37)
	    {
		    this.player.move("Left");
	    }

	    //Right arrow is pressed
	    if(event.keyCode === 39)
	    {
		    this.player.move("Right");
	    }
    }

    /**
     * Sends a message to the server requesting to join the game
     */
    join()
    {
        var message={}
        message.type = "Server Update";
        message.info = "Join";

        var objToSend = JSON.stringify(message)
        this.ws.send(objToSend);
    }

    createUUID() 
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) 
        {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    /**
     * sends a message to the server that contains position of the local player
     */
    update()
    {
        if(this.gameState === GameState.GAME_IN_PROGRESS)
        {
            var message = {};
            if(this.player.checkCollision(this.enemyPlayer))
            {
                message.type = "Game Update";
                message.info = "Game Over";
            }
            else
            {
                message.type = "Game Update";
                message.info = "Update Player";
                message.data = {};
                message.data.posX = this.player.posX;
                message.data.posY = this.player.posY;
            }
    
            var objToSend = JSON.stringify(message)
            this.ws.send(objToSend);      
        }
        this.draw();
        window.requestAnimationFrame(this.boundRecursiveUpdate); 
    }

    /**
     * Creates a new player with random position and colour
     */
    createPlayer()
    {
        var letters = '0123456789ABCDEF';
        var colour = '#';

        for (var i = 0; i < 6; i++) 
        {
            colour += letters[Math.floor(Math.random() * 16)];
        }

        this.player = new Player(
            Math.floor(Math.random() * this.ctx.canvas.width), 
            Math.floor(Math.random() * this.ctx.canvas.height), 
            50, 
            50, 
            colour
        );
    }

    /**
     * Draw the game elements within the canvas
     */
    draw()
    {
        this.ctx.clearRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height);

        switch(this.gameState)
        {
            case GameState.GAME_STARTED:
                this.ctx.font = '100px arial';
                this.ctx.fillStyle = "#252467"
                this.ctx.fillText("Game Is About To Start", 100, 100);    
                this.gameState = GameState.GAME_IN_PROGRESS;        
                break;
            case GameState.GAME_IN_PROGRESS:
                this.player.draw(this.ctx);

                if(typeof this.enemyPlayer !== 'undefined')
                {
                    this.enemyPlayer.draw(this.ctx);
                }
                break;
            case GameState.GAME_IS_FULL:
                break;
            case GameState.GAME_OVER:
                this.ctx.font = '100px arial';
                this.ctx.fillStyle = "#252467"
                this.ctx.fillText("Game Over", 100, 100);
                break;
            case GameState.WAITING_FOR_GAME:
                this.ctx.font = '100px arial';
                this.ctx.fillStyle = "#252467"
                this.ctx.fillText("Waiting For Other Players", 100, 100);
                break;
        }
    }
    /**
     * Proccess the incoming server message based on its information.
     * If the information is that the game has started we send back to the server
     * a newly generated player object.
     * @param {ServerMessage} incomingObj The incoming server message.
     */
    proccessServerMessage(incomingObj)
    {
        console.log(incomingObj.info);

        switch(incomingObj.info)
        {
            case GameState.GAME_STARTED:
                this.gameState = GameState.GAME_STARTED;
                if(document.body.contains(this.joinButton))
                {
                    document.body.removeChild(this.joinButton);
                }
                this.draw();
                this.createPlayer();
            
                var message = {};
                message.type = "Game Update";
                message.info = "New Player";
                message.data = this.player;
                var objToSend = JSON.stringify(message)
                this.ws.send(objToSend);
                break;
            case GameState.GAME_IN_PROGRESS:            
                break;
            case GameState.GAME_IS_FULL:
                this.gameState = GameState.GAME_IS_FULL;
                break;
            case GameState.GAME_OVER:
                this.gameState = GameState.GAME_OVER;
                break;
            case GameState.WAITING_FOR_GAME:
                this.gameState = GameState.WAITING_FOR_GAME;
                document.body.removeChild(this.joinButton);
                break;
            case GameState.WAITING_TO_JOIN:
                this.gameState = GameState.WAITING_TO_JOIN;
                document.body.appendChild(this.joinButton);
                break;
        }
    }

    /**
     * Process the incoming game message from the other client based on its information.
     * @param {GameMessage} incomingObj The incoming game message from the other client.
     */
    proccessGameMessage(incomingObj)
    {
        switch(incomingObj.info)
        {
            case "New Player":
                this.enemyPlayer = new Player(
                    incomingObj.data.posX, 
                    incomingObj.data.posY, 
                    incomingObj.data.width, 
                    incomingObj.data.height, 
                    incomingObj.data.colour
                );
                break;
            case "Update Player":
                this.enemyPlayer.setPosition(incomingObj.data.posX, incomingObj.data.posY);
                break;
        }
    }
}