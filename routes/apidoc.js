
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

    router.get('/api/crud/equipos-libertadores', (req, res) => {
      /*
      #swagger.tags = ['equipos-libertadores']
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
      #swagger.responses[401] = {
        description: 'Unauthorized',
        schema: { $ref: "#/components/schemas/Response401"}
      }
      #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: "#/components/schemas/Response500"}
      }
      #swagger.responses[503] = {
        description: 'Service Unavailable',
        schema: { $ref: "#/components/schemas/Response500"}
      }
      */
      res.json([{ id: 1, name: 'John Doe' }]);
    });

    router.post('/api/crud/equipos-libertadores', (req, res) => {
      /*
      #swagger.tags = ['equipos-libertadores']
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
      #swagger.responses[201] = {
        description: 'Created',
        schema: { $ref: "#/components/schemas/CreateResponse"}
      }
      #swagger.responses[401] = {
        description: 'Unauthorized',
        schema: { $ref: "#/components/schemas/Response401"}
      }
      #swagger.responses[400] = {
        description: 'Bad Request',
        schema: { $ref: "#/components/schemas/Response400"}
      }
      #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: "#/components/schemas/Response500"}
      }
      #swagger.responses[503] = {
        description: 'Service Unavailable',
        schema: { $ref: "#/components/schemas/Response500"}
      }
      */
      res.json({ message: 'Usuario creado' });
    });

    router.put('/api/crud/equipos-libertadores/:id', (req, res) => {
      /*
      #swagger.tags = ['equipos-libertadores']
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
      #swagger.responses[401] = {
        description: 'Unauthorized',
        schema: { $ref: "#/components/schemas/Response401"}
      }
      #swagger.responses[400] = {
        description: 'Bad Request',
        schema: { $ref: "#/components/schemas/Response400"}
      }
      #swagger.responses[404] = {
        description: 'Not Found',
        schema: { $ref: "#/components/schemas/Response404"}
      }
      #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: "#/components/schemas/Response500"}
      }
      #swagger.responses[503] = {
        description: 'Service Unavailable',
        schema: { $ref: "#/components/schemas/Response500"}
      }
      */
      res.json({ message: 'Usuario creado' });
    });
    
    router.get('/api/crud/equipos-libertadores/:id', (req, res) => {
      /*
      #swagger.tags = ['equipos-libertadores']
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
      #swagger.responses[401] = {
        description: 'Unauthorized',
        schema: { $ref: "#/components/schemas/Response401"}
      }
      #swagger.responses[404] = {
        description: 'Not Found',
        schema: { $ref: "#/components/schemas/Response404"}
      }
      #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: "#/components/schemas/Response500"}
      }
      #swagger.responses[503] = {
        description: 'Service Unavailable',
        schema: { $ref: "#/components/schemas/Response500"}
      }
      */
      res.json([{ id: 1, name: 'John Doe' }]);
    });
    
    router.delete('/api/crud/equipos-libertadores/:id', (req, res) => {
      /*
      #swagger.tags = ['equipos-libertadores']
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
      #swagger.responses[401] = {
        description: 'Unauthorized',
        schema: { $ref: "#/components/schemas/Response401"}
      }
      #swagger.responses[404] = {
        description: 'Not Found',
        schema: { $ref: "#/components/schemas/Response404"}
      }
      #swagger.responses[500] = {
        description: 'Internal Server Error',
        schema: { $ref: "#/components/schemas/Response500"}
      }
      #swagger.responses[503] = {
        description: 'Service Unavailable',
        schema: { $ref: "#/components/schemas/Response500"}
      }
      */
      res.json([{ id: 1, name: 'John Doe' }]);
    });

    module.exports = router;
    