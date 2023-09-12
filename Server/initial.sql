CREATE TABLE tipo_documento (
	id INT PRIMARY KEY IDENTITY(1,1),
	tipo NVARCHAR(MAX)
);

CREATE TABLE ciudadano (
    id INT PRIMARY KEY IDENTITY(1,1),
    tipo_documento_id INT, 
    numero_documento INT,
    nombres NVARCHAR(MAX),
    apellidos NVARCHAR(MAX),
    fecha_nacimiento DATETIME,
    profesion NVARCHAR(MAX),
    aspiracion_salarial FLOAT,
    e_mail NVARCHAR(MAX),
    FOREIGN KEY (tipo_documento_id) REFERENCES tipo_documento(id)
);

CREATE TABLE vacante (
    id INT PRIMARY KEY IDENTITY(1,1),
    codigo NVARCHAR(255),
    cargo NVARCHAR(MAX),
    descripcion NVARCHAR(MAX),
    empresa NVARCHAR(MAX),
    salario FLOAT,
    ciudadano_id INT,
    estado NVARCHAR(50) DEFAULT 'libre',
    CONSTRAINT UQ_Codigo UNIQUE (codigo)
);

SELECT * from vacante v join ciudadano c on v.ciudadano_id = c.numero_documento;

INSERT INTO tipo_documento (tipo) 
VALUES
('Cédula de Ciudadanía'),
('Cédula de Extranjería'),
('Pasaporte'),
('Visa');

INSERT INTO vacante (codigo, cargo, descripcion, empresa, salario, ciudadano_id) 
VALUES
('RS001', 'Ingeniero Industrial', 'Industrial con mínimo 2 años de experiencia en Salud Ocupacional', 'EPM', 2500000, 0),
('RS002', 'Profesor de Química', 'Química con mínimo 3 años de experiencia en docencia.', 'INSTITUCIÓN EDUCATIVA IES', 1900000, 0),
('RS003', 'Ingeniero de Desarrollo Junior', 'Ingeniero de Sistemas con mínimo 1 año de experiencia en Desarrollo de Software en tecnología JAVA.', 'XRM SERVICES', 2600000, 0),
('RS004', 'Coordinador de Mercadeo', 'Mercadeo con estudios Tecnológicos graduado y experiencia mínima de un año.', 'INSERCOL', 1350000, 0),
('RS005', 'Profesor de Matemáticas', 'Licenciado en Matemáticas o Ingeniero con mínimo 2 años de experiencia en docencia.', 'SENA', 1750000, 0),
('RS006', 'Mensajero', 'Mensajero con moto, con documentos al día y buenas relaciones personales', 'SERVIENTREGA', 950000, 0),
('RS007', 'Cajero', 'Cajero para almacén de cadena con experiencia mínima de un año, debe disponer de tiempo por cambios de turnos.', 'ALMACENES ÉXITO', 850000, 0);