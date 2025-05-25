//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Tipo_inversion, Tipo_inversionAgregar} from '../services/typesTipo_inversion';
//Importamos las validaciones
import { Tipo_inversionSchema } from '../schema/tipo_inversion.schema';

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
//Para mostrar todos los registros de la tabla tipo_inversion
export const obtieneTipo_inversion = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM tipo_inversion');
        return results;
    }catch(err){
        return{error: "No se puede obterner la tipo_inversion"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraTipo_inversion = async (id_tipo_inversion:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM tipo_inversion WHERE id_tipo_inversion = ? LIMIT 1', id_tipo_inversion);
        return results;
    }catch(err){
        return {error: "No se encuentra esa tipo_inversion"};
    }
}
//Para insertar a la tabla instrumento: No se incluye el id de la tabla
export const agregarTipo_inversion = async(nuevo:Tipo_inversionAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = Tipo_inversionSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO tipo_inversion(nombre) values (?)',[nuevo.nombre]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la tipo_inversion"}
    }
}
//Para modificar un registro de la tabla tipo_inversion: Se incluye el id de la tabla al final de los elementos
export const modificarTipo_inversion = async (modificado:Tipo_inversion) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE tipo_inversion SET nombre=? WHERE id_tipo_inversion=?',[modificado.nombre,modificado.id_tipo_inversion]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla tipo_inversion
export const borrarTipo_inversion = async(id_tipo_inversion:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM tipo_inversion WHERE id_tipo_inversion=?',[id_tipo_inversion]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}
