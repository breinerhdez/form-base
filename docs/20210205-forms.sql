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

 Date: 05/02/2021 15:19:04
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
    url: "/admin/crud",
    name: "CRUD Manager",
    __v: NumberInt("0")
} ]);
db.getCollection("core_admin_options").insert([ {
    _id: ObjectId("601da78f1d1b7f544d66780c"),
    url: "/admin/admin-options",
    name: "Gestión de Panel de Control",
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
    _id: ObjectId("601953b3c47b0000c6000d22"),
    "path_name": "crud",
    "collection_name": "core_collections",
    title: "Gestión de CRUD's BH"
} ]);
db.getCollection("core_collections").insert([ {
    _id: ObjectId("601d83a46904c6379424f43b"),
    "path_name": "test-fruta",
    "collection_name": "test_frutas",
    title: "Gestión de frutas",
    __v: NumberInt("0")
} ]);
db.getCollection("core_collections").insert([ {
    _id: ObjectId("601d881a7cabe23aaff1e0e5"),
    "path_name": "test-items",
    "collection_name": "test_items",
    title: "Gestión de elementos",
    __v: NumberInt("0")
} ]);
db.getCollection("core_collections").insert([ {
    _id: ObjectId("601da19efa04174f541c2bef"),
    "path_name": "admin-options",
    "collection_name": "core_admin_options",
    title: "Gestión de panel de control",
    __v: NumberInt("0")
} ]);
db.getCollection("core_collections").insert([ {
    _id: ObjectId("601da381fa04174f541c2bf3"),
    "path_name": "pokemon",
    "collection_name": "test_pokemons",
    title: "Gestión de Pokemones",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for core_forms
// ----------------------------
db.getCollection("core_forms").drop();
db.createCollection("core_forms");
db.getCollection("core_forms").createIndex({
    config: NumberInt("1")
}, {
    name: "config_1",
    background: true,
    unique: true
});

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
    "collection_id": "601da19efa04174f541c2bef",
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
                    }
                ]
            ]
        }
    ]
} ]);
