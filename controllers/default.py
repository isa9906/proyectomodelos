# -*- coding: utf-8 -*-
# -------------------------------------------------------------------------
# This is a sample controller
# this file is released under public domain and you can use without limitations
# -------------------------------------------------------------------------

# ---- example index page ----
def check():
    idJuego = request.args(0)
    idJugador = request.args(1)
    bandera = False
    if(db.executesql("select * from RegistrosJuegos where idJuego="+idJuego+" and idJugador="+idJugador+"")): bandera = True
    if(bandera==False):
        db.executesql("insert into RegistrosJuegos (idJuego,idJugador,vecesJugadas) values ("+idJuego+","+idJugador+",1)")
    else:
        db.executesql("update RegistrosJuegos set vecesJugadas=vecesJugadas+1 where idJuego="+idJuego+" and idJugador="+idJugador+"")
    return 
def memorama():
    db.executesql("update Juego set popularidad=popularidad+1 where nombreJuego='Memorama'")
    return dict()
def second():
    nombre = request.function
    db.executesql("update Juego set popularidad=popularidad+1 where nombreJuego='PROFESUD'")
    return dict(nombre=nombre)
def juegos():
    juegosdisp=db.executesql("select nombreJuego,link,imagen,idJuego from Juego")
    juegos = db.executesql("select nombreJuego,link,imagen,idJuego from Juego order by popularidad desc")
    jugadores = db.executesql("select nombreJugador from Jugador")
    return dict(juegos=juegos,jugadores=jugadores,juegosdisp=juegosdisp)
def index():
    return dict()
def pacman():
    db.executesql("update Juego set popularidad=popularidad+1 where nombreJuego='PACMAN'")
    return dict()
def elude():
    db.executesql("update Juego set popularidad=popularidad+1 where nombreJuego='Elude Asteroids'")
    return dict()
def snake():
    db.executesql("update Juego set popularidad=popularidad+1 where nombreJuego='Snake'")
    return dict()
def pokemon():
    db.executesql("update Juego set popularidad=popularidad+1 where nombreJuego='Pokemon'")
    return dict()
def asteroids():
    db.executesql("update Juego set popularidad=popularidad+1 where nombreJuego='Asteroids'")
    return dict()
# ---- API (example) -----
@auth.requires_login()
def api_get_user_email():
    if not request.env.request_method == 'GET': raise HTTP(403)
    return response.json({'status':'success', 'email':auth.user.email})

# ---- Smart Grid (example) -----
@auth.requires_membership('admin') # can only be accessed by members of admin groupd
def grid():
    response.view = 'generic.html' # use a generic view
    tablename = request.args(0)
    if not tablename in db.tables: raise HTTP(403)
    grid = SQLFORM.smartgrid(db[tablename], args=[tablename], deletable=False, editable=False)
    return dict(grid=grid)

# ---- Embedded wiki (example) ----
def wiki():
    auth.wikimenu() # add the wiki to the menu
    return auth.wiki() 

# ---- Action for login/register/etc (required for auth) -----
def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/bulk_register
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    also notice there is http://..../[app]/appadmin/manage/auth to allow administrator to manage users
    """
    return dict(form=auth())

# ---- action to server uploaded static content (required) ---
@cache.action()
def download():
    """
    allows downloading of uploaded files
    http://..../[app]/default/download/[filename]
    """
    return response.download(request, db)
