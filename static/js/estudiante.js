function estudiante(){
	this.x = aleatorio(0,800);
	this.y = aleatorio(0,600);
	this.velocidad = 6;
	//izquierda
	this.imgLeft = [$("#estudianteLEFT1")[0],$("#estudianteLEFT2")[0],$("#estudianteLEFT3")[0],$("#estudianteLEFT4")[0],
	$("#estudianteLEFT5")[0],$("#estudianteLEFT6")[0],$("#estudianteLEFT7")[0]];
	this.left = -1;
	//derecha
	this.imgRight = [$("#estudianteRIGHT1")[0],$("#estudianteRIGHT2")[0],$("#estudianteRIGHT3")[0],$("#estudianteRIGHT4")[0],
	$("#estudianteRIGHT5")[0],$("#estudianteRIGHT6")[0],$("#estudianteRIGHT7")[0]];
	this.right = 0;
	//arriba
	this.imgUp = [$("#estudianteUP1")[0],$("#estudianteUP2")[0],$("#estudianteUP3")[0],$("#estudianteUP4")[0],
	$("#estudianteUP5")[0],$("#estudianteUP6")[0],$("#estudianteUP7")[0]];
	this.up = -1;
	//abajo
	this.imgDown = [$("#estudianteDOWN1")[0],$("#estudianteDOWN2")[0],$("#estudianteDOWN3")[0],$("#estudianteDOWN4")[0],
	$("#estudianteDOWN5")[0],$("#estudianteDOWN6")[0]];
	this.down = -1;

	this.vida = 100;
	this.puntos = 0;
	this.spriteWidth = this.imgRight[0].width;

	//funcion de dibujado
	this.dibujar = function(ctx){
		var img;
		if(this.left>=0){
			img = this.imgLeft[this.left];
		}
		else if(this.right>=0){
			img = this.imgRight[this.right]
		}
		else if(this.up>=0){
			img = this.imgUp[this.up];
		}
		else{
			img = this.imgDown[this.down];
		}
		var x = this.x;
		var y = this.y;
		ctx.drawImage(img,x,y);
		ctx.save();
		ctx.fillStyle = "#ffffff";
		ctx.font = "12px sans-serif";
		ctx.fillText("Puntos: "+ this.puntos, x, y + 65);
		ctx.fillText("Vida: "+ this.vida, x, y);
		/* aqui deberia estar el codigo que muestre el aviso cuando pierde y gana vida
		*/
		ctx.restore();
	}

	//funcion para actualizar
	this.actualizar = function(accion){
		if(accion=="right"){
			if(this.right>=0){
				this.right = (this.right+1)%7;
			}
			else{
				this.right=0;
				this.left = -1;
				this.up = -1;
				this.down = -1;
			}
			this.spriteWidth = this.imgRight[this.right].width;
			this.x+=this.velocidad;
		}
		else if(accion=="left"){
			if(this.left>=0){
				this.left = (this.left+1)%7;
			}
			else{
				this.left = 0;
				this.right = -1;
				this.up = -1;
				this.down = -1;
			}
			this.spriteWidth = this.imgLeft[this.left].width;
			this.x-=this.velocidad;
		}
		else if(accion=="up"){
			if(this.up>=0){
				this.up = (this.up+1)%7;
			}
			else{
				this.up = 0;
				this.left = -1;
				this.right = -1;
				this.down = -1;
			}
			this.spriteWidth = this.imgUp[this.up].width;
			this.y-=this.velocidad;
		}
		else if(accion=="down"){
			if(this.down>=0){
				this.down = (this.down+1)%6;
			}
			else{
				this.down = 0;
				this.up = -1;
				this.left = -1;
				this.right = -1;
			}
			this.spriteWidth = this.imgDown[this.down].width;
			this.y+=this.velocidad;
		}
		//para cuando se sale de los bordes del canvas
		this.x = (800+this.x)%800;
		this.y = (600+this.y)%600;
	}
	//funcion para colicion
	this.colicion = function(x,y){
		var distancia=Math.sqrt( Math.pow( (x-this.x), 2)+Math.pow( (y-this.y),2));
		if(distancia>this.spriteWidth){
			return false;
		}
		else{
			return true;
		}
	}
}
function aleatorio(inferior,superior){
	return Math.floor(Math.random()*(superior-inferior+1)) + inferior;
}
