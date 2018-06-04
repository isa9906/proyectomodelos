# -*- coding: utf-8 -*-
# try something like
def vistaJuego(): 
    gridJuego = SQLFORM.grid(db.Juego)
    return dict(grid=gridJuego)
