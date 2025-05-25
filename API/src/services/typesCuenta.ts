//2 Tipos: Para cuando hace return,
export interface Cuenta{
    id_cuenta:number,
    nombre: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type CuentaAgregar = Omit<Cuenta,'id_cuenta'>