//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {CategoriaGasto, CategoriaGastoAgregar} from '../services/typesCategoria_gasto';
//Importamos las validaciones
import { CategoriaGastoSchema } from '../schema/categoria_gasto.schema';

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
export const obtieneCategoriaGasto = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM categoria_gasto');
        return results;
    }catch(err){
        return{error: "No se puede obterner la CategoriaGasto"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraCategoriaGasto = async (id_categoria_gasto:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM categoria_gasto WHERE id_categoria_gasto = ? LIMIT 1', id_categoria_gasto);
        return results;
    }catch(err){
        return {error: "No se encuentra esa categoria_gasto"};
    }
}
//Para insertar a la tabla cuenta
export const agregarCategoriaGasto = async(nuevo:CategoriaGastoAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = CategoriaGastoSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO categoria_gasto(nombre) values (?)',[nuevo.nombre]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la categoria_gasto"}
    }
}
//Para modificar un registro de la tabla cuenta
export const modificarCategoriaGasto = async (modificado:CategoriaGasto) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE categoria_gasto SET nombre=? WHERE id_categoria_gasto=?',[modificado.nombre,modificado.id_categoria_gasto]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla cuenta
export const borrarCategoriaGasto = async(id_categoria_gasto:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM categoria_gasto WHERE id_categoria_gasto=?',[id_categoria_gasto]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}