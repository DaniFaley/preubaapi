import express, {Request,Response} from 'express';
import * as tipo_inversionServices from '../services/tipo_inversionServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/tipo_inversion/
router.get('/', async (_req: Request, res: Response)=>{
    let tipo_inversion = await tipo_inversionServices.obtieneTipo_inversion();
    res.send(tipo_inversion)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/tipo_inversion/1 <------Numero id del personal
router.get('/:id_tipo_inversion', async (req: Request, res: Response)=>{
    let tipo_inversion = await tipo_inversionServices.encuentraTipo_inversion(Number(req.params.id_tipo_inversion));
    res.send(tipo_inversion);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar: No se le pone el campo id de la tabla
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {nombre} = req.body;
        const nuevo = await tipo_inversionServices.agregarTipo_inversion({ 
            nombre
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar la tipo_inversion");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos: Se le pone el id de la misma tabla
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_tipo_inversion, nombre} = req.body;
        const modificado = await tipo_inversionServices.modificarTipo_inversion({
            id_tipo_inversion,
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
        const {id_tipo_inversion} = req.body;
        const eliminado = await tipo_inversionServices.borrarTipo_inversion(Number(id_tipo_inversion));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Obtener una Tipo_inversion
router.get('/', async (_req: Request, res: Response) => {
    const tipo_inversiones = await tipo_inversionServices.obtieneTipo_inversion();
    res.send(tipo_inversiones);
});


export default router;