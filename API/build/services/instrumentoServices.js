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
exports.borrarInstrumento = exports.modificarInstrumento = exports.agregarInstrumento = exports.encuentraInstrumento = exports.obtieneInstrumento = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const instrumento_schema_1 = require("../schema/instrumento.schema");
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
//Para mostrar todos los registros de la tabla Instrumento
const obtieneInstrumento = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM instrumento');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la Instrumento" };
    }
});
exports.obtieneInstrumento = obtieneInstrumento;
//Para mostrar uno en especifico de la tabla cuenta
const encuentraInstrumento = (id_instrumento) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM instrumento WHERE id_instrumento = ? LIMIT 1', id_instrumento);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa Instrumento" };
    }
});
exports.encuentraInstrumento = encuentraInstrumento;
//Para insertar a la tabla instrumento: No se incluye el id de la tabla
const agregarInstrumento = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = instrumento_schema_1.InstrumentoSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO instrumento(nombre) values (?)', [nuevo.nombre]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la Instrumento" };
    }
});
exports.agregarInstrumento = agregarInstrumento;
//Para modificar un registro de la tabla instrumento: Se incluye el id de la tabla al final de los elementos
const modificarInstrumento = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE instrumento SET nombre=? WHERE id_instrumento=?', [modificado.nombre, modificado.id_instrumento]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarInstrumento = modificarInstrumento;
//Eliminar un registro de la tabla instrumento
const borrarInstrumento = (id_instrumento) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM instrumento WHERE id_instrumento=?', [id_instrumento]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarInstrumento = borrarInstrumento;
