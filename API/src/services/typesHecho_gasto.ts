//2 Tipos: Para cuando hace return,
export interface HechoGasto{
    id_hecho_gasto:number,
    nombre: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type HechoGastoAgregar = Omit<HechoGasto,'id_hecho_gasto'>