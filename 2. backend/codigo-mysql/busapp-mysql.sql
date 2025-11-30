CREATE DATABASE IF NOT EXISTS bus_monitor;
USE bus_monitor;

CREATE TABLE pontos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tag VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE linhas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(255)
);

CREATE TABLE passagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ponto_id INT NOT NULL,
    linha_id INT NOT NULL,
    horario DATETIME NOT NULL,
    FOREIGN KEY (ponto_id) REFERENCES pontos(id),
    FOREIGN KEY (linha_id) REFERENCES linhas(id)
);

INSERT INTO linhas (nome, descricao) VALUES
('LH 01', 'Seringueiras / Capelasso / São Pedro'),
('LH 02', 'Seringueiras / Capelasso / Bosque dos Ipês'),
('LH 03', 'Bosque dos Ipês / JK / Esperança'),
('LH 04', 'Bosque / Capelasso / Seringueiras'),
('LH 05', 'Riachuelo / BR-364 / Marília Nutri');

INSERT INTO pontos (tag, nome) VALUES
('83CDE11B', 'Capelasso'),
('53A5021C', 'Bosque dos Ipês'),
('23DAD79A', 'Seringueiras'),
('A2E3E121', 'Centro'),
('A2880E21', 'Migrantes');

INSERT INTO passagens (ponto_id, linha_id, horario)
VALUES (1, 1, NOW());

CREATE TABLE IF NOT EXISTS leituras (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tag VARCHAR(50),
  nome VARCHAR(100),
  horario VARCHAR(50),
  data_registro DATETIME
);

ALTER TABLE leituras ADD COLUMN onibus VARCHAR(50);

