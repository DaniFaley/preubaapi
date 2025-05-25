//2 Tipos: Para cuando hace return,
export interface Transaccion{
    id_transaccion: number,
    fk_id_cuenta_saliente: number,
    fk_id_cuenta_entrante: number,
    descripcion: string,
    monto: number,
    fecha: Date
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type TransaccionAgregar = Omit<Transaccion,'id_transaccion'>