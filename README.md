# Pokedex Api - Nestjs

<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="160" alt="Nest Logo" />
</div>

## Requisitos Previos

> [Nodejs 18.15.0](https://nodejs.org/download/release/v18.15.0/)

> [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

> [Nest Cli](https://docs.nestjs.com/cli/overview/)

> [Postman](https://www.postman.com/downloads/)

> [Docker Desktop](https://www.docker.com/products/docker-desktop/)

> [MongoDB Compass](https://www.mongodb.com/es/products/compass/)

## Ejecutar en Desarrollo

### Paso 1: Clonar el repositorio

Ingresamos a <https://github.com/Gilgammesh/nestjs-teslo-api>

### Paso 2: Instalar Nest Cli de forma global

```sh
npm install @nestjs/cli -g
```

### Paso 3: Instalar las dependencias

```sh
yarn install
```

### Paso 4: Levantar la base de datos

Tener `Docker Desktop` abierto y ejecutar

```sh
docker-compose -f .\docker-compose.yaml up --build -d
```

### Paso 5: Clonar plantilla de variables de entorno

Copiar el archivo `.env.template` y renombrar la copia a `.env`

### Paso 6: Llenar las variables de entorno

Ingresar los valores de las variables de entorno definidas en el archivo `.env`

```dotenv
NODE_ENV=env
PORT=4000
DB_POSTGRES_HOST=localhost
DB_POSTGRES_PORT=5432
DB_POSTGRES_NAME=teslo
DB_POSTGRES_USER=postgresl
DB_POSTGRES_PASSWORD=123456
```

### Paso 7: Poblar la base de datos con la semilla

Ejecutar la petición del tipo `GET`

<http://localhost:4000/api/seed>

### Paso 8: Ejecutar la aplicación

En desarrollo

```sh
yarn start:dev
```

## Documentacion de la Api

### Paso 1: Ingresar a la Url de la Api

<http://localhost:4000/api>

### Paso 2: Autenticar un usuario registrado

Si no se tiene un usuario seguir al `Paso 3`

Ir al Tag `Auth`

Ejecutar la ruta `Post` `/api/auth/login`

Body:

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

Copiar el `token` devuelto en la respuesta y continuar el `Paso 4`

### Paso 3: Registrar un usuario

Ir al Tag `Auth`

Ejecutar la ruta `Post` `/api/auth/register`

Body:

```json
{
  "email": "user@gmail.com",
  "password": "123456",
  "fullName": "Jhon Doe"
}
```

Copiar el `token` devuelto en la respuesta y continuar el `Paso 4`

### Paso 4: Autorizar todas las rutas

Ir a la parte superior derecha al botón `Authorize` con el icono del candado

Ingresar el `token` copia en el input `Value`

Damos click en el botón `Authorize` y luego click al botón `Close`

### Paso 5: Testear las API's

Con las rutas autorizadas podremos testear todas la Apis de la aplicación
