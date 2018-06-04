var jugando;

$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	jugando = true;
	myCanvas = $("#myCanvas")[0];
	contexto = myCanvas.getContext("2d");
	buffer = document.createElement("canvas");
	estud = new estudiante();
	canProfes = aleatorio(60,70);
	profes = [];
	for(i=0;i<canProfes;i++){
		profes[i] = new profesor();
	}
	run();
	$("#iniciar").click(function(){	
		if(jugando==false)
			inicio();	
	});
}

function capturaTeclado(event){
	if(event.which==38 || event.which==87)
		estud.actualizar('up');
	if(event.which==40 || event.which==83)
		estud.actualizar('down');
	if(event.which==39 || event.which==68)
		estud.actualizar('right');
	if(event.which==37 || event.which==65)
		estud.actualizar('left');
}

function aleatorio(inferior,superior){
	return Math.floor(Math.random()*(superior-inferior+1)) + inferior;
}

function run(){
	buffer.width = myCanvas.width;
	buffer.height = myCanvas.height;
	contextoBuffer = buffer.getContext("2d");
	if(jugando){
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		estud.dibujar(contextoBuffer);
		for(i=0;i<profes.length;i++){
			profes[i].dibujar(contextoBuffer);
			profes[i].actualizar();
			//colicion
			if(estud.colicion(profes[i].x,profes[i].y)){
				if(profes[i].tipo==1){ //profesor bueno
					estud.puntos++;
				}
				else{
					estud.vida--;
				}
			}
		}
		if(estud.vida<=0 || estud.puntos>=100){
			jugando = false;
		}
		contexto.clearRect(0,0,myCanvas.width,myCanvas.height);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("run()",150);
	}
	else{
		if(estud.vida<=0){
			contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
			contextoBuffer.fillStyle = "#FFFFFF";
			estud.vida = 0;
			estud.dibujar(contextoBuffer);
			contextoBuffer.font = "50px sans-serif";
			contextoBuffer.fillText("GAMEOVER", 300, 440);
			contextoBuffer.fillStyle = "#FFFFFF";
			contextoBuffer.font = "15px sans-serif";
			contextoBuffer.fillText("Try again", 550, 460);
			contexto.clearRect(0,0,myCanvas.width,myCanvas.height);
			contexto.drawImage(buffer, 0, 0);
		}
		else{
			contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
			contextoBuffer.fillStyle = "#FFFFFF";
			estud.vida = 0;
			estud.dibujar(contextoBuffer);
			contextoBuffer.font = "50px sans-serif";
			contextoBuffer.fillText("YOU WON!", 300, 440);
			contextoBuffer.fillStyle = "#FFFFFF";
			contextoBuffer.font = "15px sans-serif";
			contextoBuffer.fillText("Do it again!", 550, 460);
			contexto.clearRect(0,0,myCanvas.width,myCanvas.height);
			contexto.drawImage(buffer, 0, 0);
		}
	}
}
