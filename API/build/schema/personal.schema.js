"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalSchema = void 0;
//Validaciones
//Importamos el paquete (zod): Sirve para validar los datos que ingresa el usuario sean seguros y correctos
const zod_1 = require("zod");
//Validaciones de expresiones regulares
//Validacion para telefono
const telefonoRegEx = new RegExp(/^\+?[0-9]{10,15}$/); // Permite números de 10 a 15 dígitos con o sin '+'
//Validación del Nombre
const nombreRegEx = new RegExp(/^[a-zA-Z\s]+$/); // Solo letras y espacios
//Validación de la Dirección
const direccionRegEx = new RegExp(/^[a-zA-Z0-9\s,.\-]+$/); // Letras, números, espacios, comas, puntos, guiones
const estatusRegEx = new RegExp(/^[12]$/); // Acepta solo '1' o '2'
//Creamos las validaciones: Un esquema
//Validaciones para: agregarPersonal
exports.personalSchema = zod_1.z.object({
    //Columna z.TipoDato().min(CantidadMinimaCaracteres).max(CantidadMaximaCaracteres),
    nombre: zod_1.z.string().regex(nombreRegEx, {
        message: "El nombre solo puede contener letras y espacios, y debe tener entre 2 y 200 caracteres.",
    }).min(2, "Mínimo 2 caracteres").max(200, "Máximo 200 caracteres"),
    direccion: zod_1.z.string().regex(direccionRegEx, {
        message: "La dirección solo puede contener letras, números, espacios, comas, puntos y guiones.",
    }).min(2, "Mínimo 2 caracteres").max(200, "Máximo 200 caracteres"),
    telefono: zod_1.z.string().regex(telefonoRegEx, {
        message: "El teléfono debe tener entre 10 y 15 dígitos, y solo puede contener números con o sin el prefijo '+'.",
    }),
    //Solo podra acceder el 1 o 2
    //estatus: z.number().int().positive().min(1).max(2,"Solo puedes ingresar 1-Alta, 2-Baja")
    estatus: zod_1.z.string().regex(estatusRegEx, {
        message: "El estatus solo puede ser 1 (Alta) o 2 (Baja).",
    }),
    //Aqui refinamos para que el usuario solo pueda ingresar como el valor Tec de culiacan, le dara error si ingresa otro valor
    //Si la validacion es Tec de Culiacan esta bien y si no lo es mandara un mensaje atravez del campo drieccion
}); //.refine(data => data.direccion == "Tec de Culiacan",{
//message: "La direccion debe de ser Tec de Culiacan",
//Columna
//path: ["direccion"]
//Refinamos para que slo pueda ingresar 2 valores: 1-Alta y 2-Baja
//});//.refine(data => data.estatus <=2,{
//message: "Solo puedes ingresar: 1-Alta y 2-Baja",
//Columna
//path: ["estatus"]
//});
//Validaciones refiniendo y utilizando expresiones regularespara: modificarPersonal
//Validaciones refiniendo y utilizando expresiones regulares para: eliminarPersonal
