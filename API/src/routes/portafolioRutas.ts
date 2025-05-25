import express, {Request,Response} from 'express';
import * as portafolioServices from '../services/portafolioServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/portafolio/
router.get('/', async (_req: Request, res: Response)=>{
    let portafolio = await portafolioServices.obtienePortafolio();
    res.send(portafolio)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/portafolio/1 <------Numero id del personal
router.get('/:id_portafolio', async (req: Request, res: Response)=>{
    let portafolio = await portafolioServices.encuentraPortafolio(Number(req.params.id_portafolio));
    res.send(portafolio);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar: No se le pone el campo id de la tabla
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {fk_id_instrumento, fk_id_tipo_inversion, descripcion, monto, tasa, fecha_inicio, fecha_final, comprobante
        } = req.body;
        const nuevo = await portafolioServices.agregarPortafolio({ 
            fk_id_instrumento, 
            fk_id_tipo_inversion, 
            descripcion, 
            monto, 
            tasa, 
            fecha_inicio, 
            fecha_final, 
            comprobante
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar la portafolio");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos: Se le pone el id de la misma tabla
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_portafolio, fk_id_instrumento, fk_id_tipo_inversion, descripcion, monto, tasa, fecha_inicio, fecha_final, comprobante
        } = req.body;
        const modificado = await portafolioServices.modificarPortafolio({
            id_portafolio,
            fk_id_instrumento, 
            fk_id_tipo_inversion, 
            descripcion, 
            monto, 
            tasa, 
            fecha_inicio, 
            fecha_final, 
            comprobante
        });
        res.send(modificado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Eliminar un registro.
router.delete('/', async (req: Request, res: Response) => {
    try{
        const {id_portafolio} = req.body;
        const eliminado = await portafolioServices.borrarPortafolio(Number(id_portafolio));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});


export default router;