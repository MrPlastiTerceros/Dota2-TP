# Proyecto Dota 2 ComIT

## Para iniciar el proyecto

1. Ingresar a la carpeta /server
2. Actualizar/instalar los componentes de librerías con `npm update`  (al ser solo express se subio node_modules) skip this
3. Iniciar la app desde esa misma carpeta ejecutando `npm start`

Si todo sale bien, debería leerse "Escuchando puerto 5000 con Express" en la consola de Node.
En ese momento se puede abrir un browser y navegar a `localhost:5000` y debería visualizarse el index.html.


## Especificaciones del desarrollo

Los datos son obtenidos desde la api de Opendota(estadisticas base, img del PJ, partidas al momento) y un user de github(historia, talents, habilidades)

La idea general es que lo jugadores constantes puedan informarse rapido de las caracteristicas(talentos, estadisticas base, habilidades, historia introductoria) del pj clickeado. Aparte de una lista de proplayers que lo estan usando en el momento(si es el caso) junto con la cantidad de players no profesionales, con el fin de saber la pularidad del heroe PJ en cuestión.

### SERVER

*Server.js*

Es el script de inicio de la aplicación, que monta el servidor web escuchando en el puerto 5000:

### CLIENT
Es una SPA !
