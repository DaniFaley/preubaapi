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
exports.borrarTipoGasto = exports.modificarTipoGasto = exports.agregarTipoGasto = exports.encuentraTipoGasto = exports.obtieneTipoGasto = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const tipo_gasto_schema_1 = require("../schema/tipo_gasto.schema");
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
const obtieneTipoGasto = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM tipo_gasto');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la TipoGasto" };
    }
});
exports.obtieneTipoGasto = obtieneTipoGasto;
//Para mostrar uno en especifico de la tabla cuenta
const encuentraTipoGasto = (id_tipo_gasto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM tipo_gasto WHERE id_tipo_gasto = ? LIMIT 1', id_tipo_gasto);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa tipo_gasto" };
    }
});
exports.encuentraTipoGasto = encuentraTipoGasto;
//Para insertar a la tabla cuenta
const agregarTipoGasto = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = tipo_gasto_schema_1.TipoGastoSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO tipo_gasto(nombre) values (?)', [nuevo.nombre]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la tipo_gasto" };
    }
});
exports.agregarTipoGasto = agregarTipoGasto;
//Para modificar un registro de la tabla cuenta
const modificarTipoGasto = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE tipo_gasto SET nombre=? WHERE id_tipo_gasto=?', [modificado.nombre, modificado.id_tipo_gasto]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarTipoGasto = modificarTipoGasto;
//Eliminar un registro de la tabla cuenta
const borrarTipoGasto = (id_tipo_gasto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM tipo_gasto WHERE id_tipo_gasto=?', [id_tipo_gasto]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarTipoGasto = borrarTipoGasto;
