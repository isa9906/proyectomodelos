function profesor(tipo){
	this.x = aleatorio(0,800);
	this.y = aleatorio(0,600);
	this.velocidad = 50;
	this.img;
	this.direccion = 0;
	this.tipo = aleatorio(1,100)%2;
	//IMAGEN
	if(this.tipo==1){
		//profesor bueno
		var style = aleatorio(1,100)%2;
		//estilo 1
		if(style==1){
			this.img = [$("#profesorBS1RIGHT")[0],$("#profesorBS1LEFT")[0],$("#profesorBS1UP")[0],$("#profesorBS1DOWN")[0]];
		}
		//estilo 2
		else{
			this.img = [$("#profesorBS2RIGHT")[0],$("#profesorBS2LEFT")[0],$("#profesorBS2UP")[0],$("#profesorBS2DOWN")[0]];
		}
	}
	else{
		//profesor malo
		var style = aleatorio(1,100)%2;
		//estilo 1
		if(style==1){
			this.img = [$("#profesorMS1RIGHT")[0],$("#profesorMS1LEFT")[0],$("#profesorMS1UP")[0],$("#profesorMS1DOWN")[0]];
		}
		//estilo 2
		else{
			this.img = [$("#profesorMS2RIGHT")[0],$("#profesorMS2LEFT")[0],$("#profesorMS2UP")[0],$("#profesorMS2DOWN")[0]];
		}
	}	
	//funcion para dibujar
	//ctx -> context
	this.dibujar = function(ctx){
		var img = this.img[this.direccion];
		ctx.drawImage(img,this.x,this.y);
	}

	this.actualizar = function(){
		var direc = aleatorio(1,50)%4;
		this.direccion = direc;
		if(direc==0){ //derecha
			this.x=this.x+this.velocidad;
		}
		else if(direc==1){ //izquierda
			this.x=this.x-this.velocidad;
		}
		else if(direc==2){ //arriba
			this.y=this.y-this.velocidad;
		}
		else if(direc==3){ //abajo
			this.y=this.y+this.velocidad;
		}
		this.y = (600+this.y)%600;
		this.x = (800+this.x)%800;
	}
}
function aleatorio(inferior,superior){
	return Math.floor(Math.random()*(superior-inferior+1)) + inferior;
}
