//2 Tipos: Para cuando hace return,
export interface Gasto{
    id_gasto:number,
    fk_id_cuenta: number,
    fk_id_categoria_gasto: number,
    fk_id_tipo_gasto: number,
    fk_id_lugar_gasto: number,
    descripcion: string,
    monto: number,
    fecha_operacion: Date,
    fecha_pago: Date
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type GastoAgregar = Omit<Gasto,'id_gasto'>