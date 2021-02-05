/**
 * Entorno
 */
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

/**
 * Puerto
 * Configuración del puerto con el cual se despliega la aplicación
 */
process.env.PORT = process.env.PORT || 3000;

/**
 * Base de datos
 */
let urlDB;
if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/forms";
} else {
  urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;
