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
exports.borrarPersonal = exports.modificarPersonal = exports.agregarPersonal = exports.encuentraPersonalTelefono = exports.encuentraPersonal = exports.obtienePersonal = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const personal_schema_1 = require("../schema/personal.schema");
const conexion = promise_1.default.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "pw2024",
    port: 3306,
    //Evitar las multiples consultas a la vez
    multipleStatements: false
});
//Para mostrar todos
const obtienePersonal = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM personal');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner el personal" };
    }
});
exports.obtienePersonal = obtienePersonal;
//Para mostrar uno en especifico
const encuentraPersonal = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM personal WHERE id = ? LIMIT 1', id);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra ese personal" };
    }
});
exports.encuentraPersonal = encuentraPersonal;
//Para mostrar usuarios con el mismo telefono
const encuentraPersonalTelefono = (telefono) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM personal WHERE telefono = ? AND estatus = 1', telefono);
        return results;
    }
    catch (err) {
        return { error: "No se puede encontrar al personal con ese numero de telefono" };
    }
});
exports.encuentraPersonalTelefono = encuentraPersonalTelefono;
//Para insertar
const agregarPersonal = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        //const validacion = personalSchema.safeParse(AquienVaA_Validar);
        const validacion = personal_schema_1.personalSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO personal(nombre,direccion,telefono,estatus) values (?,?,?,?)', [nuevo.nombre, nuevo.direccion, nuevo.telefono, nuevo.estatus]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar al personal" };
    }
});
exports.agregarPersonal = agregarPersonal;
//Para modificar
const modificarPersonal = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE personal SET nombre=?,direccion=?,telefono=?,estatus=? WHERE id=?', [modificado.nombre, modificado.direccion, modificado.telefono, modificado.estatus, modificado.id]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarPersonal = modificarPersonal;
//Eliminar un registro
const borrarPersonal = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM personal WHERE id=?', [id]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarPersonal = borrarPersonal;
