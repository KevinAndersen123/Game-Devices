//Kevin Andersen
//Time: 3hrs 35mins
/**
 * main is the entry point for Javascript programs.
 *
 */

function main()
{
    var game = new Game();
    game.initCanvas();
    document.addEventListener("click", () => this.clickHandler(game, event));
}

/**
 * goes to next scene when the mouse is clicked and renders that current scene
 * @param {Game} game 
 * @param {Event} event 
 */
function clickHandler(game, event) 
{
   game.sceneManager.goToNextScene();
   game.render();
}
