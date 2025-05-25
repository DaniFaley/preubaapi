import express, {Request,Response} from 'express';
import * as categoria_ingresoServices from '../services/categoria_ingresoServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/categoria_ingreso/
router.get('/', async (_req: Request, res: Response)=>{
    let categoria_ingreso = await categoria_ingresoServices.obtieneCategoriaIngreso();
    res.send(categoria_ingreso)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/categoria_ingreso/1 <------Numero id del personal
router.get('/:id_categoria_ingreso', async (req: Request, res: Response)=>{
    let categoria_ingreso = await categoria_ingresoServices.encuentraCategoriaIngreso(Number(req.params.id_categoria_ingreso));
    res.send(categoria_ingreso);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {nombre} = req.body;
        const nuevo = await categoria_ingresoServices.agregarCategoriaIngreso({
            nombre
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar la categoria_ingreso");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_categoria_ingreso,nombre} = req.body;
        const modificado = await categoria_ingresoServices.modificarCategoriaIngreso({
            id_categoria_ingreso,
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
        const {id_categoria_ingreso} = req.body;
        const eliminado = await categoria_ingresoServices.borrarCategoriaIngreso(Number(id_categoria_ingreso));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Obtener una categoria de ingreso
router.get('/', async (_req: Request, res: Response) => {
    const categorias = await categoria_ingresoServices.obtieneCategoriaIngreso();
    res.send(categorias);
});


export default router;