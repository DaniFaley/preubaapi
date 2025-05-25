import express, {Request,Response} from 'express';
import * as gastoServices from '../services/gastoServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/gasto/
router.get('/', async (_req: Request, res: Response)=>{
    let gasto = await gastoServices.obtieneGasto();
    res.send(gasto)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/gasto/1 <------Numero id del personal
router.get('/:id_gasto', async (req: Request, res: Response)=>{
    let gasto = await gastoServices.encuentraGasto(Number(req.params.id_gasto));
    res.send(gasto);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar: No se le pone el cmapo id de la tabla
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {fk_id_cuenta,fk_id_categoria_gasto,fk_id_tipo_gasto,fk_id_lugar_gasto,descripcion,monto,fecha_operacion,fecha_pago} = req.body;
        const nuevo = await gastoServices.agregarGasto({
            fk_id_cuenta,
            fk_id_categoria_gasto,
            fk_id_tipo_gasto,
            fk_id_lugar_gasto,
            descripcion,
            monto,
            fecha_operacion,
            fecha_pago
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar la gasto");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos: Se le pone el id de la misma tabla
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_gasto,fk_id_cuenta,fk_id_categoria_gasto,fk_id_tipo_gasto,fk_id_lugar_gasto,descripcion,monto,fecha_operacion,fecha_pago} = req.body;
        const modificado = await gastoServices.modificarGasto({
            id_gasto,
            fk_id_cuenta,
            fk_id_categoria_gasto,
            fk_id_tipo_gasto,
            fk_id_lugar_gasto,
            descripcion,
            monto,
            fecha_operacion,
            fecha_pago
        });
        res.send(modificado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Eliminar un registro.
router.delete('/', async (req: Request, res: Response) => {
    try{
        const {id_gasto} = req.body;
        const eliminado = await gastoServices.borrarGasto(Number(id_gasto));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

export default router;