
    const express = require('express');
    const router = express.Router();

    router.get('/api/crud/equipos-libertadores', (req, res) => {
      /*
      #swagger.description = 'Endpoint para obtener todos los registros'
      #swagger.responses[200] = {
        description: 'OK',
        schema: { $ref: "#/components/schemas/IndexResponse"}
      }
      */
      res.json([{ id: 1, name: 'John Doe' }]);
    });

    router.post('/api/crud/equipos-libertadores', (req, res) => {
      /*
      #swagger.description = 'Endpoint para crear un nuevo registro'
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

    router.put('/api/crud/equipos-libertadores/:id', (req, res) => {
      /*
      #swagger.description = 'Endpoint para editar un registro por id'
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
    
    router.get('/api/crud/equipos-libertadores/:id', (req, res) => {
      /*
      #swagger.description = 'Endpoint para obtener un registro por id'
      #swagger.responses[200] = {
        description: 'OK',
        schema: { $ref: "#/components/schemas/ShowResponse"}
      }
      */
      res.json([{ id: 1, name: 'John Doe' }]);
    });
    
    router.delete('/api/crud/equipos-libertadores/:id', (req, res) => {
      /*
      #swagger.description = 'Endpoint para eliminar un registro por id'
      #swagger.responses[200] = {
        description: 'OK',
        schema: { $ref: "#/components/schemas/DeleteResponse"}
      }
      */
      res.json([{ id: 1, name: 'John Doe' }]);
    });

    module.exports = router;
    