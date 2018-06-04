# -*- coding: utf-8 -*-
# try something like
def vistaRegistros():
    gridRegistros = SQLFORM.grid(db.RegistrosJuegos)
    return dict(grid=gridRegistros)
