const swaggerUi = require("swagger-ui-express");
const { getObjectsAndModel } = require("../utils/dynamicResources");
const { autoCrudAppPatterns } = require("../utils/helpers");
const lang = require("../utils/lang");

const basePath = "/api/crud/";

class ApiDocController {
  async index(req, res) {
    try {
      // clean session data
      req.session.reqData = {};
      // get path_name
      let { path_name } = req.params;
      // get main information for colletion by path_name
      let result = await getObjectsAndModel(path_name, req);
      if (!result) {
        return res.redirect("/admin");
      }
      // destructure result query into variables
      let { collection, dynamicModel } = result;

      let dynamicObjectId = new dynamicModel().toObject();
      let dynamicObject = new dynamicModel().toObject({
        versionKey: false,
        transform: (doc, ret) => {
          delete ret._id;
        },
      });

      const doc = {
        openapi: "3.0.0",
        info: {
          title: `API - ${collection.title}`,
          description: `Documentación generada automáticamente para la colección ${collection.title}`,
          version: "1.0.0",
        },
        servers: [
          {
            url: "https://" + req.get("host"),
          },
          {
            url: "http://" + req.get("host"),
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
          schemas: {
            IndexResponse: generateSwaggerSchemaFromObject({
              data: {
                items: [dynamicObjectId],
              },
            }),
            CreateRequest: generateSwaggerSchemaFromObject(dynamicObject),
            CreateResponse: generateSwaggerSchemaFromObject({
              item: dynamicObjectId,
            }),
            UpdateRequest: generateSwaggerSchemaFromObject(dynamicObject),
            UpdateResponse: generateSwaggerSchemaFromObject({
              item: dynamicObjectId,
            }),
            ShowResponse: generateSwaggerSchemaFromObject({
              item: dynamicObjectId,
            }),
            DeleteResponse: generateSwaggerSchemaFromObject({
              item: dynamicObjectId,
            }),
            LoginRequest: generateSwaggerSchemaFromObject({
              email: "example@citdev-express.com",
              password: "@1!aS85*",
            }),
            LoginResponse: generateSwaggerSchemaFromObject({
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            }),
            Response400: {
              type: "object",
              properties: {
                errors: {
                  type: "array",
                  items: {
                    type: "string",
                    example: "Detalle del error",
                  },
                },
              },
            },
            Response401: {
              type: "string",
              example: lang.ERROR_401,
            },
            Response404: {
              type: "string",
              example: lang.ERROR_404,
            },
            Response500: {
              type: "string",
              example: lang.ERROR_500,
            },
            Response503: {
              type: "string",
              example: lang.ERROR_503,
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        paths: getSwaggerPathObject(path_name),
      };

      console.log(JSON.stringify(doc));

      swaggerUi.setup(doc)(req, res);
    } catch (error) {
      req.flash("warning", lang.ERROR_500);
      res.redirect("/admin");
    }
  }
}

const replacePathName = (path, pathName) => {
  let route = path
    .replace("/:path_name", `${basePath}${pathName}`)
    .replace("/:id", "/{id}");
  return route;
};

const getSwaggerPathObject = (pathName) => {
  const paths = {};

  const routes = [
    {
      method: "post",
      path: "/api/auth/login",
      operation: {
        tags: ["Authorization"],
        description: "Endpoint para iniciar sesión o generar un JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          200: {
            description: lang.ERROR_200,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginResponse" },
              },
            },
          },
          400: {
            description: lang.ERROR_400,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response400" },
              },
            },
          },
          500: {
            description: lang.ERROR_500,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response500" },
              },
            },
          },
          503: {
            description: lang.ERROR_503,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response503" },
              },
            },
          },
        },
      },
    },
    {
      method: "get",
      path: replacePathName(autoCrudAppPatterns.index, pathName),
      operation: {
        tags: [pathName],
        description: "Endpoint para obtener todos los registros",
        parameters: [
          {
            name: "Authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
            example: "Bearer <JWT>",
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/IndexResponse" },
              },
            },
          },
          401: {
            description: lang.ERROR_401,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response401" },
              },
            },
          },
          500: {
            description: lang.ERROR_500,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response500" },
              },
            },
          },
          503: {
            description: lang.ERROR_503,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response503" },
              },
            },
          },
        },
      },
    },
    {
      method: "post",
      path: replacePathName(autoCrudAppPatterns.store, pathName),
      operation: {
        tags: [pathName],
        description: "Endpoint para crear un nuevo registro",
        parameters: [
          {
            name: "Authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
            example: "Bearer <JWT>",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateRequest" },
            },
          },
        },
        responses: {
          201: {
            description: lang.ERROR_201,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateResponse" },
              },
            },
          },
          400: {
            description: lang.ERROR_400,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response400" },
              },
            },
          },
          401: {
            description: lang.ERROR_401,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response401" },
              },
            },
          },
          500: {
            description: lang.ERROR_500,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response500" },
              },
            },
          },
          503: {
            description: lang.ERROR_503,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response503" },
              },
            },
          },
        },
      },
    },
    {
      method: "put",
      path: replacePathName(autoCrudAppPatterns.update, pathName),
      operation: {
        tags: [pathName],
        description: "Endpoint para editar un registro por id",
        parameters: [
          {
            name: "Authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
            example: "Bearer <JWT>",
          },
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            example: "123",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateRequest" },
            },
          },
        },
        responses: {
          200: {
            description: lang.ERROR_200,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateResponse" },
              },
            },
          },
          400: {
            description: lang.ERROR_400,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response400" },
              },
            },
          },
          401: {
            description: lang.ERROR_401,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response401" },
              },
            },
          },
          404: {
            description: lang.ERROR_404,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response404" },
              },
            },
          },
          500: {
            description: lang.ERROR_500,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response500" },
              },
            },
          },
          503: {
            description: lang.ERROR_503,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response503" },
              },
            },
          },
        },
      },
    },
    {
      method: "get",
      path: replacePathName(autoCrudAppPatterns.destroy, pathName),
      operation: {
        tags: [pathName],
        description: "Endpoint para obtener un registro por id",
        parameters: [
          {
            name: "Authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
            example: "Bearer <JWT>",
          },
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: lang.ERROR_200,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ShowResponse" },
              },
            },
          },
          401: {
            description: lang.ERROR_401,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response401" },
              },
            },
          },
          404: {
            description: lang.ERROR_404,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response404" },
              },
            },
          },
          500: {
            description: lang.ERROR_500,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response500" },
              },
            },
          },
          503: {
            description: lang.ERROR_503,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response503" },
              },
            },
          },
        },
      },
    },
    {
      method: "delete",
      path: replacePathName(autoCrudAppPatterns.destroy, pathName),
      operation: {
        tags: [pathName],
        description: "Endpoint para eliminar un registro por id",
        parameters: [
          {
            name: "Authorization",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
            example: "Bearer <JWT>",
          },
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: lang.ERROR_200,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DeleteResponse" },
              },
            },
          },
          401: {
            description: lang.ERROR_401,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response401" },
              },
            },
          },
          404: {
            description: lang.ERROR_404,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response404" },
              },
            },
          },
          500: {
            description: lang.ERROR_500,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response500" },
              },
            },
          },
          503: {
            description: lang.ERROR_503,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Response503" },
              },
            },
          },
        },
      },
    },
  ];

  // Generar estructura Swagger
  routes.forEach(({ path, method, operation }) => {
    if (!paths[path]) paths[path] = {};
    paths[path][method] = operation;
  });

  return paths;
};

function generateSwaggerSchemaFromObject(obj) {
  if (obj.hasOwnProperty("_id")) {
    obj._id = "string";
  }
  const detectType = (value) => {
    if (Array.isArray(value)) return "array";
    if (value === null) return "string"; // Swagger no tiene "null" como tipo
    return typeof value;
  };

  const buildSchema = (value) => {
    const type = detectType(value);

    switch (type) {
      case "string":
      case "number":
      case "boolean":
        return { type };

      case "array":
        return {
          type: "array",
          items: buildSchema(value[0] ?? {}), // asume el primer elemento como ejemplo
        };

      case "object":
        return {
          type: "object",
          properties: generateSwaggerSchemaFromObject(value).properties,
        };

      default:
        return { type: "string" };
    }
  };

  const properties = {};

  for (const key in obj) {
    properties[key] = buildSchema(obj[key]);
    properties[key]["example"] = obj[key];
  }

  return {
    type: "object",
    properties,
  };
}

module.exports = ApiDocController;
