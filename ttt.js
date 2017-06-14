
var player = 1,turn=0;
var board = [0,0,0,0,0,0,0,0,0];

function reloadGame(){
	player = 1,turn=0;
    board = [ 0,0,0,0,0,0,0,0,0];
    $('canvas').each(function(){
    	var x = parseInt($(this).attr('id'));
    	var c = document.getElementById(x);
    	var ctx=c.getContext('2d');
    	ctx.clearRect(0,0,100,100);
    })

}

function checkWinner(){
	for(var i=0;i<9;i+=3){
	    if( board[i] === board[i+1] && board[i+1] === board[i+2] && board[i]!=0)
		    return board[i];
	}
    
    for(var i=0;i<3;i++){
		if( board[i] === board[i+3] && board[i+3] === board[i+6] && board[i+3]!==0)
			return board[i];
    }
    
	if( board[0] === board[4] && board[4] === board[8] && board[0]!==0)
		return board[0];
	if( board[2] === board[4] && board[4] === board[6] && board[2]!==0)
		return board[2];
	else if(turn===9)
		return 0;
	else
		return false;
}

$(function(){
	$('.container > canvas').click(function(){
        if ( player === 1 ){
            var x = parseInt($(this).attr('id'));
            if(board[x]===0){
                board[x] = player;
	            player = 2;
	            turn++;
	            var c = document.getElementById(x);
	            var ctx = c.getContext('2d');
	            ctx.beginPath();
	            ctx.arc(50, 50, 20 ,0, 2*Math.PI, false);
	            ctx.lineWidth=5;
	            ctx.strokeStyle='#e0065a';
	            ctx.stroke();
            }
            

        }
        else if ( player === 2 ){
            var x2 = parseInt($(this).attr('id'));
            if(board[x2]===0){
            	board[x2] = player;
	            player = 1;
	            turn++;
	            var c2 = document.getElementById(x2);
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
            }
           
        }

        var result = checkWinner();
        if(result === 1)
        	alert('Player 1 wins');
        else if( result === 2)
        	alert('Player 2 wins');
        else if( result === 0)
        	alert('It is a tie!');
        else
        	return false;
        if(confirm('Do you want to play again?')){
        	reloadGame();
        }
	})
})