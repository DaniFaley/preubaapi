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
exports.borrarHechoGasto = exports.modificarHechoGasto = exports.agregarHechoGasto = exports.encuentraHechoGasto = exports.obtieneHechoGasto = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const hecho_gasto_schema_1 = require("../schema/hecho_gasto.schema");
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
const obtieneHechoGasto = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM hecho_gasto');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la HechoGasto" };
    }
});
exports.obtieneHechoGasto = obtieneHechoGasto;
//Para mostrar uno en especifico de la tabla cuenta
const encuentraHechoGasto = (id_hecho_gasto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM hecho_gasto WHERE id_hecho_gasto = ? LIMIT 1', id_hecho_gasto);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa hecho_gasto" };
    }
});
exports.encuentraHechoGasto = encuentraHechoGasto;
//Para insertar a la tabla cuenta
const agregarHechoGasto = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = hecho_gasto_schema_1.HechoGastoSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO hecho_gasto(nombre) values (?)', [nuevo.nombre]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la hecho_gasto" };
    }
});
exports.agregarHechoGasto = agregarHechoGasto;
//Para modificar un registro de la tabla cuenta
const modificarHechoGasto = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE hecho_gasto SET nombre=? WHERE id_hecho_gasto=?', [modificado.nombre, modificado.id_hecho_gasto]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarHechoGasto = modificarHechoGasto;
//Eliminar un registro de la tabla cuenta
const borrarHechoGasto = (id_hecho_gasto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM hecho_gasto WHERE id_hecho_gasto=?', [id_hecho_gasto]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarHechoGasto = borrarHechoGasto;
