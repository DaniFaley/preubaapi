import express, {Request,Response} from 'express';
import * as instrumentoServices from '../services/instrumentoServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/instrumento/
router.get('/', async (_req: Request, res: Response)=>{
    let instrumento = await instrumentoServices.obtieneInstrumento();
    res.send(instrumento)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/instrumento/1 <------Numero id del personal
router.get('/:id_instrumento', async (req: Request, res: Response)=>{
    let instrumento = await instrumentoServices.encuentraInstrumento(Number(req.params.id_instrumento));
    res.send(instrumento);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar: No se le pone el campo id de la tabla
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {nombre} = req.body;
        const nuevo = await instrumentoServices.agregarInstrumento({ 
            nombre
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar la instrumento");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos: Se le pone el id de la misma tabla
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_instrumento, nombre} = req.body;
        const modificado = await instrumentoServices.modificarInstrumento({
            id_instrumento,
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
        const {id_instrumento} = req.body;
        const eliminado = await instrumentoServices.borrarInstrumento(Number(id_instrumento));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Obtener una Instrumento
router.get('/', async (_req: Request, res: Response) => {
    const instrumentos = await instrumentoServices.obtieneInstrumento();
    res.send(instrumentos);
});

export default router;