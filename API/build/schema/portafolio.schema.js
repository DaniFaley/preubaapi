"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortafolioSchema = void 0;
//Validaciones
//Importamos el paquete (zod): Sirve para validar los datos que ingresa el usuario sean seguros y correctos
const zod_1 = require("zod");
const descripcionRegEx = new RegExp(/^[a-zA-Z\s]+$/);
// Esquema de validaciones para clientes
exports.PortafolioSchema = zod_1.z.object({
    descripcion: zod_1.z.string().regex(descripcionRegEx, {
        message: "El nombre solo puede contener letras y espacios."
    }).min(2, "Mínimo 2 caracteres").max(50, "Máximo 50 caracteres")
});
