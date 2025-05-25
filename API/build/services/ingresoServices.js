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
exports.borrarIngreso = exports.modificarIngreso = exports.agregarIngreso = exports.encuentraIngreso = exports.obtieneIngreso = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const ingreso_schema_1 = require("../schema/ingreso.schema");
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
//Para mostrar todos los registros de la tabla Ingreso
const obtieneIngreso = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM ingreso');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la Ingreso" };
    }
});
exports.obtieneIngreso = obtieneIngreso;
//Para mostrar uno en especifico de la tabla cuenta
const encuentraIngreso = (id_ingreso) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM ingreso WHERE id_ingreso = ? LIMIT 1', id_ingreso);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa ingreso" };
    }
});
exports.encuentraIngreso = encuentraIngreso;
//Para insertar a la tabla ingreso: No se incluye el id de la tabla
const agregarIngreso = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = ingreso_schema_1.IngresoSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO ingreso(fk_id_cuenta,fk_id_categoria_ingreso,descripcion,monto,fecha_operacion) values (?,?,?,?,?)', [nuevo.fk_id_cuenta, nuevo.fk_id_categoria_ingreso, nuevo.descripcion, nuevo.monto, nuevo.fecha_operacion]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la ingreso" };
    }
});
exports.agregarIngreso = agregarIngreso;
//Para modificar un registro de la tabla ingreso: Se incluye el id de la tabla al final de los elementos
const modificarIngreso = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE ingreso SET fk_id_cuenta=?,fk_id_categoria_ingreso=?,descripcion=?,monto=?,fecha_operacion=? WHERE id_ingreso=?', [modificado.fk_id_cuenta, modificado.fk_id_categoria_ingreso, modificado.descripcion, modificado.monto, modificado.fecha_operacion, modificado.id_ingreso]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarIngreso = modificarIngreso;
//Eliminar un registro de la tabla ingreso
const borrarIngreso = (id_ingreso) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM ingreso WHERE id_ingreso=?', [id_ingreso]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarIngreso = borrarIngreso;
