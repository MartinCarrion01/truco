# API de truco

Código del lado del servidor del juego donde está contenida la implementación de la lógica del negocio del problema.

# ¿Como instalar y usar?

Primero tenemos que clonar este proyecto en nuestra computadora.
Luego, en la línea de comandos, en la raiz del proyecto ejecutar los siguientes comandos

```
bundle install
rails server -p 3001
```

## Dependencias

Tenemos que tener las siguientes dependencias para que el proyecto funcione correctamente

### Ruby

Versión 3.2.2 o mayor

### PostgreSQL

Este proyecto usa PostgreSQL como base de datos.
Cabe destacar que nuestra aplicación va a revisar el puerto 5000 para conectar con la base de datos

Podemos usar Docker para correr Mongo

```
docker container run --name truco -e POSTGRES_PASSWORD=root -d -p 5000:5432 postgres
```
O seguir las guías de instalación de postgre del sitio oficial: [Instalar postgresql](https://www.postgresql.org/download/)
