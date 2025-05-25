import express, {Request,Response} from 'express';
import * as cuentaServices from '../services/cuentaServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/cuenta/
router.get('/', async (_req: Request, res: Response)=>{
    let cuenta = await cuentaServices.obtieneCuenta();
    res.send(cuenta)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/cuenta/1 <------Numero id del personal
router.get('/:id_cuenta', async (req: Request, res: Response)=>{
    let cuenta = await cuentaServices.encuentraCuenta(Number(req.params.id_cuenta));
    res.send(cuenta);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {nombre} = req.body;
        const nuevo = await cuentaServices.agregarCuenta({
            nombre
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar la cuenta");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_cuenta,nombre} = req.body;
        const modificado = await cuentaServices.modificarCuenta({
            id_cuenta,
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
        const {id_cuenta} = req.body;
        const eliminado = await cuentaServices.borrarCuenta(Number(id_cuenta));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Obtener una cuenta
router.get('/', async (_req: Request, res: Response) => {
    const cuentas = await cuentaServices.obtieneCuenta();
    res.send(cuentas);
});

export default router;