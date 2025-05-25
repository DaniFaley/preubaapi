//2 Tipos: Para cuando hace return,
export interface CategoriaIngreso{
    id_categoria_ingreso:number,
    nombre: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type CategoriaIngresoAgregar = Omit<CategoriaIngreso,'id_categoria_ingreso'>