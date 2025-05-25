import express, {Request,Response} from 'express';
import * as transaccionServices from '../services/transaccionServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/transaccion/
router.get('/', async (_req: Request, res: Response)=>{
    let transaccion = await transaccionServices.obtieneTransaccion();
    res.send(transaccion)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/transaccion/1 <------Numero id del personal
router.get('/:id_transaccion', async (req: Request, res: Response)=>{
    let transaccion = await transaccionServices.encuentraTransaccion(Number(req.params.id_transaccion));
    res.send(transaccion);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar: No se le pone el campo id de la tabla
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {fk_id_cuenta_saliente,fk_id_cuenta_entrante,descripcion,monto,fecha} = req.body;
        const nuevo = await transaccionServices.agregarTransaccion({
            fk_id_cuenta_saliente,
            fk_id_cuenta_entrante,
            descripcion,
            monto,
            fecha
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar la transaccion");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos: Se le pone el id de la misma tabla
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_transaccion,fk_id_cuenta_saliente,fk_id_cuenta_entrante,descripcion,monto,fecha} = req.body;
        const modificado = await transaccionServices.modificarTransaccion({
            id_transaccion,
            fk_id_cuenta_saliente,
            fk_id_cuenta_entrante,
            descripcion,
            monto,
            fecha
        });
        res.send(modificado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Eliminar un registro.
router.delete('/', async (req: Request, res: Response) => {
    try{
        const {id_transaccion} = req.body;
        const eliminado = await transaccionServices.borrarTransaccion(Number(id_transaccion));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

export default router;