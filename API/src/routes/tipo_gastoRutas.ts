import express, {Request,Response} from 'express';
import * as tipo_gastoServices from '../services/tipo_gastoServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/tipo_gasto/
router.get('/', async (_req: Request, res: Response)=>{
    let tipo_gasto = await tipo_gastoServices.obtieneTipoGasto();
    res.send(tipo_gasto)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/tipo_gasto/1 <------Numero id del personal
router.get('/:id_tipo_gasto', async (req: Request, res: Response)=>{
    let tipo_gasto = await tipo_gastoServices.encuentraTipoGasto(Number(req.params.id_tipo_gasto));
    res.send(tipo_gasto);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {nombre} = req.body;
        const nuevo = await tipo_gastoServices.agregarTipoGasto({
            nombre
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar la tipo_gasto");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_tipo_gasto,nombre} = req.body;
        const modificado = await tipo_gastoServices.modificarTipoGasto({
            id_tipo_gasto,
            nombre
        });
        res.send(modificado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Eliminar un registro.
router.delete('/', async (req: Request, res: Response) => {
    try{
        const {id_tipo_gasto} = req.body;
        const eliminado = await tipo_gastoServices.borrarTipoGasto(Number(id_tipo_gasto));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Obtener un tipo de gasto: Necesario o innecesario
router.get('/', async (_req: Request, res: Response) => {
    const tipo_gastos = await tipo_gastoServices.obtieneTipoGasto();
    res.send(tipo_gastos);
});
export default router;