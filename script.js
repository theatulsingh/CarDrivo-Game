score =document.querySelector('.score');
startsc = document.querySelector('.startscreen');
gamearea = document.querySelector('.gamearea');
image = ["url('./images/image(0).png')", "url('./images/image(1).png')", "url('./images/image(2).png')", "url('./images/image(3).png')", "url('./images/image(4).png')", "url('./images/image(5).png')"];
card= new Audio('./audios/cardriving.mp3')
carc= new Audio('./audios/carcrash.mp3')
player={speed: 5, score: 0};
startsc.addEventListener('click',start);
song=true
let keys ={w: false, s: false, a: false, d: false};
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
function keyDown(e){
	e.preventDefault();
	keys[e.key]=true;
}
function keyUp(e){
	e.preventDefault();
	keys[e.key]=false;
}

function start(){
	song=true;
	setInterval(()=>{
		if(song) card.play();
	},10);
	player.speed =5; player.score=0;
	setInterval(function(){
		if(player.speed<7){
			player.speed+=0.1;
		}
	},1000);
	startsc.classList.add('hide');
	score.classList.remove('hide');
	gamearea.innerHTML="";
	player.start=true;
	window.requestAnimationFrame(Gameplay);

	for(x=0;x<5;x++){
		rdl = document.createElement('div');
		rdl.setAttribute('class', 'rdl');
		rdl.y=130*x;
		rdl.style.top=(rdl.y+"px");
		gamearea.appendChild(rdl);
	}

    car = document.createElement('div');
	car.setAttribute('class', 'car');
	gamearea.appendChild(car);
	player.x=car.offsetLeft;
	player.y=car.offsetTop;

	for(x=0;x<3;x++){
		enemyc = document.createElement('div');
		enemyc.setAttribute('class', 'enemyc');
		changecar(enemyc);
		enemyc.y=(-1*(350*(x+1)));
		enemyc.style.top=enemyc.y+"px"; 
		enemyc.style.left=(Math.floor(Math.random()*250)+"px") ;
		gamearea.appendChild(enemyc);
	}

}
function Gameplay(){
	car= document.querySelector('.car');
	road=gamearea.getBoundingClientRect(); 
	if(player.start){
		movel(); movee(car);
		if(keys.w && player.y>150){player.y-=player.speed;}
		if(keys.a && player.x>5){player.x-=player.speed;}
		if(keys.d && player.x<(road.width-55)){player.x+=player.speed;}
		if(keys.s && player.y<430){player.y+=player.speed;}
		car.style.left = player.x +'px';
		car.style.top = player.y +'px';
		score.innerText="Your Score : "+Math.floor((player.score)/10); player.score++;
		window.requestAnimationFrame(Gameplay);

	}
}

function movel(){
	lines=document.querySelectorAll('.rdl');
	lines.forEach(function(item){
		if(item.y >=600){ item.y-=660;}
		item.y +=player.speed;
		item.style.top=(item.y+"px");
	});
}
function movee(car){
	ec=document.querySelectorAll('.enemyc');
	ec.forEach(function(item){
		if(iscolide(car, item)==true){
			gameEnd();
		}
		if(item.y >=500){
			 item.y-=800;
			item.style.left=(Math.floor(Math.random()*250)+"px") ;
			changecar(item);
		}
		item.y += player.speed;
		item.style.top=(item.y+"px");
	});
}
function iscolide(a,b){
	ra=a.getBoundingClientRect(); 
	rb=b.getBoundingClientRect(); 
	return !((ra.top>rb.bottom)||(rb.top>ra.bottom)||(ra.left>rb.right)||(rb.left>ra.right));
}
function gameEnd(){
	carc.play();
	setTimeout(()=>{carc.pause()},1000);
	card.pause(); song=false;
	player.start = false;
	startsc.classList.remove('hide');
	startsc.innerHTML="GAme Over <br> Your final score is : " + (player.score) +"<br> Press here to restart the game" ;
}

function changecar(int){
	int.style.backgroundImage=image[Math.floor((Math.random()*24)/4)] ;
}










