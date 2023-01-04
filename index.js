const canvas = document.querySelector('canvas');

// Instance of two dimensional canvas
const c = canvas.getContext('2d');

// Fall faster, need more velocity to fight against this force
const gravity = 1.2;

// Width and height of the game view port
canvas.width  = 1024;
canvas.height = 576;

// Creating the canvas
c.fillRect(0, 0, canvas.width, canvas.height);



const background = new Sprite({
	position: {
		x: 0,
		y: -10
	},
	imageSrc: './img/backgrounds/templeBackground.png',
	scale: 1.75,
	framesMax: 38,
	frameColumns: 38,
	frameRows: 1
});

const tempAnimation = new Sprite({
	position: {
		x: 500,
		y: 100
	},
	imageSrc: './img/tempAnimatedSprite.png',
	scale: 2,
	framesMax: 60,
	frameColumns: 8,
	frameRows: 8
});


// Player 1
const player = samuraiMack;

// Player 1 position when the round starts
player.position.x = 250;



// Player 2
const enemy = ponyBoy;

// Player 2 position when the round starts
enemy.position.x = 700;

//flipping Player 2 to face left
enemy.facing = 'left';





const keys = {
	w: {
		pressed: false
	},	
	a: {
		pressed: false
	},
	s: {
		pressed: false
	},
	d: {
		pressed: false
	},
	ArrowUp: {
		pressed: false
	},
	ArrowLeft: {
		pressed: false
	},
	ArrowDown: {
		pressed: false
	},
	ArrowRight: {
		pressed: false
	}
}





// Infinite loop that draws frames
function animate() {
	window.requestAnimationFrame(animate)

	// Background color of the canvas;
	c.fillStyle = 'black';

	// Redraw the canvas on each frame
	c.fillRect(0, 0, canvas.width, canvas.height);

	background.update();

	tempAnimation.update();


	// White overlay to help the user see the characters on top of the background layers
	c.fillStyle = 'rgba(255, 255, 255, 0.15)';
	c.fillRect(0, 0, canvas.width, canvas.height);

	// Redraw the Fighters;
	player.update();
	enemy.update();

	// Reset velocity
	player.velocity.x = 0;
	enemy.velocity.x = 0;







	// Player 1 Movement

	if (keys.a.pressed &&
		player.lastKey === 'a')
	{
		// move left
		player.velocity.x = -5;
		player.switchSprite('run');
	}
	else 
	if (keys.s.pressed && 
		player.lastKey === 's')
	{
		// crouch
	}
	else 
	if (keys.d.pressed && 
		player.lastKey === 'd')
	{
		// move right
		player.velocity.x = 5;
		player.switchSprite('run');
	}
	else
	{
		//	Default idle animation when no buttons are pressed
		player.switchSprite('idle');		
	}


	// JUMP or FALL animmation
	// If player is moving up in the air
	if (player.velocity.y < 0)
	{
		player.switchSprite('jump');
	}
	else
	if (player.velocity.y > 0)
	{
		player.switchSprite('fall');
	}








	// Player 2 Movement
	if (keys.ArrowLeft.pressed &&
		enemy.lastKey === 'ArrowLeft')
	{
		// move left
		enemy.velocity.x = -5;
		enemy.switchSprite('run');
	}
	else 
	if (keys.ArrowDown.pressed && 
		enemy.lastKey === 'ArrowDown')
	{
		// crouch
	}
	else 
	if (keys.ArrowRight.pressed && 
		enemy.lastKey === 'ArrowRight')
	{
		// move right
		enemy.velocity.x = 5;
		enemy.switchSprite('run');
	}
	else
	{
		//	Default idle animation when no buttons are pressed
		enemy.switchSprite('idle');		
	}


	// JUMP or FALL animmation
	// If enemy is moving up in the air
	if (enemy.velocity.y < 0)
	{
		enemy.switchSprite('jump');
	}
	else
	if (enemy.velocity.y > 0)
	{
		enemy.switchSprite('fall');
	}

	// Switches the attack box direction
	setFightersFacing({player: player, enemy: enemy});

	// This says the 4th frame is the active attack frame
	if (rectangularCollison ({
		rectangle1: player,
		rectangle2: enemy
		}) &&
		player.isAttacking &&
		player.framesCurrent === 4)
	{
		console.log('player attack successful!');
		player.isAttacking = false;

		enemy.takeHit();

		// set the health bar to the new health value calculated after the hit
		//document.querySelector('#enemyHealth').style.width = enemy.health + '%';
		gsap.to('#enemyHealth', {
			width: enemy.health + '%'
		});
	}

	// if player misses
	if (player.isAttacking && player.framesCurrent === 4)
	{
		player.isAttacking = false;
	}





	if (rectangularCollison ({
		rectangle1: enemy,
		rectangle2: player
		}) &&
		enemy.isAttacking &&
		enemy.framesCurrent === 4)
	{
		console.log('enemy attack successful!');
		enemy.isAttacking = false;

		player.takeHit();

		// set the health bar to the new health value calculated after the hit
		//document.querySelector('#playerHealth').style.width = player.health + '%';
		gsap.to('#playerHealth', {
			width: player.health + '%'
		});
	}

	// if enemy misses
	if (enemy.isAttacking && enemy.framesCurrent === 4)
	{
		enemy.isAttacking = false;
	}



	// end game based on helath
	if (enemy.health <= 0 ||
		player.health <= 0)
	{
		determineWinner({player, enemy, timerID});
	}




}


// Starts the game
animate();



window.addEventListener('keydown', (event) => {
	if (!player.dead)
	{
		switch (event.key) {
			case 'w':
				player.velocity.y = -30;
				break;

			case 'a':
				keys.a.pressed = true;
				player.lastKey = event.key;
				break;

			case 's':
				keys.s.pressed = true;
				player.lastKey = event.key;
				break;

			case 'd':
				keys.d.pressed = true;
				player.lastKey = event.key;
				break;

			case ' ':
				player.attack();
				break;
		}
	}

	if (!enemy.dead)
	{
		switch (event.key) {
			case 'ArrowUp':
				enemy.velocity.y = -30;
				break;

			case 'ArrowLeft':
				keys.ArrowLeft.pressed = true;
				enemy.lastKey = event.key;
				break;

			case 'ArrowDown':
				keys.ArrowDown.pressed = true;
				enemy.lastKey = event.key;
				break;

			case 'ArrowRight':
				keys.ArrowRight.pressed = true;
				enemy.lastKey = event.key;
				break;

			case 'Control':
				enemy.attack();
				break;

		}
	}
})

window.addEventListener('keyup', (event) => {
	switch (event.key) {
		case 'w':
			keys.w.pressed = false;
			break;			
		case 'a':
			keys.a.pressed = false;
			break;
		case 's':
			keys.s.pressed = false;
			break;
		case 'd':
			keys.d.pressed = false;
			break;
		case 'ArrowUp':
			keys.ArrowUp.pressed = false;
			break;			
		case 'ArrowLeft':
			keys.ArrowLeft.pressed = false;
			break;
		case 'ArrowDown':
			keys.ArrowDown.pressed = false;
			break;
		case 'ArrowRight':
			keys.ArrowRight.pressed = false;
			break;
	}
})