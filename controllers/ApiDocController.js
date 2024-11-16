const fs = require("fs");
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const { getObjectsAndModel } = require("../utils/dynamicResources");
const { autoCrudAppPatterns } = require("../utils/helpers");

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
        info: {
          title: `API - ${collection.title}`,
          description: `Documentación generada automáticamente para la colección ${collection.title}`,
        },
        host: "localhost:3000",
        schemes: ["http"],
        components: {
          schemas: {
            IndexResponse: {
              data: {
                items: [dynamicObjectId],
              },
            },
            CreateRequest: dynamicObject,
            CreateResponse: {
              item: dynamicObjectId,
            },
            UpdateRequest: dynamicObject,
            UpdateResponse: {
              item: dynamicObjectId,
            },
            ShowResponse: {
              item: dynamicObjectId,
            },
            DeleteResponse: {
              item: dynamicObjectId,
            },
            LoginRequest: {
              email: "example@citdev-express.com",
              password: "@1!aS85*",
            },
            LoginResponse: {
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            },
          },
        },
      };

      const outputFile = path.join(
        __dirname,
        "./../routes/swagger_output.json"
      );

      let apiRouterFile = path.join(__dirname, "./../routes/apidoc.js");
      fs.writeFileSync(apiRouterFile, getFileRouteContent(path_name), "utf8");


      const endpointsFiles = [apiRouterFile]; // Aquí especificas los archivos de tus rutas

      await swaggerAutogen(outputFile, endpointsFiles, doc);

      // Verificar si el archivo existe
      if (fs.existsSync(outputFile)) {
        const swaggerFile = require(outputFile);
        swaggerUi.setup(swaggerFile)(req, res);
      } else {
        res.status(404).send("Documentación no generada aún");
      }

    } catch (error) {
      req.flash("warning", lang.ERROR_500);
      res.redirect("/admin");
    }
  }

}


 const getFileRouteContent = (pathName) => {
    return `
    const express = require('express');
    const router = express.Router();

    router.post('/api/auth/login', (req, res) => {
      /*
      #swagger.tags = ['Authorization']
      #swagger.description = 'Endpoint para iniciar sesión o generar un JWT'
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/LoginRequest"}
      }
      #swagger.responses[200] = {
        description: 'OK',
        schema: { $ref: "#/components/schemas/LoginResponse"}
      }
      */
      res.json({ message: 'Usuario creado' });
    });

    router.get('${replacePathName(
      autoCrudAppPatterns.index,
      pathName
    )}', (req, res) => {
      /*
      #swagger.tags = ['${pathName}']
      #swagger.description = 'Endpoint para obtener todos los registros'
      #swagger.parameters['Authorization'] = {
        in: "header",
        required: true,
        type: "string",
        example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      }
      #swagger.responses[200] = {
        description: 'OK',
        schema: { $ref: "#/components/schemas/IndexResponse"}
      }
      */
      res.json([{ id: 1, name: 'John Doe' }]);
    });

    router.post('${replacePathName(
      autoCrudAppPatterns.store,
      pathName
    )}', (req, res) => {
      /*
      #swagger.tags = ['${pathName}']
      #swagger.description = 'Endpoint para crear un nuevo registro'
      #swagger.parameters['Authorization'] = {
        in: "header",
        required: true,
        type: "string",
        example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      }
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/CreateRequest"}
      }
      #swagger.responses[200] = {
        description: 'OK',
        schema: { $ref: "#/components/schemas/CreateResponse"}
      }
      */
      res.json({ message: 'Usuario creado' });
    });

    router.put('${replacePathName(
      autoCrudAppPatterns.update,
      pathName
    )}', (req, res) => {
      /*
      #swagger.tags = ['${pathName}']
      #swagger.description = 'Endpoint para editar un registro por id'
      #swagger.parameters['Authorization'] = {
        in: "header",
        required: true,
        type: "string",
        example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      }
      #swagger.parameters['id'] = {
        in: "path",
        required: true,
        type: "string",
        example: "61fc9039c7452ebc81c72a17"
      }
      #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/UpdateRequest"}
      }
      #swagger.responses[200] = {
        description: 'OK',
        schema: { $ref: "#/components/schemas/UpdateResponse"}
      }
      */
      res.json({ message: 'Usuario creado' });
    });
    
    router.get('${replacePathName(
      autoCrudAppPatterns.show,
      pathName
    )}', (req, res) => {
      /*
      #swagger.tags = ['${pathName}']
      #swagger.description = 'Endpoint para obtener un registro por id'
      #swagger.parameters['Authorization'] = {
        in: "header",
        required: true,
        type: "string",
        example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      }
      #swagger.parameters['id'] = {
        in: "path",
        required: true,
        type: "string",
        example: "61fc9039c7452ebc81c72a17"
      }
      #swagger.responses[200] = {
        description: 'OK',
        schema: { $ref: "#/components/schemas/ShowResponse"}
      }
      */
      res.json([{ id: 1, name: 'John Doe' }]);
    });
    
    router.delete('${replacePathName(
      autoCrudAppPatterns.show,
      pathName
    )}', (req, res) => {
      /*
      #swagger.tags = ['${pathName}']
      #swagger.description = 'Endpoint para eliminar un registro por id'
      #swagger.parameters['Authorization'] = {
        in: "header",
        required: true,
        type: "string",
        example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      }
      #swagger.parameters['id'] = {
        in: "path",
        required: true,
        type: "string",
        example: "61fc9039c7452ebc81c72a17"
      }
      #swagger.responses[200] = {
        description: 'OK',
        schema: { $ref: "#/components/schemas/DeleteResponse"}
      }
      */
      res.json([{ id: 1, name: 'John Doe' }]);
    });

    module.exports = router;
    `;
  }

  const replacePathName = (path, pathName) => {
    console.log(path, pathName);
    let route = path.replace("/:path_name", `${basePath}${pathName}`);
    return route;
  }


module.exports = ApiDocController;
