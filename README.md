# Instructivo de instalación

Este documento describe los pasos para instalar y ejecutar la aplicación con **Node.js**, **Express** y **MongoDB**.

---

## 1. Requisitos previos

Tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (v20 o superior recomendado)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (por defecto se ejecuta en `localhost:27017`)
- [Git](https://git-scm.com/) (opcional, para clonar el repositorio)

---

## 2. Clonar repositorio e instalar dependencias

```bash
git clone https://github.com/breinerhdez/form-base.git citdev-express
cd citdev-express
npm install
```

---

## 3. Configurar conexión a la base de datos

En el archivo `config/config.js` ya hay una configuración previa para el entorno por defecto `development`.

```js
urlDB = "mongodb://localhost:27017/software_component";
```

Donde `software_component` se puede reemplazar por el nombre de la base de datos que vaya a ser utilizado y `27017` el puerto en el cual está ejecutándose `MongoDB`.

---

## 4. Configurar puerto de la aplicación

En el archivo `config/config.js` está configurado para que la aplicación use el puerto `3000`. Sin embargo, lo puede cambiar por cualquier otro puerto disponible.

```js
process.env.PORT = process.env.PORT || 3000;
```

---

## 5. Insertar usuario administrador

Cambiarse a la base de datos. Recuerde usar el nombre de su base de datos si la creó con otro nombre.

```js
use software_component
```

Insertar usuario inicial con permisos.

```js
db.core_users.insertOne({
  name: "My User Name",
  email: "mytest@test.com",
  password: "$2b$12$7afguKf.T6b44TZC.6qhzev8cgWXo9ozzvjacsLxySuoB4QgQTclS",
  status: true,
  rols: ["API", "CITDEV", "CRUD", "ADMIN"],
});
```

---

## 6. Ejecutar la aplicación

```bash
npm start
```

---

## 7. Probar la aplicación

La aplicación se puede validar en [localhost:3000](http://localhost:3000) si no cambió el puerto por defecto, de lo contrario modificar al puerto configurado.

---

## Licencia GNU AGPL
En el formulario usar el correo electrónico `mytest@test.com`, la contraseña `123456*` y presionar el botón `Enviar`.

---
