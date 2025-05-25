//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Transaccion, TransaccionAgregar} from '../services/typesTransaccion';
//Importamos las validaciones
import { TransaccionSchema } from '../schema/transaccion.schema';

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
//Para mostrar todos los registros de la tabla Transaccion
export const obtieneTransaccion = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM transaccion');
        return results;
    }catch(err){
        return{error: "No se puede obterner la transaccion"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraTransaccion = async (id_transaccion:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM transaccion WHERE id_transaccion = ? LIMIT 1', id_transaccion);
        return results;
    }catch(err){
        return {error: "No se encuentra esa transaccion"};
    }
}
//Para insertar a la tabla transaccion: No se incluye el id de la tabla
export const agregarTransaccion = async(nuevo:TransaccionAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = TransaccionSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO transaccion(fk_id_cuenta_saliente,fk_id_cuenta_entrante,descripcion,monto,fecha) values (?,?,?,?,?)',[nuevo.fk_id_cuenta_saliente,nuevo.fk_id_cuenta_entrante,nuevo.descripcion,nuevo.monto,nuevo.fecha]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la Transaccion"}
    }
}
//Para modificar un registro de la tabla Transaccion: Se incluye el id de la tabla al final de los elementos
export const modificarTransaccion = async (modificado:Transaccion) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE transaccion SET fk_id_cuenta_saliente=?,fk_id_cuenta_entrante=?,descripcion=?,monto=?,fecha=? WHERE id_transaccion=?',[modificado.fk_id_cuenta_saliente,modificado.fk_id_cuenta_entrante,modificado.descripcion,modificado.monto,modificado.fecha,modificado.id_transaccion]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla transaccion
export const borrarTransaccion = async(id_transaccion:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM transaccion WHERE id_transaccion=?',[id_transaccion]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}