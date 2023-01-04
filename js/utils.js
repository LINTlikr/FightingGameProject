function rectangularCollison({rectangle1, rectangle2}) {
	return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
			rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
			rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
			rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height);
}


function setFightersFacing({player, enemy}) {
	
console.log(player);

	if (player.position.x > enemy.position.x)
	{
		player.facing = 'left';
		enemy.facing = 'right';
	}
	else
	{
		player.facing = 'right';
		enemy.facing = 'left';
	}

}



function determineWinner({player, enemy, timerID}){
	clearTimeout(timerID);
	document.querySelector('#displayText').style.display = 'flex';
	if (player.health === enemy.health)
	{
		document.querySelector('#displayText').innerHTML = 'Draw Game!';
	}
	else
	if (player.health > enemy.health)
	{
		document.querySelector('#displayText').innerHTML = 'Player One Wins!';
	}
	else
	{
		document.querySelector('#displayText').innerHTML = 'Player Two Wins!';
	}
}


let timer = 60;
let timerID;

function decreaseTimer() {

	if (timer > 0)
	{
		timerID = setTimeout(decreaseTimer, 1000);
		timer--;
		document.querySelector('#timer').innerHTML = timer;
	}


	if (timer === 0)
	{
		determineWinner({player, enemy, timerID});
	}
}

decreaseTimer();