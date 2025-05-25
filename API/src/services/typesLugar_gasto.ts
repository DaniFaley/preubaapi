//2 Tipos: Para cuando hace return,
export interface LugarGasto{
    id_lugar_gasto:number,
    nombre: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type LugarGastoAgregar = Omit<LugarGasto,'id_lugar_gasto'>