//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Portafolio, PortafolioAgregar} from '../services/typesPortafolio';
//Importamos las validaciones
import { PortafolioSchema } from '../schema/portafolio.schema';

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
export const obtienePortafolio = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM portafolio');
        return results;
    }catch(err){
        return{error: "No se puede obterner la portafolio"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraPortafolio = async (id_portafolio:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM portafolio WHERE id_portafolio = ? LIMIT 1', id_portafolio);
        return results;
    }catch(err){
        return {error: "No se encuentra esa portafolio"};
    }
}
//Para insertar a la tabla portafolio: No se incluye el id de la tabla
export const agregarPortafolio = async(nuevo:PortafolioAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = PortafolioSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO portafolio (fk_id_instrumento, fk_id_tipo_inversion, descripcion, monto, tasa, fecha_inicio, fecha_final, comprobante) values (?,?,?,?,?,?,?,?)',[nuevo.fk_id_instrumento,nuevo.fk_id_tipo_inversion,nuevo.descripcion,nuevo.monto,nuevo.tasa,nuevo.fecha_inicio,nuevo.fecha_final,nuevo.comprobante]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la portafolio"}
    }
}
//Para modificar un registro de la tabla ingreso: Se incluye el id de la tabla al final de los elementos
export const modificarPortafolio = async (modificado:Portafolio) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE portafolio SET fk_id_instrumento=?, fk_id_tipo_inversion=?, descripcion=?, monto=?, tasa=?, fecha_inicio=?, fecha_final=?, comprobante=? WHERE id_portafolio=?',[modificado.fk_id_instrumento, modificado.fk_id_tipo_inversion, modificado.descripcion, modificado.monto, modificado.tasa, modificado.fecha_inicio, modificado.fecha_final, modificado.comprobante,modificado.id_portafolio]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla portafolio
export const borrarPortafolio = async(id_portafolio:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM portafolio WHERE id_portafolio=?',[id_portafolio]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}
