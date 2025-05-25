import express, {Request,Response} from 'express';
import * as hecho_gastoServices from '../services/hecho_gastoServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/hecho_gasto/
router.get('/', async (_req: Request, res: Response)=>{
    let hecho_gasto = await hecho_gastoServices.obtieneHechoGasto();
    res.send(hecho_gasto)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/hecho_gasto/1 <------Numero id del personal
router.get('/:id_hecho_gasto', async (req: Request, res: Response)=>{
    let hecho_gasto = await hecho_gastoServices.encuentraHechoGasto(Number(req.params.id_hecho_gasto));
    res.send(hecho_gasto);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {nombre} = req.body;
        const nuevo = await hecho_gastoServices.agregarHechoGasto({
            nombre
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar la hecho_gasto");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_hecho_gasto,nombre} = req.body;
        const modificado = await hecho_gastoServices.modificarHechoGasto({
            id_hecho_gasto,
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
        const {id_hecho_gasto} = req.body;
        const eliminado = await hecho_gastoServices.borrarHechoGasto(Number(id_hecho_gasto));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Obtener una cuenta
router.get('/', async (_req: Request, res: Response) => {
    const hecho_gastos = await hecho_gastoServices.obtieneHechoGasto();
    res.send(hecho_gastos);
});
export default router;