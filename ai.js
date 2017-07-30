var board = [0,1,2,3,4,5,6,7,8];
var humanPlayer = 'O', aiPlayer = 'X';

function reloadGame(){
    board = [0,1,2,3,4,5,6,7,8];
    $('canvas').each(function(){
        var x = parseInt($(this).attr('id'));
        var c = document.getElementById(x);
        var ctx=c.getContext('2d');
        ctx.clearRect(0,0,100,100);
    })

}

function checkWinner(){
	for(var i=0;i<9;i+=3){
	    if( board[i] === board[i+1] && board[i+1] === board[i+2]){
            if(board[i] === aiPlayer )
                return 10;
            else 
                return -10;
        }

	}
    
    for(var i=0;i<3;i++){
		if( board[i] === board[i+3] && board[i+3] === board[i+6]){
            if(board[i] === aiPlayer )
                return 10;
            else 
                return -10;
        }
    }
    
	if( board[0] === board[4] && board[4] === board[8]){
        if(board[0] === aiPlayer )
                return 10;
            else 
                return -10;
    }
	if( board[2] === board[4] && board[4] === board[6]){
        if(board[2] === aiPlayer )
                return 10;
            else 
                return -10;
    }
	else
		return 0;
}

function emptySpots(){
	availSpots = [];
	for(var i = 0; i < 9; i++){
		if(board[i] !== 'X' && board[i] !== 'O')
			availSpots.push(board[i]);
	}
	return availSpots;
}

function minimax(isMax,depth){
	var score = checkWinner();
    if(score === 10 || score === -10)
        return score;
    var movesLeft = emptySpots();
    if(movesLeft.length === 0)
        return 0;
    if(isMax){
        var best = -1000;
        for(var i = 0; i < 9; i++){
            if(board[i] !== 'X' && board[i] !== 'O'){
                board[i] = aiPlayer;
                best = Math.max(best,minimax(false,depth + 1))
                board[i] = i;
            }
        }
    return best;
    }
    if(!isMax){
        var best = 1000;
        for(var i = 0; i < 9; i++){
            if(board[i] !== 'X' && board[i] !== 'O'){
                board[i] = humanPlayer;
                best = Math.min(best,minimax(true,depth + 1))
                board[i] = i;
            }
        }
    return best;
    }

}

function drawO(x){
    var c = document.getElementById(x);
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.arc(50, 50, 20 ,0, 2*Math.PI, false);
    ctx.lineWidth=5;
    ctx.strokeStyle='#e0065a';
    ctx.stroke();
    board[x] = humanPlayer;
}

function drawX(a){
    var c2 = document.getElementById(a);
    var ctx2 = c2.getContext('2d');
    ctx2.beginPath();
    ctx2.moveTo(30, 30);
    ctx2.lineTo(70, 70);
    ctx2.stroke();
    ctx2.moveTo(70, 30);
    ctx2.lineTo(30, 70);
    ctx2.lineWidth=5;
    ctx2.strokeStyle='#06e0e0';
    ctx2.stroke();
    board[a] = aiPlayer;
}

function findBestMove(){
	var bestVal = -1000;
	var bestMove = -1;
	for(var i = 0; i < 9; i++){
		if(board[i] !== 'X' && board[i] !== 'O'){
			board[i] = player;
			var moveVal = minimax(false,0);
			board[i] = i;
			if(moveVal > bestVal){
				bestMove = i;
				bestVal = moveVal;
			}
		}
	}
	return bestMove;
}

$(function(){
	$('.container > canvas').click(function(){
		var x = parseInt($(this).attr('id'));
		if(board[x] !== 'X' && board[x] !== 'O'){
			drawO(x);
            var result = checkWinner();
            if(result === -10){
                alert("You won!");
                reloadGame();
            }
            if(result === 0 && emptySpots().length === 0){
                alert("It's a tie!");
                reloadGame();
            }
			player = aiPlayer;
			var bMove = findBestMove();
			drawX(bMove);
            result = checkWinner();
            if(result === 10){
                alert("Computer won!");
                reloadGame();
            }
            if(result === 0 && emptySpots().length === 0){
                alert("It's a tie!");
                reloadGame();
            }
		}
	})
})