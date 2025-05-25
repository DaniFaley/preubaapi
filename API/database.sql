--Proyecto finanzas

--Tabla cuentas
CREATE TABLE cuenta (
  id_cuenta INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(40) DEFAULT NULL,
  PRIMARY KEY (id_cuenta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Tabla Categoria_Ingreso
CREATE TABLE categoria_ingreso (
  id_categoria_ingreso INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (id_categoria_ingreso)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Tabla Categoria_Gasto
CREATE TABLE categoria_gasto (
  id_categoria_gasto INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (id_categoria_gasto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Tabla Tipo_Gasto
CREATE TABLE tipo_gasto (
  id_tipo_gasto INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (id_tipo_gasto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Tabla Lugar de gasto
CREATE TABLE lugar_gasto (
  id_lugar_gasto INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(40) DEFAULT NULL,
  PRIMARY KEY (id_lugar_gasto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Tabla Ingreso
CREATE TABLE ingreso (
  id_ingreso INT(11) NOT NULL AUTO_INCREMENT,
  fk_id_cuenta INT(11) NOT NULL,
  fk_id_categoria_ingreso INT(11) NOT NULL,
  descripcion VARCHAR(100) DEFAULT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  fecha_operacion DATE NOT NULL,
  --Primary Key
  PRIMARY KEY (id_ingreso),
  --Forgein Key
  FOREIGN KEY (fk_id_cuenta) REFERENCES cuenta(id_cuenta),
  FOREIGN KEY (fk_id_categoria_ingreso) REFERENCES categoria_ingreso(id_categoria_ingreso)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Tabla Gasto
CREATE TABLE gasto (
  id_gasto INT(11) NOT NULL AUTO_INCREMENT,
  fk_id_cuenta INT(11) NOT NULL,
  fk_id_categoria_gasto INT(11) NOT NULL,
  fk_id_tipo_gasto INT(11) NOT NULL,
  fk_id_lugar_gasto INT(11) NOT NULL,
  descripcion VARCHAR(100) DEFAULT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  fecha_operacion DATE NOT NULL,
  fecha_pago DATE NOT NULL,
  --Primary Key
  PRIMARY KEY (id_gasto),
  --Forgein Key
  FOREIGN KEY (fk_id_cuenta) REFERENCES cuenta(id_cuenta),
  FOREIGN KEY (fk_id_categoria_gasto) REFERENCES categoria_gasto(id_categoria_gasto),
  FOREIGN KEY (fk_id_tipo_gasto) REFERENCES tipo_gasto(id_tipo_gasto),
  FOREIGN KEY (fk_id_lugar_gasto) REFERENCES lugar_gasto(id_lugar_gasto),
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Tabla Transacciones
CREATE TABLE transaccion (
  id_transaccion INT(11) NOT NULL AUTO_INCREMENT,
  fk_id_cuenta_saliente INT(11) NOT NULL,
  fk_id_cuenta_entrante INT(11) NOT NULL,
  descripcion VARCHAR(100) DEFAULT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  fecha DATE NOT NULL,
  --Primary Key
  PRIMARY KEY (id_transaccion),
  --Forgein Key
  FOREIGN KEY (fk_id_cuenta_saliente) REFERENCES cuenta(id_cuenta),
  FOREIGN KEY (fk_id_cuenta_entrante) REFERENCES cuenta(id_cuenta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



--Inversion

--Tabla Tipo_inversion
CREATE TABLE tipo_inversion (
  id_tipo_inversion INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(30) DEFAULT NULL,
  --Primary Key
  PRIMARY KEY (id_tipo_inversion),
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Tabla Instrumento de inversion
CREATE TABLE instrumento (
  id_instrumento INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(30) DEFAULT NULL,
  --Primary Key
  PRIMARY KEY (id_instrumento),
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Tabla portafolio
CREATE TABLE portafolio (
  id_portafolio INT(11) NOT NULL AUTO_INCREMENT,
  fk_id_instrumento INT(11) NOT NULL,
  fk_id_tipo_inversion INT(11) NOT NULL,
  descripcion VARCHAR(50) DEFAULT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  tasa DECIMAL(10, 2) NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_final DATE NOT NULL,
  comprobante VARCHAR(255) DEFAULT NULL,
  --Primary Key
  PRIMARY KEY (id_portafolio),
  --Forgein Key
  FOREIGN KEY (fk_id_tipo_inversion) REFERENCES tipo_inversion(id_tipo_inversion),
  FOREIGN KEY (fk_id_instrumento) REFERENCES instrumento(id_instrumento),
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--Insercciones de prueba
-- Insertar en cuenta
INSERT INTO cuenta (nombre) VALUES 
('Cuenta de Ahorro'),
('Cuenta Corriente'),
('Cuenta de Inversión');

-- Insertar en categoria_ingreso
INSERT INTO categoria_ingreso (nombre) VALUES 
('Salario'),
('Bonos'),
('Regalías');

-- Insertar en categoria_gasto
INSERT INTO categoria_gasto (nombre) VALUES 
('Alimentos'),
('Transporte'),
('Entretenimiento');

-- Insertar en tipo_gasto
INSERT INTO tipo_gasto (nombre) VALUES 
('Fijo'),
('Variable');

-- Insertar en lugar_gasto
INSERT INTO lugar_gasto (nombre) VALUES 
('Supermercado'),
('Gasolinera'),
('Cine');

-- Insertar en ingreso
INSERT INTO ingreso (fk_id_cuenta, fk_id_categoria_ingreso, descripcion, monto, fecha_operacion) VALUES 
(1, 1, 'Pago mensual', 2500.00, '2025-02-01'),
(2, 2, 'Bono de desempeño', 500.00, '2025-02-05');

-- Insertar en gasto
INSERT INTO gasto (fk_id_cuenta, fk_id_categoria_gasto, fk_id_tipo_gasto, fk_id_lugar_gasto, descripcion, monto, fecha_operacion, fecha_pago) VALUES 
(1, 1, 2, 1, 'Compra de víveres', 150.00, '2025-02-03', '2025-02-03'),
(2, 2, 1, 2, 'Gasolina', 50.00, '2025-02-04', '2025-02-04');

-- Insertar en transaccion
INSERT INTO transaccion (fk_id_cuenta_saliente, fk_id_cuenta_entrante, descripcion, monto, fecha) VALUES 
(1, 2, 'Transferencia a cuenta corriente', 200.00, '2025-02-06'),
(2, 3, 'Inversión', 300.00, '2025-02-07');

-- Insertar en tipo_inversion
INSERT INTO tipo_inversion (nombre) VALUES 
('Renta Fija'),
('Renta Variable');

-- Insertar en instrumento
INSERT INTO instrumento (nombre) VALUES 
('Acciones'),
('Bonos del Estado');

-- Insertar en portafolio
INSERT INTO portafolio (fk_id_instrumento, fk_id_tipo_inversion, descripcion, monto, tasa, fecha_inicio, fecha_final, comprobante) VALUES 
(1, 2, 'Inversión en acciones de tecnología', 5000.00, 5.5, '2025-01-01', '2026-01-01', 'comprobante1.pdf'),
(2, 1, 'Inversión en bonos del Estado', 2000.00, 3.0, '2025-01-15', '2027-01-15', 'comprobante2.pdf');

INSERT INTO cuenta (nombre) VALUES 
('Cuenta Ahorro'),
('Cuenta Corriente');

INSERT INTO categoria_ingreso (nombre) VALUES 
('Salario'),
('Freelance');

INSERT INTO categoria_gasto (nombre) VALUES 
('Alimentación'),
('Transporte');

INSERT INTO tipo_gasto (nombre) VALUES 
('Fijo'),
('Variable');

INSERT INTO lugar_gasto (nombre) VALUES 
('Supermercado'),
('Gasolinera');

INSERT INTO ingreso (fk_id_cuenta, fk_id_categoria_ingreso, descripcion, monto, fecha_operacion) VALUES 
(1, 1, 'Pago mensual', 2000.00, '2025-02-01'),
(2, 2, 'Proyecto freelance', 500.00, '2025-02-02');

INSERT INTO gasto (fk_id_cuenta, fk_id_categoria_gasto, fk_id_tipo_gasto, fk_id_lugar_gasto, descripcion, monto, fecha_operacion, fecha_pago) VALUES 
(1, 1, 2, 1, 'Compra de víveres', 150.00, '2025-02-01', '2025-02-01'),
(2, 2, 1, 2, 'Recarga de gasolina', 50.00, '2025-02-02', '2025-02-02');

INSERT INTO transaccion (fk_id_cuenta_saliente, fk_id_cuenta_entrante, descripcion, monto, fecha) VALUES 
(1, 2, 'Transferencia a cuenta corriente', 300.00, '2025-02-03'),
(2, 1, 'Reembolso de gastos', 100.00, '2025-02-04');

INSERT INTO tipo_inversion (nombre) VALUES 
('Bonos'),
('Acciones');

INSERT INTO instrumento (nombre) VALUES 
('ETF SP500'),
('Bonos del Estado');

INSERT INTO portafolio (fk_id_instrumento, fk_id_tipo_inversion, descripcion, monto, tasa, fecha_inicio, fecha_final, comprobante) VALUES 
(1, 2, 'Inversión a largo plazo', 1000.00, 5.00, '2025-01-15', '2030-01-15', 'comprobante1.pdf'),
(2, 1, 'Inversión en bonos', 500.00, 3.50, '2025-01-20', '2030-01-20', 'comprobante2.pdf');


INSERT INTO cuenta (nombre) VALUES 
('Cuenta de Nómina'), 
('Cuenta de Ahorro'), 
('Cuenta Inversiones'), 
('Cuenta Tarjeta de Crédito');

INSERT INTO categoria_ingreso (nombre) VALUES 
('Salario Extra'), 
('Dividendos'), 
('Bonos'), 
('Regalos');

INSERT INTO categoria_gasto (nombre) VALUES 
('Salud'), 
('Educación'), 
('Entretenimiento'), 
('Mantenimiento del hogar');

INSERT INTO tipo_gasto (nombre) VALUES 
('Pago Mensual'), 
('Compra Única'), 
('Suscripción'), 
('Emergencia');

INSERT INTO lugar_gasto (nombre) VALUES 
('Hospital General'), 
('Universidad Nacional'), 
('Cinepolis'), 
('Ferretería La Casa');

INSERT INTO ingreso (fk_id_cuenta, fk_id_categoria_ingreso, descripcion, monto, fecha_operacion) VALUES 
(2, 1, 'Pago extra por horas trabajadas', 1500.00, '2024-02-01'),
(1, 3, 'Bono anual por desempeño', 5000.00, '2024-01-20'),
(3, 2, 'Distribución de dividendos', 2000.00, '2024-01-25');

INSERT INTO gasto (fk_id_cuenta, fk_id_categoria_gasto, fk_id_tipo_gasto, fk_id_lugar_gasto, descripcion, monto, fecha_operacion, fecha_pago) VALUES 
(1, 1, 4, 1, 'Consulta médica', 600.00, '2024-01-15', '2024-01-16'),
(2, 2, 2, 2, 'Pago de matrícula universitaria', 12000.00, '2024-01-10', '2024-01-12'),
(3, 3, 3, 3, 'Membresía anual de cine', 1500.00, '2024-01-18', '2024-01-18');

INSERT INTO transaccion (fk_id_cuenta_saliente, fk_id_cuenta_entrante, descripcion, monto, fecha) VALUES 
(1, 2, 'Transferencia de ahorros', 3000.00, '2024-01-20'),
(2, 3, 'Inversión en fondos', 5000.00, '2024-01-25'),
(3, 1, 'Retiro de inversión', 2000.00, '2024-02-01');

INSERT INTO tipo_inversion (nombre) VALUES 
('Acciones de empresas'), 
('Bonos del gobierno'), 
('Fondos indexados'), 
('Criptomonedas');

INSERT INTO instrumento (nombre) VALUES 
('ETF S&P 500'), 
('Bonos a 10 años'), 
('Bitcoin'), 
('Acciones Tesla');

INSERT INTO portafolio (fk_id_instrumento, fk_id_tipo_inversion, descripcion, monto, tasa, fecha_inicio, fecha_final, comprobante) VALUES 
(1, 3, 'Fondo de inversión pasiva', 10000.00, 7.5, '2023-06-01', '2025-06-01', 'comprobante_fondo.pdf'),
(2, 2, 'Bonos del gobierno a 10 años', 5000.00, 3.0, '2024-01-15', '2034-01-15', 'comprobante_bonos.pdf'),
(3, 4, 'Inversión en Bitcoin', 3000.00, 15.0, '2023-12-10', '2025-12-10', 'comprobante_bitcoin.pdf');
