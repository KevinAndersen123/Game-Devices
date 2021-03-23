class SceneManager
{
    /**
     * constructor of Scene Manager
     */
    constructor()
    {
        this.currentScene = null;
        this.scenes = {};
        this.titles = [];
        this.currentTitle = null;
    }
    /**
     * adds scene parameter into the dictionary
     * @param {*Scene} scene is passed into the function
     */
    addScene(scene)
    {
        this.titles.push(scene.title);
        this.scenes[scene.title] = scene;
    }
    /**
     * stops scene if there is no scene, sets current scene to the passed in title
     * loops through list to find this title string, once this is found it sets it to current screen
     * starts current scene 
     * @param {String} title 
     */
    goToScene(title)
    {
        if(this.currentScene !== null)
        {
            this.currentScene.stop();
        }
        this.currentScene = this.scenes[title];

        for(var i=0;i<this.titles.length;i++){
            if(this.titles[i] === title)
            {
                this.currentTitle = i;
            }
        }
        this.currentScene.start();
    }
    /**
     * stops current scene and then starts next one, if last scene was the current scene the next scene is the first 
     */
    goToNextScene()
    {
       if(this.currentTitle !== null)
       {
           this.currentScene.stop();
           this.currentTitle++;
           if(this.currentTitle=== this.titles.length)
           {
                this.currentTitle = 0;
           }

           this.currentScene = this.scenes[this.titles[this.currentTitle]];
           this.currentScene.start();
       }
    }
}