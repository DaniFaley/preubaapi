export interface Portafolio{
    id_portafolio:number,
    fk_id_instrumento: number,
    fk_id_tipo_inversion: number,
    descripcion: string,
    monto: number,
    tasa: number,
    fecha_inicio: Date,
    fecha_final: Date,
    comprobante: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type PortafolioAgregar = Omit<Portafolio,'id_portafolio'>