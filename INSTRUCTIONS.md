# INSTRUCCIONES DE INSTALACIÓN

### 1º Instalar dependecias

- Abrir un terminal de consola
- Abrir el directorio del backend
- Ejecutar el siguiente comando: `npm i`
- Abrir el directorio del frontend
- Ejecutar el siguiente comando: `npm i`

### 2º Generar la Base de datos

- Abrir el directorio de la aplicación
- Ejecutar el archivo sql `./db/fiverr.sql`
- Abrir un terminal de consola
- Ejecutar el siguiente comando: `node ./db/initDB.js` (Para así generar los archivos necesarios en local)

### 3º Lanzar la aplicación

- Crear un archivo .env, basandose en el .env.example existente. Es importante que los credenciales SQL sean los del servidor local donde se ejecutará la API
- Abrir un terminal de consola
- Abrir el directorio de la aplicación
- Ejecutar el siguiente comando: `npm run dev`

##### \*Nota: Existe un directorio llamado testing con archivos y fotos para interactuar con la API

---
