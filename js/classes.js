
class Sprite {
	constructor({
		position,
		imageSrc, 
		scale = 1, 
		framesMax = 1, 
		frameColumns = 1, 
		frameRows = 1, 
		offset = {x: 0, y: 0} 
	}) {
		this.position 		= position;
		this.height 		= 150;
		this.width 			= 50;
		this.image 			= new Image();
		this.image.src 		= imageSrc;
		this.scale 			= scale;
		this.framesMax  	= framesMax;
		this.frameColumns 	= frameColumns;
		this.frameRows 		= frameRows;

		this.framesCurrent 	= 0;
		this.framesElapsed  = 0;
		this.framesHold     = 2; // loop the animation every 10 frames instead of every 1 frame

		this.frameColumn 	= 0;
		this.frameRow 		= 0;

		this.offset = offset;
	}

	draw() {
		c.drawImage(
			this.image,
			this.frameColumn * (this.image.width / this.frameColumns), //crop location x
			this.frameRow * (this.image.width / this.frameRows),
			this.image.width / this.frameColumns, // crop width and height 
			this.image.height / this.frameRows, // dependent on number of frames
			this.position.x - this.offset.x,
			this.position.y - this.offset.y,
			(this.image.width / this.frameColumns) * this.scale,
			(this.image.height / this.frameRows) * this.scale
		);
	}	

	animateFrames(){
		this.framesElapsed++;

		if (this.framesElapsed % this.framesHold === 0)
		{
			if (this.framesCurrent < this.framesMax -1)
			{
				this.framesCurrent++;

				if(this.frameColumn < this.frameColumns -1)
				{
					this.frameColumn++;	
				}
				else
				{
					this.frameColumn = 0;
				}

				if (this.frameRow < this.frameRows -1 &&
					this.framesCurrent % this.frameColumns === 0)
				{
					this.frameRow++;
				}
			}
			else
			{
				this.framesCurrent = 0;
				this.frameRow = 0;
				this.frameColumn = 0;
			}
		}
	}



	update() {
		this.draw();
		this.animateFrames();
	}
}



// This is the class for a Fighter
class Fighter extends Sprite {
	constructor({
		position,
		velocity,
		facing,
		color = 'red', 
		imageSrc,
		scale = 1, 
		framesMax = 1, 
		frameColumns = 1, 
		frameRows = 1,
		offset = {x: 0, y: 0},
		sprites,
		attackBox = {
			offset: {},
			width: undefined,
			height: undefined
		}
	}) {

		// Calls the parent constructor.  These are the properties we want to set
		super({
			position,
			imageSrc,
			scale,
			framesMax,
			frameColumns,
			frameRows,
			offset
		})

		this.velocity 	= velocity;
		this.height 	= 150;
		this.width 		= 65;

		this.color = color;

		this.lastKey;

		this.attackBox = {
			position: {
				x: this.position.x,
				y: this.position.y
			},
			offset: attackBox.offset,
			width: attackBox.width,
			height: attackBox.height
		};

		this.isAttacking = false;

		// 100 HP
		this.health = 100;

		this.framesCurrent 	= 0;
		this.framesElapsed  = 0;
		this.framesHold     = 10; // loop the animation every 10 frames instead of every 1 frame
		this.frameColumn 	= 0;
		this.frameRow 		= 0;

		this.sprites = sprites;

		this.dead = false;

		this.facing = facing;

		for (const sprite in this.sprites)
		{
			sprites[sprite].image 		= new Image();
			sprites[sprite].image.src 	= sprites[sprite].imageSrc;
		}
	}

	// Updates the positon of the Fighter
	update() {
		// Draws the fighter on the frame
		this.draw();

//SHOW HURT BOX TEST CODE
 c.fillStyle = '#4bff008c';
 c.fillRect(this.position.x, this.position.y, this.width, this.height);


		// If fighter is dead then we can stop the animation
		if(!this.dead)
		{
			this.animateFrames();			
		}

		// Manages Attack box position on x and y axis
		this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
		this.attackBox.position.y = this.position.y + this.attackBox.offset.y;





		if ((this.facing === 'left'
			&& this.attackBox.offset.x >= 0) ||
			(this.facing === 'right'
			&& this.attackBox.offset.x < 0))
		{
			this.attackBox.offset.x *= -1;
		}



//SHOW ATTACK BOX TEST CODE
 c.fillStyle = '#8078ff9e';
 c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);


		// Adds the velocity modifiers to the position value
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		// gravity function
		if (this.position.y + this.height + this.velocity.y >= canvas.height - 75)
		{
			// Fighter hit the ground so remove their velocity completely
			this.velocity.y = 0;
			this.position.y = 352; // hardcoding setting the player to the floor
		}
		else
		{
			// Otherwise apply the gravity modifier to their velocity
			this.velocity.y += gravity;
		}
	}

	attack() {
		this.switchSprite('attack1');
		this.isAttacking = true;
	}

	takeHit() {
		this.health -= 20;

		if(this.health <= 0)
		{
			this.switchSprite('death');
		}
		else
		{
			this.switchSprite('takeHit');
		}
	}

	/**
	 * Sets a new sprite and resets the frame counters
	 **/
	setNewSprite(sprite) {
		this.image 			= this.sprites[sprite].image;	
		this.framesMax 		= this.sprites[sprite].framesMax;
		this.frameColumns 	= this.sprites[sprite].frameColumns;
		this.frameRows 		= this.sprites[sprite].frameRows;
		this.framesCurrent  = 0;
		this.frameColumn 	= 0;
		this.frameRow 		= 0;
	}

	switchSprite(sprite) {

		// overrides all other animations if fighter is dead
		if (this.image === this.sprites.death.image)
		{
			if (this.framesCurrent === this.sprites.death.framesMax -1)
			{
				this.dead = true;
			}

			return;
		}

		// overrides all other animations with the attack animation
		if (this.image === this.sprites.attack1.image &&
			this.framesCurrent < this.sprites.attack1.framesMax -1)
		{
			return;
		}

		// overrides all other animations if fighter is being hit
		if (this.image === this.sprites.takeHit.image &&
			this.framesCurrent < this.sprites.takeHit.framesMax -1)
		{
			return;
		}

		if (this.image !== this.sprites[sprite].image)
		{
			this.setNewSprite(sprite);
		}
	}
}
