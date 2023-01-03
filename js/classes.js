
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


class GifBackground {

	constructor({ position, srcDir, scale = 1, framesMax = 1 }) {
		this.position 		= position;
		this.height 		= 150;
		this.width 			= 50;
		this.image 			= new Image();
		this.srcDir   		= srcDir;
		this.image.src 		= srcDir + '0.gif';
		this.scale 			= scale;
		this.framesMax  	= framesMax;
		this.framesCurrent 	= 0;
		this.framesElapsed  = 0;
		this.framesHold     = 5; // loop the animation every 10 frames instead of every 1 frame
	}

	draw() {
		c.drawImage(
			this.image,
			0,
			0,
			this.image.width, 
			this.image.height,
			this.position.x,
			this.position.y,
			this.image.width * this.scale,
			this.image.height * this.scale
		);
	}	

	update() {

		this.draw();

		this.framesElapsed++;

		if (this.framesElapsed % this.framesHold === 0)
		{
			if (this.framesCurrent < this.framesMax -1)
			{
				this.framesCurrent++;

			}
			else
			{
				this.framesCurrent = 0;
			}

			this.image.src 		= this.srcDir + this.framesCurrent + '.gif';
		}
	}
}









// This is the class for a Fighter
class Fighter extends Sprite {
	constructor({
		position,
		velocity, 
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
// c.fillStyle = '#4bff008c';
// c.fillRect(this.position.x, this.position.y, this.width, this.height);


		// If fighter is dead then we can stop the animation
		if(!this.dead)
		{
			this.animateFrames();			
		}

		// Manages Attack box position on x and y axis
		this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
		this.attackBox.position.y = this.position.y + this.attackBox.offset.y;


//SHOW ATTACK BOX TEST CODE
// c.fillStyle = '#8078ff9e';
// c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);


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


	switchSprite(sprite) {

		// overrides all other animations if fighter is being hit
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

		switch (sprite) {
			case 'idle':
				if (this.image !== this.sprites.idle.image)
				{
					this.image 		= this.sprites.idle.image;	
					this.framesMax 	= this.sprites.idle.framesMax;
					this.framesCurrent = 0;
					this.frameColumn 	= 0;
					this.frameRow 		= 0;
					this.frameColumns = this.sprites.idle.frameColumns;
					this.frameRows = this.sprites.idle.frameRows;
				}
				break;
			case 'run':
				if (this.image !== this.sprites.run.image)
				{
					this.image 		= this.sprites.run.image;
					this.framesMax 	= this.sprites.run.framesMax;
					this.framesCurrent = 0;
					this.frameColumn 	= 0;
					this.frameRow 		= 0;
					this.frameColumns = this.sprites.run.frameColumns;
					this.frameRows = this.sprites.run.frameRows;

				}
				break;
			case 'jump':
				if (this.image !== this.sprites.jump.image)
				{
					this.image 	 	= this.sprites.jump.image;
					this.framesMax 	= this.sprites.jump.framesMax;
					this.framesCurrent = 0;
					this.frameColumn 	= 0;
					this.frameRow 		= 0;
					this.frameColumns = this.sprites.jump.frameColumns;
					this.frameRows = this.sprites.jump.frameRows;
				}
				break;
			case 'fall':
				if (this.image !== this.sprites.fall.image)
				{
					this.image 	 	= this.sprites.fall.image;
					this.framesMax 	= this.sprites.fall.framesMax;
					this.framesCurrent = 0;
					this.frameColumn 	= 0;
					this.frameRow 		= 0;
					this.frameColumns = this.sprites.fall.frameColumns;
					this.frameRows = this.sprites.fall.frameRows;
				}
				break;
			case 'attack1':
				if (this.image !== this.sprites.attack1.image)
				{
					this.image 	 	= this.sprites.attack1.image;
					this.framesMax 	= this.sprites.attack1.framesMax;
					this.framesCurrent = 0;
					this.frameColumn 	= 0;
					this.frameRow 		= 0;
					this.frameColumns = this.sprites.attack1.frameColumns;
					this.frameRows = this.sprites.attack1.frameRows;
				}
				break;
			case 'takeHit':
				if (this.image !== this.sprites.takeHit.image)
				{
					this.image 	 	= this.sprites.takeHit.image;
					this.framesMax 	= this.sprites.takeHit.framesMax;
					this.framesCurrent = 0;
					this.frameColumn 	= 0;
					this.frameRow 		= 0;
					this.frameColumns = this.sprites.takeHit.frameColumns;
					this.frameRows = this.sprites.takeHit.frameRows;
				}
				break;
			case 'death':
				if (this.image !== this.sprites.death.image)
				{
					this.image 	 	= this.sprites.death.image;
					this.framesMax 	= this.sprites.death.framesMax;
					this.framesCurrent = 0;
					this.frameColumn 	= 0;
					this.frameRow 		= 0;
					this.frameColumns = this.sprites.death.frameColumns;
					this.frameRows = this.sprites.death.frameRows;
				}
				break;
		}
	}
}
