//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Gasto, GastoAgregar} from '../services/typesGasto';
//Importamos las validaciones
import { GastoSchema } from '../schema/gasto.schema';
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



//Para mostrar todos los registros de la tabla Gasto
export const obtieneGasto = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM gasto');
        return results;
    }catch(err){
        return{error: "No se puede obterner la Gasto"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraGasto = async (id_gasto:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM gasto WHERE id_gasto = ? LIMIT 1', id_gasto);
        return results;
    }catch(err){
        return {error: "No se encuentra esa gasto"};
    }
}
//Para insertar a la tabla gasto: No se incluye el id de la tabla
export const agregarGasto = async(nuevo:GastoAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = GastoSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO gasto(fk_id_cuenta,fk_id_categoria_gasto,fk_id_tipo_gasto,fk_id_lugar_gasto,descripcion,monto,fecha_operacion,fecha_pago) values (?,?,?,?,?,?,?,?)',[nuevo.fk_id_cuenta,nuevo.fk_id_categoria_gasto,nuevo.fk_id_tipo_gasto,nuevo.fk_id_lugar_gasto,nuevo.descripcion,nuevo.monto,nuevo.fecha_operacion,nuevo.fecha_pago]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la gasto"}
    }
}
//Para modificar un registro de la tabla gasto: Se incluye el id de la tabla al final de los elementos
export const modificarGasto = async (modificado:Gasto) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE gasto SET fk_id_cuenta=?,fk_id_categoria_gasto=?,fk_id_tipo_gasto=?,fk_id_lugar_gasto=?,descripcion=?,monto=?,fecha_operacion=?,fecha_pago=? WHERE id_gasto=?',[modificado.fk_id_cuenta,modificado.fk_id_categoria_gasto,modificado.fk_id_tipo_gasto,modificado.fk_id_lugar_gasto,modificado.descripcion,modificado.monto,modificado.fecha_operacion,modificado.fecha_pago,modificado.id_gasto]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla gasto
export const borrarGasto = async(id_gasto:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM gasto WHERE id_gasto=?',[id_gasto]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}