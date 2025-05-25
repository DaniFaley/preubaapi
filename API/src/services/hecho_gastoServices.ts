//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {HechoGasto, HechoGastoAgregar} from '../services/typesHecho_gasto';
//Importamos las validaciones
import { HechoGastoSchema } from '../schema/hecho_gasto.schema';

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
//Para mostrar todos los registros de la tabla cuenta
export const obtieneHechoGasto = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM hecho_gasto');
        return results;
    }catch(err){
        return{error: "No se puede obterner la HechoGasto"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraHechoGasto = async (id_hecho_gasto:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM hecho_gasto WHERE id_hecho_gasto = ? LIMIT 1', id_hecho_gasto);
        return results;
    }catch(err){
        return {error: "No se encuentra esa hecho_gasto"};
    }
}
//Para insertar a la tabla cuenta
export const agregarHechoGasto = async(nuevo:HechoGastoAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = HechoGastoSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO hecho_gasto(nombre) values (?)',[nuevo.nombre]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la hecho_gasto"}
    }
}
//Para modificar un registro de la tabla cuenta
export const modificarHechoGasto = async (modificado:HechoGasto) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE hecho_gasto SET nombre=? WHERE id_hecho_gasto=?',[modificado.nombre,modificado.id_hecho_gasto]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla cuenta
export const borrarHechoGasto = async(id_hecho_gasto:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM hecho_gasto WHERE id_hecho_gasto=?',[id_hecho_gasto]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}