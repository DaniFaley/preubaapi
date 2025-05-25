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
exports.borrarTransaccion = exports.modificarTransaccion = exports.agregarTransaccion = exports.encuentraTransaccion = exports.obtieneTransaccion = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const transaccion_schema_1 = require("../schema/transaccion.schema");
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
//Para mostrar todos los registros de la tabla Transaccion
const obtieneTransaccion = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM transaccion');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la transaccion" };
    }
});
exports.obtieneTransaccion = obtieneTransaccion;
//Para mostrar uno en especifico de la tabla cuenta
const encuentraTransaccion = (id_transaccion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM transaccion WHERE id_transaccion = ? LIMIT 1', id_transaccion);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa transaccion" };
    }
});
exports.encuentraTransaccion = encuentraTransaccion;
//Para insertar a la tabla transaccion: No se incluye el id de la tabla
const agregarTransaccion = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = transaccion_schema_1.TransaccionSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO transaccion(fk_id_cuenta_saliente,fk_id_cuenta_entrante,descripcion,monto,fecha) values (?,?,?,?,?)', [nuevo.fk_id_cuenta_saliente, nuevo.fk_id_cuenta_entrante, nuevo.descripcion, nuevo.monto, nuevo.fecha]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la Transaccion" };
    }
});
exports.agregarTransaccion = agregarTransaccion;
//Para modificar un registro de la tabla Transaccion: Se incluye el id de la tabla al final de los elementos
const modificarTransaccion = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE transaccion SET fk_id_cuenta_saliente=?,fk_id_cuenta_entrante=?,descripcion=?,monto=?,fecha=? WHERE id_transaccion=?', [modificado.fk_id_cuenta_saliente, modificado.fk_id_cuenta_entrante, modificado.descripcion, modificado.monto, modificado.fecha, modificado.id_transaccion]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarTransaccion = modificarTransaccion;
//Eliminar un registro de la tabla transaccion
const borrarTransaccion = (id_transaccion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM transaccion WHERE id_transaccion=?', [id_transaccion]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarTransaccion = borrarTransaccion;
