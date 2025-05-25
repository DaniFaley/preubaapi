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
exports.borrarTipo_inversion = exports.modificarTipo_inversion = exports.agregarTipo_inversion = exports.encuentraTipo_inversion = exports.obtieneTipo_inversion = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const tipo_inversion_schema_1 = require("../schema/tipo_inversion.schema");
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
//Para mostrar todos los registros de la tabla tipo_inversion
const obtieneTipo_inversion = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM tipo_inversion');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la tipo_inversion" };
    }
});
exports.obtieneTipo_inversion = obtieneTipo_inversion;
//Para mostrar uno en especifico de la tabla cuenta
const encuentraTipo_inversion = (id_tipo_inversion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM tipo_inversion WHERE id_tipo_inversion = ? LIMIT 1', id_tipo_inversion);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa tipo_inversion" };
    }
});
exports.encuentraTipo_inversion = encuentraTipo_inversion;
//Para insertar a la tabla instrumento: No se incluye el id de la tabla
const agregarTipo_inversion = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = tipo_inversion_schema_1.Tipo_inversionSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO tipo_inversion(nombre) values (?)', [nuevo.nombre]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la tipo_inversion" };
    }
});
exports.agregarTipo_inversion = agregarTipo_inversion;
//Para modificar un registro de la tabla tipo_inversion: Se incluye el id de la tabla al final de los elementos
const modificarTipo_inversion = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE tipo_inversion SET nombre=? WHERE id_tipo_inversion=?', [modificado.nombre, modificado.id_tipo_inversion]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarTipo_inversion = modificarTipo_inversion;
//Eliminar un registro de la tabla tipo_inversion
const borrarTipo_inversion = (id_tipo_inversion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM tipo_inversion WHERE id_tipo_inversion=?', [id_tipo_inversion]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarTipo_inversion = borrarTipo_inversion;
