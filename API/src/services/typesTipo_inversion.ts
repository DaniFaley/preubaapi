//2 Tipos: Para cuando hace return,
export interface Tipo_inversion{
    id_tipo_inversion: number,
    nombre: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type Tipo_inversionAgregar = Omit<Tipo_inversion,'id_tipo_inversion'>