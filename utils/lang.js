module.exports = {
  // HTTP errors
  ERROR_200: "OK",
  ERROR_201: "Created",
  ERROR_400: "Bad Request",
  ERROR_401: "Unauthorized",
  ERROR_403: "Forbidden",
  ERROR_404: "Not Found",
  ERROR_500: "Internal Server Error",
  ERROR_503: "Service Unavailable",
  // Auth Messages
  AUTH_INCORRECT_CREDENTIALS:
    "Usuario o contraseña incorrecta. Verifica los datos e intenta nuevamente.",
  // CRUD Messages
  CRUD_CREATED: "El registro ha sido creado.",
  CRUD_DELETED: "El registro ha sido eliminado.",
  CRUD_NOT_EXIST: "El registro no existe.",
  CRUD_UPDATED: "El registro ha sido modificado.",

  // Generals
  BTN_CANCEL: "Cancelar",
  BTN_CREATE: "Crear",
  BTN_DELETE: "Eliminar",
  BTN_SAVE: "Guardar",
  BTN_UPDATE: "Modificar",
  BTN_DETAILS: "Ver",
  BTN_SUBMIT_ACTION: "Enviar el formulario",
  BTN_CANCEL_ACTION: "Cancelar acción y volver atrás",
  TEXT_ACTIONS: "Acciones",
  TEXT_DETAILS: "Detalles",
  TEXT_ENTITY: "Entidad",
  TEXT_API: "API",

  // Sign In
  LOGIN_BTN: "Enviar",
  LOGIN_OUT: "Salir",
  LOGIN_PASSWORD: "Contraseña",
  LOGIN_TITLE: "Iniciar sesión",
  LOGIN_USER: "Correo electrónico",

  // Collections
  COLLECTIONS_APIDOC: "Ver documentación de la API",
  COLLECTIONS_APIDOC_BTN: "Swagger",
  COLLECTIONS_COL_TITLE: "Título",
  COLLECTIONS_NAME: "Nombre de colección de datos",
  COLLECTIONS_PATH: "Ruta/Recurso",
  COLLECTIONS_PUBLIC_FORM: "Formulario público",
  COLLECTIONS_SHOW_IN_PANELADMIN:
    "Mostrar en el grupo de entidades dinámicas del sistema",
  COLLECTIONS_TITLE: "Gestión de entidades dinámicas",
  COLLECTIONS_URL_AFTER_CREATE: "URL de retorno después de crear un registro",

  // API allowed
  ALL_OPTIONS: "Todas",
  CREATE_OPTION: "Crear",
  DELETE_OPTION: "Eliminar",
  GET_BY_ID: "Obtener por ID",
  LIST_OPTION: "Listar",
  UPDATE_OPTION: "Modificar",

  // FieldsConfig
  FIELDS_ADVANCED: "Conf. Avanzada",
  FIELDS_CONFIGURE: "Configurar",
  FIELDS_APIDOC: "Gestionar campos",
  FIELDS_APIDOC_BTN: "Campos",
  FIELDS_DEFAULT_VALUE: "Valor por defecto",
  FIELDS_LABEL: "Etiqueta",
  FIELDS_NAME: "Nombre del campo",
  FIELDS_PROJECTION: "Mostrar en lista",
  FIELDS_SELECT_OPTION: "Seleccione una opción",
  FIELDS_TYPE: "Tipo de entrada",
  FIELDS_UPDATED: "Los campos han sido actualizados.",
  FIELDS_REQUIRED: "Campo requerido",
  FIELDS_COLUMNS: "Columnas",
  FIELDS_DATABASE_TYPE: "Tipo de dato en base de datos",

  // Users
  USERS_CREATE: "Crear usuario",
  USERS_DELETE: "Eliminar usuario",
  USERS_EMAIL: "Correo electrónico",
  USERS_FULLNAME: "Nombre completo",
  USERS_PASSWORD: "Contraseña",
  USERS_STATUS: "Estado",
  USERS_STATUS_ACTIVE: "Activo",
  USERS_TITLE: "Gestión de usuarios",
  USERS_UPDATE: "Modificar usuario",
  USERS_ROLS: "Roles",

  // Panel Admin
  PANELADMIN_TITLE: "Administración",

  HELP_MSG_CANCEL: "Botón para cancelar la acción actual y volver al listado.",
  HELP_MSG_SAVE: "Botón para enviar el formulario y guardar los datos.",

  HELP_MSG_LOGIN_FORM:
    "Debe ingresar todos los datos de este formulario para que el sistema genere una sesión.",
  HELP_MSG_LOGIN_EMAIL:
    "Debe ingresar un correo electrónico válido y que se encuentre activo en el sistema.",
  HELP_MSG_LOGIN_PASSWORD:
    "Debe ingresar la contraseña correspondiente al usuario del sistema.",
  HELP_MSG_LOGIN_SUBMIT:
    "Debe presionar el botón para enviar los datos y que el sistema genere la sesión de usuario.",

  HELP_MSG_PADMIN_CORE_FEATURES: "Gestiones principales del sistema",
  HELP_MSG_PADMIN_USERS: "Gestionar los usuarios del sistema y asignar roles.",
  HELP_MSG_PADMIN_COLLECTIONS:
    "Gestionar las entidades dinámicas y sus campos.",
  HELP_MSG_PADMIN_LOGOUT: "Cerrar la sesión del usuario.",
  HELP_MSG_PADMIN_DYNAMIC_FEATURES:
    "Opciones para gestionar registros de las entidades dinámicas configuradas y habilitadas.",

  HELP_MSG_USERS_BTN_CREATE:
    "Botón para visualizar el formulario de crear un nuevo usuario.",
  HELP_MSG_USERS_BTN_EDIT:
    "Botón para visualizar el formulario de modificar la información de un usuario.",
  HELP_MSG_USERS_BTN_DELETE: "Botón para eliminar un usuario.",

  HELP_MSG_COLLECTION_BTN_CREATE:
    "Botón para visualizar el formulario de crear una entidad dinámica.",
  HELP_MSG_COLLECTION_BTN_EDIT:
    "Botón para visualizar el formulario de modificar la información de una entidad dinámica.",
  HELP_MSG_COLLECTION_BTN_DELETE: "Botón para eliminar una entidad dinámica.",
  HELP_MSG_COLLECTION_BTN_FIELDS:
    "Botón para gestionar los campos de una entidad dinámica.",
  HELP_MSG_COLLECTION_BTN_APIDOC:
    "Botón para visualizar la documentación de la API de una entidad dinámica.",
  HELP_MSG_COLLECTION_TAB_ENTITY:
    "Botón para visualizar los datos generales de una entidad dinámica.",
  // HELP_MSG_COLLECTION_TAB_ENTITY_FORM:
  //   "Formulario para modificar los datos generales de una entidad dinámica.",
  HELP_MSG_COLLECTION_TAB_API:
    "Botón para visualizar las operaciones de la API que se pueden habilitar.",
  // HELP_MSG_COLLECTION_TAB_API_FORM:
  //   "Formulario con las operaciones de la API que se pueden habilitar.",
  HELP_MSG_COLLECTIONS_TITLE:
    "Descripción que identifica la gestión de datos dinámicos.",
  HELP_MSG_COLLECTIONS_PATH: "Descripción que identifica el recurso en la URL.",
  HELP_MSG_COLLECTIONS_NAME:
    "Nombre del recurso en la base de datos que almacena los registros gestionados de una entidad dinámica.",
  HELP_MSG_COLLECTIONS_SHOW_IN_PANELADMIN:
    "Si se activa, la gestión de registros de una entidad dinámica se puede visualizar en el panel de administración.",

  HELP_MSG_FIELDS_TO_EDIT_COLLECTION:
    "Editar configuración general de la colección",
  HELP_MSG_FIELDS_BTN_DELETE:
    "Botón para eliminar el campo de la configuración.",
  HELP_MSG_FIELDS_MOVE: "Arrastrar arriba o abajo para ordenar los campos.",
  HELP_MSG_FIELDS_NAME:
    "Nombre con el cual se almacena el valor del campo en la base de datos.",
  HELP_MSG_FIELDS_CREATE: "Botón para agregar un nuevo campo.",
};
