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
exports.borrarGasto = exports.modificarGasto = exports.agregarGasto = exports.encuentraGasto = exports.obtieneGasto = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const gasto_schema_1 = require("../schema/gasto.schema");
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
//Para mostrar todos los registros de la tabla Gasto
const obtieneGasto = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM gasto');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la Gasto" };
    }
});
exports.obtieneGasto = obtieneGasto;
//Para mostrar uno en especifico de la tabla cuenta
const encuentraGasto = (id_gasto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM gasto WHERE id_gasto = ? LIMIT 1', id_gasto);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa gasto" };
    }
});
exports.encuentraGasto = encuentraGasto;
//Para insertar a la tabla gasto: No se incluye el id de la tabla
const agregarGasto = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = gasto_schema_1.GastoSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO gasto(fk_id_cuenta,fk_id_categoria_gasto,fk_id_tipo_gasto,fk_id_lugar_gasto,descripcion,monto,fecha_operacion,fecha_pago) values (?,?,?,?,?,?,?,?)', [nuevo.fk_id_cuenta, nuevo.fk_id_categoria_gasto, nuevo.fk_id_tipo_gasto, nuevo.fk_id_lugar_gasto, nuevo.descripcion, nuevo.monto, nuevo.fecha_operacion, nuevo.fecha_pago]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la gasto" };
    }
});
exports.agregarGasto = agregarGasto;
//Para modificar un registro de la tabla gasto: Se incluye el id de la tabla al final de los elementos
const modificarGasto = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE gasto SET fk_id_cuenta=?,fk_id_categoria_gasto=?,fk_id_tipo_gasto=?,fk_id_lugar_gasto=?,descripcion=?,monto=?,fecha_operacion=?,fecha_pago=? WHERE id_gasto=?', [modificado.fk_id_cuenta, modificado.fk_id_categoria_gasto, modificado.fk_id_tipo_gasto, modificado.fk_id_lugar_gasto, modificado.descripcion, modificado.monto, modificado.fecha_operacion, modificado.fecha_pago, modificado.id_gasto]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarGasto = modificarGasto;
//Eliminar un registro de la tabla gasto
const borrarGasto = (id_gasto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM gasto WHERE id_gasto=?', [id_gasto]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarGasto = borrarGasto;
