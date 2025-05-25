//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {LugarGasto, LugarGastoAgregar} from '../services/typesLugar_gasto';
//Importamos las validaciones
import { LugarGastoSchema } from '../schema/lugar_gasto.schema';

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
export const obtieneLugarGasto = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM lugar_gasto');
        return results;
    }catch(err){
        return{error: "No se puede obterner la LugarGasto"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraLugarGasto = async (id_lugar_gasto:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM lugar_gasto WHERE id_lugar_gasto = ? LIMIT 1', id_lugar_gasto);
        return results;
    }catch(err){
        return {error: "No se encuentra esa lugar_gasto"};
    }
}
//Para insertar a la tabla cuenta
export const agregarLugarGasto = async(nuevo:LugarGastoAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = LugarGastoSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO lugar_gasto(nombre) values (?)',[nuevo.nombre]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la lugar_gasto"}
    }
}
//Para modificar un registro de la tabla cuenta
export const modificarLugarGasto = async (modificado:LugarGasto) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE lugar_gasto SET nombre=? WHERE id_lugar_gasto=?',[modificado.nombre,modificado.id_lugar_gasto]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla cuenta
export const borrarLugarGasto = async(id_lugar_gasto:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM lugar_gasto WHERE id_lugar_gasto=?',[id_lugar_gasto]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}