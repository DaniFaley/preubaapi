export interface Ingreso{
    id_ingreso:number,
    fk_id_cuenta: number,
    fk_id_categoria_ingreso: number,
    descripcion: string,
    monto: number,
    fecha_operacion: Date
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type IngresoAgregar = Omit<Ingreso,'id_ingreso'>