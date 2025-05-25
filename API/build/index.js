"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//Importar rutas
const cuentaRutas_1 = __importDefault(require("./routes/cuentaRutas"));
const categoria_ingresoRutas_1 = __importDefault(require("./routes/categoria_ingresoRutas"));
const categoria_gastoRutas_1 = __importDefault(require("./routes/categoria_gastoRutas"));
const tipo_gastoRutas_1 = __importDefault(require("./routes/tipo_gastoRutas"));
const lugar_gastoRutas_1 = __importDefault(require("./routes/lugar_gastoRutas"));
const gastoRutas_1 = __importDefault(require("./routes/gastoRutas"));
const ingresoRutas_1 = __importDefault(require("./routes/ingresoRutas"));
const transaccionRutas_1 = __importDefault(require("./routes/transaccionRutas"));
const portafolioRutas_1 = __importDefault(require("./routes/portafolioRutas"));
const instrumentoRutas_1 = __importDefault(require("./routes/instrumentoRutas"));
const tipo_inversionRutas_1 = __importDefault(require("./routes/tipo_inversionRutas"));
// Creamos la aplicación a través de Express
const app = (0, express_1.default)();
// Configurar middleware para que Express entienda JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Puerto para escuchar la petición del frontend
const PUERTO = 3001;
// Registrar rutas
app.use('/api/cuenta', cuentaRutas_1.default); // Ruta de cuenta
app.use('/api/categoria_ingreso', categoria_ingresoRutas_1.default); // Ruta de categoria_ingreso
app.use('/api/categoria_gasto', categoria_gastoRutas_1.default); // Ruta de categoria_gasto
app.use('/api/tipo_gasto', tipo_gastoRutas_1.default); // Ruta de tipo_gasto
app.use('/api/lugar_gasto', lugar_gastoRutas_1.default); // Ruta de lugar_gasto
app.use('/api/gasto', gastoRutas_1.default); // Ruta de gasto
app.use('/api/ingreso', ingresoRutas_1.default); // Ruta de ingreso
app.use('/api/transaccion', transaccionRutas_1.default); // Ruta de transaccion
app.use('/api/portafolio', portafolioRutas_1.default); // Ruta de portafolio
app.use('/api/instrumento', instrumentoRutas_1.default); // Ruta de portafolio
app.use('/api/tipo_inversion', tipo_inversionRutas_1.default); // Ruta de portafolio
// Iniciar el servidor
app.listen(PUERTO, () => {
    console.log(`Servidor en ejecución y escuchando el puerto ${PUERTO}`);
});
