//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Cuenta, CuentaAgregar} from '../services/typesCuenta';
//Importamos las validaciones
import { CuentaSchema } from '../schema/cuenta.schema';

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
export const obtieneCuenta = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM cuenta');
        return results;
    }catch(err){
        return{error: "No se puede obterner la cuenta"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraCuenta = async (id_cuenta:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM cuenta WHERE id_cuenta = ? LIMIT 1', id_cuenta);
        return results;
    }catch(err){
        return {error: "No se encuentra esa cuenta"};
    }
}
//Para insertar a la tabla cuenta
export const agregarCuenta = async(nuevo:CuentaAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = CuentaSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO cuenta(nombre) values (?)',[nuevo.nombre]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la cuenta"}
    }
}
//Para modificar un registro de la tabla cuenta
export const modificarCuenta = async (modificado:Cuenta) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE cuenta SET nombre=? WHERE id_cuenta=?',[modificado.nombre,modificado.id_cuenta]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla cuenta
export const borrarCuenta = async(id_cuenta:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM cuenta WHERE id_cuenta=?',[id_cuenta]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}