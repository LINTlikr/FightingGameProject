// Player 1
const samuraiMack = new Fighter({
	position: 		{x: 0, y: 0},
	velocity: 		{x: 0, y: 0},
	facing: 'right',
	color: 			'red',
	offset: 		{x: 215, y: 155},
	scale: 			2.5,
	imageSrc: 		'./img/characters/TestChar/Sprites/Idle.png', // TODO: Default image and frame data
	framesMax: 		8,
	frameColumns: 	8,
	frameRows: 		1,
	sprites: {
		idle: {
			imageSrc: './img/characters/TestChar/Sprites/Idle.png',
			framesMax: 8,
			frameColumns: 8,
			frameRows: 1,
		},
		run: {
			imageSrc: './img/characters/TestChar/Sprites/Run.png',
			framesMax: 8,
			frameColumns: 8,
			frameRows: 1,
		},
		jump: {
			imageSrc: './img/characters/TestChar/Sprites/Jump.png',
			framesMax: 2,
			frameColumns: 2,
			frameRows: 1
		},
		fall: {
			imageSrc: './img/characters/TestChar/Sprites/Fall.png',
			framesMax: 2,
			frameColumns: 2,
			frameRows: 1
		},
		attack1: {
			imageSrc: './img/characters/TestChar/Sprites/Attack1.png',
			framesMax: 6,
			frameColumns: 6,
			frameRows: 1
		},
		takeHit: {
			imageSrc: './img/characters/TestChar/Sprites/TakeHit.png',
			framesMax: 4,
			frameColumns: 4,
			frameRows: 1
		},
		death: {
			imageSrc: './img/characters/TestChar/Sprites/Death.png',
			framesMax: 6,
			frameColumns: 6,
			frameRows: 1
		}
	},

	attackBox: {
		offset: {
			x: 100,
			y: 0 
		},
		width: 155,
		height: 80
	}
})