const ponyBoy = new Fighter({
	position: {x: 0, y: 0},
	velocity: {x: 0, y: 0},
	facing: 'right',
	color: 'blue',
	offset: {
		x: 125,
		y: 55
	},
	imageSrc: './img/characters/TestChar2/Sprites/Idle.png',
	scale: 2.5,
	framesMax: 10,
	frameColumns: 10,
	frameRows: 1,
	sprites: {
		idle: {
			imageSrc: './img/characters/TestChar2/Sprites/Idle.png',
			framesMax: 10,
			frameColumns: 10,
			frameRows: 1,
		},
		run: {
			imageSrc: './img/characters/TestChar2/Sprites/Run.png',
			framesMax: 8,
			frameColumns: 8,
			frameRows: 1,
		},
		jump: {
			imageSrc: './img/characters/TestChar2/Sprites/Jump.png',
			framesMax: 3,
			frameColumns: 3,
			frameRows: 1
		},
		fall: {
			imageSrc: './img/characters/TestChar2/Sprites/Fall.png',
			framesMax: 3,
			frameColumns: 3,
			frameRows: 1
		},
		attack1: {
			imageSrc: './img/characters/TestChar2/Sprites/Attack1.png',
			framesMax: 7,
			frameColumns: 7,
			frameRows: 1
		},
		takeHit: {
			imageSrc: './img/characters/TestChar2/Sprites/TakeHit.png',
			framesMax: 3,
			frameColumns: 3,
			frameRows: 1
		},
		death: {
			imageSrc: './img/characters/TestChar2/Sprites/Death.png',
			framesMax: 11,
			frameColumns: 11,
			frameRows: 1
		}
	},
	attackBox: {
		offset: {
			x: 120,
			y: 0
		},
		width: 70,
		height: 150
	}
})