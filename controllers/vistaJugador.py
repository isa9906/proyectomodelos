# -*- coding: utf-8 -*-
# try something like
def vistaJugador(): 
    gridJugador = SQLFORM.grid(db.Jugador)
    return dict(grid=gridJugador)
