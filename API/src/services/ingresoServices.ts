//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Ingreso, IngresoAgregar} from '../services/typesIngreso';
//Importamos las validaciones
import { IngresoSchema } from '../schema/ingreso.schema';

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
//Para mostrar todos los registros de la tabla Ingreso
export const obtieneIngreso = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM ingreso');
        return results;
    }catch(err){
        return{error: "No se puede obterner la Ingreso"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraIngreso = async (id_ingreso:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM ingreso WHERE id_ingreso = ? LIMIT 1', id_ingreso);
        return results;
    }catch(err){
        return {error: "No se encuentra esa ingreso"};
    }
}
//Para insertar a la tabla ingreso: No se incluye el id de la tabla
export const agregarIngreso = async(nuevo:IngresoAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = IngresoSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO ingreso(fk_id_cuenta,fk_id_categoria_ingreso,descripcion,monto,fecha_operacion) values (?,?,?,?,?)',[nuevo.fk_id_cuenta,nuevo.fk_id_categoria_ingreso,nuevo.descripcion,nuevo.monto,nuevo.fecha_operacion]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la ingreso"}
    }
}
//Para modificar un registro de la tabla ingreso: Se incluye el id de la tabla al final de los elementos
export const modificarIngreso = async (modificado:Ingreso) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE ingreso SET fk_id_cuenta=?,fk_id_categoria_ingreso=?,descripcion=?,monto=?,fecha_operacion=? WHERE id_ingreso=?',[modificado.fk_id_cuenta,modificado.fk_id_categoria_ingreso,modificado.descripcion,modificado.monto,modificado.fecha_operacion,modificado.id_ingreso]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla ingreso
export const borrarIngreso = async(id_ingreso:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM ingreso WHERE id_ingreso=?',[id_ingreso]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}
