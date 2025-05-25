import express, {Request,Response} from 'express';
import * as ingresoServices from '../services/ingresoServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/ingreso/
router.get('/', async (_req: Request, res: Response)=>{
    let ingreso = await ingresoServices.obtieneIngreso();
    res.send(ingreso)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/ingreso/1 <------Numero id del personal
router.get('/:id_ingreso', async (req: Request, res: Response)=>{
    let ingreso = await ingresoServices.encuentraIngreso(Number(req.params.id_ingreso));
    res.send(ingreso);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar: No se le pone el campo id de la tabla
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {fk_id_cuenta,fk_id_categoria_ingreso,descripcion,monto,fecha_operacion} = req.body;
        const nuevo = await ingresoServices.agregarIngreso({
            fk_id_cuenta,
            fk_id_categoria_ingreso,
            descripcion,
            monto,
            fecha_operacion
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar la ingreso");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos: Se le pone el id de la misma tabla
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_ingreso,fk_id_cuenta,fk_id_categoria_ingreso,descripcion,monto,fecha_operacion} = req.body;
        const modificado = await ingresoServices.modificarIngreso({
            id_ingreso,
            fk_id_cuenta,
            fk_id_categoria_ingreso,
            descripcion,
            monto,
            fecha_operacion
        });
        res.send(modificado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Eliminar un registro.
router.delete('/', async (req: Request, res: Response) => {
    try{
        const {id_ingreso} = req.body;
        const eliminado = await ingresoServices.borrarIngreso(Number(id_ingreso));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

export default router;