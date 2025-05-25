"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuentaSchema = void 0;
//Validaciones
//Importamos el paquete (zod): Sirve para validar los datos que ingresa el usuario sean seguros y correctos
const zod_1 = require("zod");
const nombreRegEx = new RegExp(/^[a-zA-Z\s]+$/);
// Esquema de validaciones para clientes
exports.CuentaSchema = zod_1.z.object({
    nombre: zod_1.z.string().regex(nombreRegEx, {
        message: "El nombre solo puede contener letras y espacios."
    }).min(2, "Mínimo 2 caracteres").max(40, "Máximo 20 caracteres")
});
