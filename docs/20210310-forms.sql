/*
 Navicat Premium Data Transfer

 Source Server         : Mongo Local
 Source Server Type    : MongoDB
 Source Server Version : 40205
 Source Host           : localhost:27017
 Source Schema         : forms

 Target Server Type    : MongoDB
 Target Server Version : 40205
 File Encoding         : 65001

 Date: 10/03/2021 22:14:47
*/


// ----------------------------
// Collection structure for core_admin_options
// ----------------------------
db.getCollection("core_admin_options").drop();
db.createCollection("core_admin_options");

// ----------------------------
// Documents of core_admin_options
// ----------------------------
db.getCollection("core_admin_options").insert([ {
    _id: ObjectId("601da3dbfa04174f541c2bf4"),
    url: "/admin/crud/",
    name: "CRUD Manager",
    __v: NumberInt("0"),
    icon: "cubes"
} ]);
db.getCollection("core_admin_options").insert([ {
    _id: ObjectId("601da78f1d1b7f544d66780c"),
    url: "/admin/admin-options",
    name: "Gestión de Panel de Control",
    __v: NumberInt("0"),
    icon: "list"
} ]);
db.getCollection("core_admin_options").insert([ {
    _id: ObjectId("601eeffbe47f661e5e153693"),
    url: "/admin/forms",
    name: "Gestión de Formularios",
    icon: "cubes",
    __v: NumberInt("0")
} ]);
db.getCollection("core_admin_options").insert([ {
    _id: ObjectId("6028291f2fea0061350e259c"),
    url: "testing-url",
    name: "Testing name",
    icon: "icon",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for core_collections
// ----------------------------
db.getCollection("core_collections").drop();
db.createCollection("core_collections");
db.getCollection("core_collections").createIndex({
    "collection_name": NumberInt("1")
}, {
    name: "collection_name_1",
    background: true,
    unique: true
});

// ----------------------------
// Documents of core_collections
// ----------------------------
db.getCollection("core_collections").insert([ {
    _id: ObjectId("601d83a46904c6379424f43b"),
    "path_name": "test-fruta",
    "collection_name": "test_frutas",
    title: "Gestión de frutas",
    __v: NumberInt("0"),
    allowServices: {
        list: "Y",
        getById: "Y",
        create: "Y",
        update: "Y",
        delete: "N"
    }
} ]);
db.getCollection("core_collections").insert([ {
    _id: ObjectId("601efcf35ae1532f7497f97e"),
    "path_name": "forms",
    "collection_name": "core_forms",
    title: "Gestión de Formularios",
    __v: NumberInt("0"),
    allowServices: {
        list: "Y",
        getById: "Y",
        create: "Y",
        update: "Y",
        delete: "N"
    }
} ]);
db.getCollection("core_collections").insert([ {
    _id: ObjectId("60243aa6e3c7ee585e04407c"),
    "path_name": "admin-options",
    "collection_name": "core_admin_options",
    title: "Gestión de panel de control",
    __v: NumberInt("0"),
    allowServices: {
        list: "Y",
        getById: "Y",
        create: "Y",
        update: "Y",
        delete: "Y"
    }
} ]);
db.getCollection("core_collections").insert([ {
    _id: ObjectId("60243b44e3c7ee585e04407e"),
    "path_name": "dsdsdsddddd",
    "collection_name": "dsdsdsdddd",
    title: "ssssdddddd",
    __v: NumberInt("0"),
    allowServices: {
        list: "Y",
        getById: "Y",
        create: "Y",
        update: "Y",
        delete: "Y"
    }
} ]);
db.getCollection("core_collections").insert([ {
    _id: ObjectId("60280d7dff886a4be3364260"),
    "path_name": "prueba-prueba2",
    "collection_name": "prueba_prueba2",
    title: "prueba-prueba2",
    allowServices: {
        list: "N",
        getById: "N",
        create: "N",
        update: "N",
        delete: "N"
    },
    __v: NumberInt("0")
} ]);
db.getCollection("core_collections").insert([ {
    _id: ObjectId("6048ffb58b536d4174e34948"),
    "path_name": "/asasa",
    "collection_name": "test_test_asdf",
    title: "Pruebas de ultima hora",
    allowServices: {
        list: "N",
        getById: "N",
        create: "N",
        update: "N",
        delete: "N"
    },
    __v: NumberInt("0")
} ]);
db.getCollection("core_collections").insert([ {
    _id: ObjectId("604982f9d6f5a441abf027a9"),
    "path_name": "test-animals",
    "collection_name": "test_col_animals",
    title: "Mis animales",
    allowServices: {
        list: "N",
        getById: "N",
        create: "N",
        update: "N",
        delete: "N"
    },
    __v: NumberInt("0")
} ]);
db.getCollection("core_collections").insert([ {
    _id: ObjectId("604983dd4aad674437a8c78c"),
    "path_name": "test-dinos",
    "collection_name": "test_dinos",
    title: "Mis Dinosaurios",
    allowServices: {
        list: "N",
        getById: "N",
        create: "N",
        update: "N",
        delete: "N"
    },
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for core_fieldsets
// ----------------------------
db.getCollection("core_fieldsets").drop();
db.createCollection("core_fieldsets");

// ----------------------------
// Documents of core_fieldsets
// ----------------------------
db.getCollection("core_fieldsets").insert([ {
    _id: ObjectId("6022f9d17ca3d87bdda47de9"),
    legend: "Residencia",
    fields: [ ],
    "form_id": ObjectId("601efcf35ae1532f7497f97f"),
    __v: NumberInt("0")
} ]);
db.getCollection("core_fieldsets").insert([ {
    _id: ObjectId("603ad0cfb36313251e1b5240"),
    legend: "test",
    fields: [ ],
    "form_id": ObjectId("601da272fc4100000a0017a2"),
    __v: NumberInt("0")
} ]);
db.getCollection("core_fieldsets").insert([ {
    _id: ObjectId("603b09f3136f48552d0a4ab7"),
    legend: "Trabajo",
    fields: [ ],
    "form_id": ObjectId("601efcf35ae1532f7497f97f"),
    __v: NumberInt("0")
} ]);
db.getCollection("core_fieldsets").insert([ {
    _id: ObjectId("60496681e42d3619c34572a7"),
    legend: "test",
    fields: [ ],
    "form_id": ObjectId("6048ffb58b536d4174e34949"),
    __v: NumberInt("0")
} ]);
db.getCollection("core_fieldsets").insert([ {
    _id: ObjectId("60497a1c21511f315823c195"),
    legend: "Otro label",
    fields: [ ],
    "form_id": ObjectId("601efcf35ae1532f7497f97f"),
    __v: NumberInt("0")
} ]);
db.getCollection("core_fieldsets").insert([ {
    _id: ObjectId("60497c9d121fd43416089709"),
    legend: "Prueba",
    fields: [ ],
    "form_id": ObjectId("60280d7dff886a4be3364261"),
    __v: NumberInt("0")
} ]);
db.getCollection("core_fieldsets").insert([ {
    _id: ObjectId("60497cf020f604346b12e243"),
    legend: "Otra",
    fields: [ ],
    "form_id": ObjectId("60280d7dff886a4be3364261"),
    __v: NumberInt("0")
} ]);
db.getCollection("core_fieldsets").insert([ {
    _id: ObjectId("60497e07df8af239c477258c"),
    legend: "Cambiar dato",
    fields: [ ],
    "form_id": ObjectId("60280d7dff886a4be3364261"),
    __v: NumberInt("0")
} ]);
db.getCollection("core_fieldsets").insert([ {
    _id: ObjectId("60497fe410d2c23c0c18e0f6"),
    legend: "Grupo 1",
    fields: [ ],
    "form_id": ObjectId("60243b44e3c7ee585e04407f"),
    __v: NumberInt("0")
} ]);
db.getCollection("core_fieldsets").insert([ {
    _id: ObjectId("60497fec10d2c23c0c18e0f7"),
    legend: "Grupo 2",
    fields: [ ],
    "form_id": ObjectId("60243b44e3c7ee585e04407f"),
    __v: NumberInt("0")
} ]);
db.getCollection("core_fieldsets").insert([ {
    _id: ObjectId("60498464308a5044cc8036e8"),
    legend: "Datos generales",
    fields: [ ],
    "form_id": ObjectId("604983dd4aad674437a8c78d"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for core_forms
// ----------------------------
db.getCollection("core_forms").drop();
db.createCollection("core_forms");

// ----------------------------
// Documents of core_forms
// ----------------------------
db.getCollection("core_forms").insert([ {
    _id: ObjectId("60195bf7c47b0000c6000d23"),
    "collection_id": "601953b3c47b0000c6000d22",
    action: "/admin/process",
    config: {
        "btn_submit": {
            show: true,
            value: "Guardar"
        },
        projection: [
            "title",
            "path_name",
            "collection_name"
        ],
        schema: {
            "collection_name": {
                type: "String",
                required: [
                    true,
                    "El nombre de la colección es obligatoria"
                ]
            },
            "path_name": {
                type: "String",
                required: [
                    true,
                    "La URI es obligatoria"
                ]
            },
            title: {
                type: "String",
                required: [
                    true,
                    "El título principal es obligatorio"
                ]
            }
        }
    },
    fieldsets: [
        {
            config: {
                legend: "Datos de la colección"
            },
            fields: [
                [
                    {
                        type: "text",
                        name: "path_name",
                        label: "URI"
                    },
                    {
                        type: "text",
                        name: "collection_name",
                        label: "Nombre de la colección de datos"
                    },
                    {
                        type: "text",
                        name: "title",
                        label: "Título principal"
                    }
                ]
            ]
        }
    ]
} ]);
db.getCollection("core_forms").insert([ {
    _id: ObjectId("601da272fc4100000a0017a2"),
    "collection_id": "60243aa6e3c7ee585e04407c",
    action: "",
    config: {
        "btn_submit": {
            show: true,
            value: "Guardar"
        },
        projection: [
            "url",
            "name"
        ],
        schema: {
            url: {
                type: "String",
                required: [
                    true,
                    "La URL es obligatoria"
                ]
            },
            name: {
                type: "String",
                required: [
                    true,
                    "El nombre es obligatorio"
                ]
            },
            icon: {
                type: "String",
                required: [
                    true,
                    "El icono es obligatorio"
                ]
            }
        }
    },
    fieldsets: [
        {
            config: {
                legend: "Datos de la opción de panel de control"
            },
            fields: [
                [
                    {
                        type: "text",
                        name: "url",
                        label: "URL"
                    },
                    {
                        type: "text",
                        name: "name",
                        label: "Nombre"
                    },
                    {
                        type: "text",
                        name: "icon",
                        label: "Icono"
                    }
                ]
            ]
        }
    ]
} ]);
db.getCollection("core_forms").insert([ {
    _id: ObjectId("601efcf35ae1532f7497f97f"),
    action: "/NO-APLICA",
    fieldsets: [ ],
    "collection_id": "601efcf35ae1532f7497f97e",
    config: {
        method: "post",
        "btn_submit": {
            value: "Guardar",
            show: true
        },
        projection: [
            "collection_id",
            "action"
        ],
        schema: {
            "collection_id": {
                required: [
                    true,
                    "La URI es obligatoria"
                ],
                ref: "core_collections"
            },
            action: {
                required: [
                    true,
                    "La URI es obligatoria"
                ],
                default: "/admin-undefined"
            },
            config: {
                unique: true,
                required: [
                    true,
                    "El nombre de la colección es obligatoria"
                ]
            },
            fieldsets: {
                required: [
                    true,
                    "El título principal es obligatorio"
                ],
                default: [ ]
            }
        }
    },
    __v: NumberInt("0")
} ]);
db.getCollection("core_forms").insert([ {
    _id: ObjectId("6024326072290a4bcec4859c"),
    action: "/admin-undefined",
    fieldsets: [ ],
    "collection_id": "6024326072290a4bcec4859b",
    config: {
        projection: [
            "collection_id",
            "action"
        ]
    },
    __v: NumberInt("0")
} ]);
db.getCollection("core_forms").insert([ {
    _id: ObjectId("60243b44e3c7ee585e04407f"),
    action: "/admin-undefined",
    fieldsets: [ ],
    "collection_id": "60243b44e3c7ee585e04407e",
    config: {
        projection: [
            "collection_id",
            "action"
        ],
        method: "get",
        "btn_submit": {
            value: "Hello",
            show: true
        }
    },
    __v: NumberInt("0")
} ]);
db.getCollection("core_forms").insert([ {
    _id: ObjectId("60280d7dff886a4be3364261"),
    action: "/admin-undefined",
    fieldsets: [ ],
    "collection_id": "60280d7dff886a4be3364260",
    config: {
        projection: [
            "collection_id",
            "action"
        ],
        method: "get",
        "btn_submit": {
            value: "Guardar",
            show: false
        }
    },
    __v: NumberInt("0")
} ]);
db.getCollection("core_forms").insert([ {
    _id: ObjectId("6048ffb58b536d4174e34949"),
    action: "/admin-undefined",
    fieldsets: [ ],
    "collection_id": "6048ffb58b536d4174e34948",
    config: {
        projection: [
            "collection_id",
            "action"
        ]
    },
    __v: NumberInt("0")
} ]);
db.getCollection("core_forms").insert([ {
    _id: ObjectId("604982f9d6f5a441abf027aa"),
    action: "/admin-undefined",
    fieldsets: [ ],
    "collection_id": "604982f9d6f5a441abf027a9",
    config: {
        projection: [
            "collection_id",
            "action"
        ]
    },
    __v: NumberInt("0")
} ]);
db.getCollection("core_forms").insert([ {
    _id: ObjectId("604983dd4aad674437a8c78d"),
    action: "/admin-undefined",
    fieldsets: [ ],
    "collection_id": "604983dd4aad674437a8c78c",
    config: {
        projection: [
            "collection_id",
            "action"
        ],
        "btn_submit": {
            value: "Enviar",
            show: true
        },
        method: "get"
    },
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for core_users
// ----------------------------
db.getCollection("core_users").drop();
db.createCollection("core_users");
db.getCollection("core_users").createIndex({
    email: NumberInt("1")
}, {
    name: "email_1",
    background: true,
    unique: true
});

// ----------------------------
// Documents of core_users
// ----------------------------
db.getCollection("core_users").insert([ {
    _id: ObjectId("6027f29c282c5239e5ecaf90"),
    estado: true,
    nombre: "Eduardo Hernández",
    email: "ing.breiner.hernandez@gmail.com",
    password: "$2b$10$LtoB0JJTvMrPIQTXlR2lFeYDwWSDyOeZl4fTAuYPdjYK/bTuxz.nm",
    __v: NumberInt("0")
} ]);
db.getCollection("core_users").insert([ {
    _id: ObjectId("60280a304a8eba48b2e2622b"),
    estado: true,
    nombre: "Pruebas User",
    email: "prueba@gmail.com",
    password: "$2b$10$Fg1AiyztFpNCa6LAswaUTubcjKCgpgcq75ksCdBFtM0Xygb1qkppy",
    __v: NumberInt("0")
} ]);
