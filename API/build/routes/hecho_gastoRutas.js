"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hecho_gastoServices = __importStar(require("../services/hecho_gastoServices"));
//Activamos las rutas
const router = express_1.default.Router();
//Rutas
//Para mostrar todos los registros
//http://localhost:3001/api/hecho_gasto/
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hecho_gasto = yield hecho_gastoServices.obtieneHechoGasto();
    res.send(hecho_gasto);
}));
//Para mostrar un registro en especifico
//http://localhost:3001/api/hecho_gasto/1 <------Numero id del personal
router.get('/:id_hecho_gasto', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hecho_gasto = yield hecho_gastoServices.encuentraHechoGasto(Number(req.params.id_hecho_gasto));
    res.send(hecho_gasto);
}));
//Para insertar
//Rutas para hacer insercciones: Post es para insertar
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.body;
        const nuevo = yield hecho_gastoServices.agregarHechoGasto({
            nombre
        });
        res.send(nuevo);
    }
    catch (e) {
        res.send("No se puede agregar la hecho_gasto");
        // res.status(400).send('Error en los datos');
    }
}));
//Para modificar datos
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_hecho_gasto, nombre } = req.body;
        const modificado = yield hecho_gastoServices.modificarHechoGasto({
            id_hecho_gasto,
            nombre
        });
        res.send(modificado);
    }
    catch (e) {
        res.status(400).send("Error en los datos");
    }
}));
//Eliminar un registro.
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_hecho_gasto } = req.body;
        const eliminado = yield hecho_gastoServices.borrarHechoGasto(Number(id_hecho_gasto));
        res.send(eliminado);
    }
    catch (e) {
        res.status(400).send("Error en los datos");
    }
}));
//Obtener una cuenta
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hecho_gastos = yield hecho_gastoServices.obtieneHechoGasto();
    res.send(hecho_gastos);
}));
exports.default = router;
