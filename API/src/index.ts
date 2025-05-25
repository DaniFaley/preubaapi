import express from 'express';
import cors from 'cors';
//Importar rutas
import cuentaRutas from './routes/cuentaRutas';
import categoria_ingresoRutas from './routes/categoria_ingresoRutas';
import categoria_gastoRutas from './routes/categoria_gastoRutas';
import tipo_gastoRutas from './routes/tipo_gastoRutas';
import lugar_gastoRutas from './routes/lugar_gastoRutas';
import gastoRutas from './routes/gastoRutas';
import ingresoRutas from './routes/ingresoRutas';
import transaccionRutas from './routes/transaccionRutas';
import portafolioRutas from './routes/portafolioRutas';
import instrumentoRutas from './routes/instrumentoRutas';
import tipo_inversionRutas from './routes/tipo_inversionRutas';

// Creamos la aplicación a través de Express
const app = express();

// Configurar middleware para que Express entienda JSON
app.use(express.json());
app.use(cors());

// Importar configuración de variables de entorno
import { PORT } from './config';

// Registrar rutas
app.use('/api/cuenta', cuentaRutas); // Ruta de cuenta
app.use('/api/categoria_ingreso', categoria_ingresoRutas); // Ruta de categoria_ingreso
app.use('/api/categoria_gasto', categoria_gastoRutas); // Ruta de categoria_gasto
app.use('/api/tipo_gasto', tipo_gastoRutas); // Ruta de tipo_gasto
app.use('/api/lugar_gasto', lugar_gastoRutas); // Ruta de lugar_gasto
app.use('/api/gasto', gastoRutas); // Ruta de gasto
app.use('/api/ingreso', ingresoRutas); // Ruta de ingreso
app.use('/api/transaccion', transaccionRutas); // Ruta de transaccion
app.use('/api/portafolio', portafolioRutas); // Ruta de portafolio
app.use('/api/instrumento', instrumentoRutas); // Ruta de portafolio
app.use('/api/tipo_inversion', tipo_inversionRutas); // Ruta de portafolio

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});