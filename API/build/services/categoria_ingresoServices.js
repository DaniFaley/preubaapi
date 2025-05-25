"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarCategoriaIngreso = exports.modificarCategoriaIngreso = exports.agregarCategoriaIngreso = exports.encuentraCategoriaIngreso = exports.obtieneCategoriaIngreso = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const categoria_ingreso_schema_1 = require("../schema/categoria_ingreso.schema");
const config_1 = require("../config");
//Conexion a la base de datos
const conexion = promise_1.default.createPool({
    host: config_1.DB_HOST,
    user: config_1.DB_USER,
    password: config_1.DB_PASSWORD,
    database: config_1.DB_NAME,
    port: Number(config_1.DB_PORT),
    multipleStatements: false,
});
exports.default = conexion;
//Para mostrar todos los registros de la tabla cuenta
const obtieneCategoriaIngreso = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM categoria_ingreso');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la CategoriaIngreso" };
    }
});
exports.obtieneCategoriaIngreso = obtieneCategoriaIngreso;
//Para mostrar uno en especifico de la tabla cuenta
const encuentraCategoriaIngreso = (id_categoria_ingreso) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM categoria_ingreso WHERE id_categoria_ingreso = ? LIMIT 1', id_categoria_ingreso);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa categoria_ingreso" };
    }
});
exports.encuentraCategoriaIngreso = encuentraCategoriaIngreso;
//Para insertar a la tabla cuenta
const agregarCategoriaIngreso = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = categoria_ingreso_schema_1.CategoriaIngresoSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO categoria_ingreso(nombre) values (?)', [nuevo.nombre]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la categoria_ingreso" };
    }
});
exports.agregarCategoriaIngreso = agregarCategoriaIngreso;
//Para modificar un registro de la tabla cuenta
const modificarCategoriaIngreso = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE categoria_ingreso SET nombre=? WHERE id_categoria_ingreso=?', [modificado.nombre, modificado.id_categoria_ingreso]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarCategoriaIngreso = modificarCategoriaIngreso;
//Eliminar un registro de la tabla cuenta
const borrarCategoriaIngreso = (id_categoria_ingreso) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM categoria_ingreso WHERE id_categoria_ingreso=?', [id_categoria_ingreso]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarCategoriaIngreso = borrarCategoriaIngreso;
