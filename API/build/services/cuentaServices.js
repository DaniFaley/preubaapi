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
exports.borrarCuenta = exports.modificarCuenta = exports.agregarCuenta = exports.encuentraCuenta = exports.obtieneCuenta = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const cuenta_schema_1 = require("../schema/cuenta.schema");
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
const obtieneCuenta = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM cuenta');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la cuenta" };
    }
});
exports.obtieneCuenta = obtieneCuenta;
//Para mostrar uno en especifico de la tabla cuenta
const encuentraCuenta = (id_cuenta) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM cuenta WHERE id_cuenta = ? LIMIT 1', id_cuenta);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa cuenta" };
    }
});
exports.encuentraCuenta = encuentraCuenta;
//Para insertar a la tabla cuenta
const agregarCuenta = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = cuenta_schema_1.CuentaSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO cuenta(nombre) values (?)', [nuevo.nombre]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la cuenta" };
    }
});
exports.agregarCuenta = agregarCuenta;
//Para modificar un registro de la tabla cuenta
const modificarCuenta = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE cuenta SET nombre=? WHERE id_cuenta=?', [modificado.nombre, modificado.id_cuenta]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarCuenta = modificarCuenta;
//Eliminar un registro de la tabla cuenta
const borrarCuenta = (id_cuenta) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM cuenta WHERE id_cuenta=?', [id_cuenta]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarCuenta = borrarCuenta;
