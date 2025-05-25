import express, {Request,Response} from 'express';
import * as categoria_gastoServices from '../services/categoria_gastoServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/categoria_gasto/
router.get('/', async (_req: Request, res: Response)=>{
    let categoria_gasto = await categoria_gastoServices.obtieneCategoriaGasto();
    res.send(categoria_gasto)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/categoria_gasto/1 <------Numero id del personal
router.get('/:id_categoria_gasto', async (req: Request, res: Response)=>{
    let categoria_gasto = await categoria_gastoServices.encuentraCategoriaGasto(Number(req.params.id_categoria_gasto));
    res.send(categoria_gasto);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {nombre} = req.body;
        const nuevo = await categoria_gastoServices.agregarCategoriaGasto({
            nombre
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar la categoria_gasto");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_categoria_gasto,nombre} = req.body;
        const modificado = await categoria_gastoServices.modificarCategoriaGasto({
            id_categoria_gasto,
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
        const {id_categoria_gasto} = req.body;
        const eliminado = await categoria_gastoServices.borrarCategoriaGasto(Number(id_categoria_gasto));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});


//Obtener una categoria de gasto
router.get('/', async (_req: Request, res: Response) => {
    const categorias = await categoria_gastoServices.obtieneCategoriaGasto();
    res.send(categorias);
});

export default router;