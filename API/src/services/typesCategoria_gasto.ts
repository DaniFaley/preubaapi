//2 Tipos: Para cuando hace return,
export interface CategoriaGasto{
    id_categoria_gasto:number,
    nombre: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type CategoriaGastoAgregar = Omit<CategoriaGasto,'id_categoria_gasto'>