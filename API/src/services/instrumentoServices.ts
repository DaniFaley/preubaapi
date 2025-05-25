//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Instrumento, InstrumentoAgregar} from '../services/typesInstrumento';
//Importamos las validaciones
import { InstrumentoSchema } from '../schema/instrumento.schema';

import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from '../config';

//Conexion a la base de datos
const conexion = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: Number(DB_PORT),
    multipleStatements: false,
});

export default conexion;
//Para mostrar todos los registros de la tabla Instrumento
export const obtieneInstrumento = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM instrumento');
        return results;
    }catch(err){
        return{error: "No se puede obterner la Instrumento"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraInstrumento = async (id_instrumento:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM instrumento WHERE id_instrumento = ? LIMIT 1', id_instrumento);
        return results;
    }catch(err){
        return {error: "No se encuentra esa Instrumento"};
    }
}
//Para insertar a la tabla instrumento: No se incluye el id de la tabla
export const agregarInstrumento = async(nuevo:InstrumentoAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = InstrumentoSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO instrumento(nombre) values (?)',[nuevo.nombre]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la Instrumento"}
    }
}
//Para modificar un registro de la tabla instrumento: Se incluye el id de la tabla al final de los elementos
export const modificarInstrumento = async (modificado:Instrumento) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE instrumento SET nombre=? WHERE id_instrumento=?',[modificado.nombre,modificado.id_instrumento]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla instrumento
export const borrarInstrumento = async(id_instrumento:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM instrumento WHERE id_instrumento=?',[id_instrumento]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}
