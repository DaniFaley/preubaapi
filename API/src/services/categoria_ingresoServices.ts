//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {CategoriaIngreso, CategoriaIngresoAgregar} from '../services/typesCategoria_ingreso';
//Importamos las validaciones
import { CategoriaIngresoSchema } from '../schema/categoria_ingreso.schema';

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
export const obtieneCategoriaIngreso = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM categoria_ingreso');
        return results;
    }catch(err){
        return{error: "No se puede obterner la CategoriaIngreso"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraCategoriaIngreso = async (id_categoria_ingreso:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM categoria_ingreso WHERE id_categoria_ingreso = ? LIMIT 1', id_categoria_ingreso);
        return results;
    }catch(err){
        return {error: "No se encuentra esa categoria_ingreso"};
    }
}
//Para insertar a la tabla cuenta
export const agregarCategoriaIngreso = async(nuevo:CategoriaIngresoAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = CategoriaIngresoSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO categoria_ingreso(nombre) values (?)',[nuevo.nombre]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la categoria_ingreso"}
    }
}
//Para modificar un registro de la tabla cuenta
export const modificarCategoriaIngreso = async (modificado:CategoriaIngreso) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE categoria_ingreso SET nombre=? WHERE id_categoria_ingreso=?',[modificado.nombre,modificado.id_categoria_ingreso]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla cuenta
export const borrarCategoriaIngreso = async(id_categoria_ingreso:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM categoria_ingreso WHERE id_categoria_ingreso=?',[id_categoria_ingreso]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}