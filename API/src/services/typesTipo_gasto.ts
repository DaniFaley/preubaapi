//2 Tipos: Para cuando hace return,
export interface TipoGasto{
    id_tipo_gasto:number,
    nombre: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type TipoGastoAgregar = Omit<TipoGasto,'id_tipo_gasto'>