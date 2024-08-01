/**
 * Puerto
 * Configuración del puerto con el cual se despliega la aplicación
 */
// process.env.PORT = process.env.PORT || 5000;

/**
 * Entorno
 */
process.env.NODE_ENV = process.env.NODE_ENV || "development";

/**
 * JWT expiración
 */
process.env.JWT_EXPIRES_IN = 60 * 60 * 24 * 1;

/**
 * JWT secret
 */
process.env.JWT_SIGN_SECRET =
  process.env.JWT_SIGN_SECRET || "cU3js0WqX71cWdyTSlNRVo3zuZOLWcmCK";

/**
 * Base de datos
 */
let urlDB;
if (process.env.NODE_ENV === "development") {
  urlDB = "mongodb://localhost:27017/software_component";
} else {
  urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

/**
 * Session secret
 */
process.env.SESSION_SECRET =
  process.env.SESSION_SECRET || "VU6js0WqR71cWRbK1L6RVo3zuZOLCcmCK";

/**
 * Session Time
 */
process.env.SESSION_TIME = process.env.SESSION_TIME || 1000 * 60 * 30;

process.env.PORT = process.env.PORT || 3000;