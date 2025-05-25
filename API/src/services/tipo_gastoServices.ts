//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {TipoGasto, TipoGastoAgregar} from '../services/typesTipo_gasto';
//Importamos las validaciones
import { TipoGastoSchema } from '../schema/tipo_gasto.schema';

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
export const obtieneTipoGasto = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM tipo_gasto');
        return results;
    }catch(err){
        return{error: "No se puede obterner la TipoGasto"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraTipoGasto = async (id_tipo_gasto:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM tipo_gasto WHERE id_tipo_gasto = ? LIMIT 1', id_tipo_gasto);
        return results;
    }catch(err){
        return {error: "No se encuentra esa tipo_gasto"};
    }
}
//Para insertar a la tabla cuenta
export const agregarTipoGasto = async(nuevo:TipoGastoAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = TipoGastoSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO tipo_gasto(nombre) values (?)',[nuevo.nombre]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la tipo_gasto"}
    }
}
//Para modificar un registro de la tabla cuenta
export const modificarTipoGasto = async (modificado:TipoGasto) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE tipo_gasto SET nombre=? WHERE id_tipo_gasto=?',[modificado.nombre,modificado.id_tipo_gasto]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla cuenta
export const borrarTipoGasto = async(id_tipo_gasto:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM tipo_gasto WHERE id_tipo_gasto=?',[id_tipo_gasto]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}