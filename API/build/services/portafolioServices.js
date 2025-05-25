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
exports.borrarPortafolio = exports.modificarPortafolio = exports.agregarPortafolio = exports.encuentraPortafolio = exports.obtienePortafolio = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const portafolio_schema_1 = require("../schema/portafolio.schema");
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
const obtienePortafolio = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM portafolio');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la portafolio" };
    }
});
exports.obtienePortafolio = obtienePortafolio;
//Para mostrar uno en especifico de la tabla cuenta
const encuentraPortafolio = (id_portafolio) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM portafolio WHERE id_portafolio = ? LIMIT 1', id_portafolio);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa portafolio" };
    }
});
exports.encuentraPortafolio = encuentraPortafolio;
//Para insertar a la tabla portafolio: No se incluye el id de la tabla
const agregarPortafolio = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = portafolio_schema_1.PortafolioSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO portafolio (fk_id_instrumento, fk_id_tipo_inversion, descripcion, monto, tasa, fecha_inicio, fecha_final, comprobante) values (?,?,?,?,?,?,?,?)', [nuevo.fk_id_instrumento, nuevo.fk_id_tipo_inversion, nuevo.descripcion, nuevo.monto, nuevo.tasa, nuevo.fecha_inicio, nuevo.fecha_final, nuevo.comprobante]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la portafolio" };
    }
});
exports.agregarPortafolio = agregarPortafolio;
//Para modificar un registro de la tabla ingreso: Se incluye el id de la tabla al final de los elementos
const modificarPortafolio = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE portafolio SET fk_id_instrumento=?, fk_id_tipo_inversion=?, descripcion=?, monto=?, tasa=?, fecha_inicio=?, fecha_final=?, comprobante=? WHERE id_portafolio=?', [modificado.fk_id_instrumento, modificado.fk_id_tipo_inversion, modificado.descripcion, modificado.monto, modificado.tasa, modificado.fecha_inicio, modificado.fecha_final, modificado.comprobante, modificado.id_portafolio]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarPortafolio = modificarPortafolio;
//Eliminar un registro de la tabla portafolio
const borrarPortafolio = (id_portafolio) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM portafolio WHERE id_portafolio=?', [id_portafolio]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarPortafolio = borrarPortafolio;
