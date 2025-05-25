import express, {Request,Response} from 'express';
import * as lugar_gastoServices from '../services/lugar_gastoServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/lugar_gasto/
router.get('/', async (_req: Request, res: Response)=>{
    let lugar_gasto = await lugar_gastoServices.obtieneLugarGasto();
    res.send(lugar_gasto)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/lugar_gasto/1 <------Numero id del personal
router.get('/:id_lugar_gasto', async (req: Request, res: Response)=>{
    let lugar_gasto = await lugar_gastoServices.encuentraLugarGasto(Number(req.params.id_lugar_gasto));
    res.send(lugar_gasto);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {nombre} = req.body;
        const nuevo = await lugar_gastoServices.agregarLugarGasto({
            nombre
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar la lugar_gasto");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_lugar_gasto,nombre} = req.body;
        const modificado = await lugar_gastoServices.modificarLugarGasto({
            id_lugar_gasto,
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
        const {id_lugar_gasto} = req.body;
        const eliminado = await lugar_gastoServices.borrarLugarGasto(Number(id_lugar_gasto));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Obtener una cuenta
router.get('/', async (_req: Request, res: Response) => {
    const lugar_gastos = await lugar_gastoServices.obtieneLugarGasto();
    res.send(lugar_gastos);
});

export default router;