/**
 * Constructor function to initialise this sprite with the canvas context
 *  and a set of image options. The image options specify both image and
 *  animation properties. For example, image width, image height, the image
 *  object and the y coordinate where the image should be drawn.
 *  The animation properties include the ticks per frame and number of 
 *  frames.
 * @param {context} context The 2D context for the canvas.
 * @param {Object} imageOptions An object describing the image and animation     
 *                  properties.
 */
class Sprite
{
    constructor(context, imageOptions)
    {
       this.frameIndex = 0;
       this.tickCount = 0;
       this.width = imageOptions.width;
       this.height = imageOptions.height;
       this.image = imageOptions.image;
       this.ctx = context;
       this.posX = imageOptions.posX;
       this.posY = imageOptions.posY;
       this.ticksPerFrame = imageOptions.fps || 1;
       this.framesinCol = imageOptions.framesInCol;
       this.framesInRow = imageOptions.framesInRow;
       this.loop = imageOptions.loop;
   }
   update(dt)
   {
        this.tickCount += 1;
			
        if (this.tickCount > this.ticksPerFrame) 
        {
            this.tickCount = 0;
            // Go to the next frame
            if (this.frameIndex < this.framesInRow - 1) {	
                // Go to the next frame
                this.frameIndex += 1;
           }	
           else
           {
               this.frameIndex = 0;
           }
        }
   }
   drawImage()
   {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(this.image,
        this.frameIndex * this.width / this.framesInRow,
        0,
        this.width / this.framesInRow,
        this.height,
        0,
        0,
        this.width / this.framesInRow,
        this.height);
   }
}
