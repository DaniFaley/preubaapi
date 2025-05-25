//2 Tipos: Para cuando hace return,
export interface Instrumento{
    id_instrumento: number,
    nombre: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type InstrumentoAgregar = Omit<Instrumento,'id_instrumento'>