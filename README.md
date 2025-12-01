# Sistema de Monitoramento do Posicionamento de Ônibus 

Este repositório contém a implementação de um sistema IoT para monitorar a passagem de um ônibus por pontos fixos utilizando RFID, NodeMCU ESP8266, backend em Node.js, banco de dados MySQL e um aplicativo mobile em React Native.
O projeto foi desenvolvido para fins acadêmicos na disciplina de Internet das Coisas 

## Estrutura do Projeto 
### IoT (NodeMCU + RFID)
- Lê tags RFID que representam os pontos da rota.
- Envia as leituras ao servidor via Wi-Fi.
### Backend (Node.js + MySQL)
- Recebe e processa as leituras enviadas pelo dispositivo IoT.
- Armazena os registros no banco de dados.
- Disponibiliza uma API REST para consulta pelo aplicativo.
### App (React Native)
- Consome a API via HTTP GET.
- Exibe ao usuário o histórico das passagens do ônibus pelos pontos monitorados.

## Softwares Necessários
- Arduino IDE (para compilar e enviar o código ao NodeMCU)
- MySQL Workbench (para criação e visualização do banco de dados)
- Visual Studio Code (para executar o backend e o aplicativo mobile)
- Navegador (para visualizar as respostas da API e inicialização do app)

## Ajuste Necessários
Antes de enviar o código para o NodeMCU, é necessário configurar manualmente o nome da rede Wi-Fi (SSID) e a senha, além do endereço IP do servidor.
### Código do NodeMCU (Arduino IDE)
1. Arquivo: codigo-rfid-wifi.ino
- const char* ssid = "NOME-DA-REDE";
- const char* password = "SENHA-DA-REDE";
- const char* serverName = "http://SEU-IP:3000/api/leituras";
### App Mobile (Visual Studio Code)
2. arquivo: bus-app/App.js
- const API_URL = "http://SEU-IP:3000/api/leituras";

## Execução do Projeto
### Executar o banco de dados
- Abra o MySQL Workbench.
- Execute o script localizado em: 2. backend/codigo-mysql/busapp-mysql.sql
- O banco será criado com todas as tabelas necessárias.
### Executar o backend (API)
- Abra o Visual Studio Code.
- Carregue a pasta: 2. backend/iot-backend/
- Execute no terminal os comandos:
npm install
npm start
- A API será iniciada em: http://SEU_IP:3000/api/leituras
### Executar o aplicativo mobile
- Abra a pasta no VS Code: /bus-app
- Execute:
npm install
npm start
- O app exibirá a lista de passagens registradas pelo backend.
### Executar dispositivo IoT
- Abra o Arduino IDE.
- Carregue o arquivo: codigo-rfid-wifi.ino
- Clique em Upload.
- O NodeMCU começará a ler as tags RFID e enviar as leituras ao servidor.

## Funcionamento Geral
- O leitor RFID detecta uma tag.
- O NodeMCU envia o UID para o backend.
- O backend registra no MySQL.
- O aplicativo consulta e exibe os dados atualizados.
- O usuário visualiza o histórico de passagens do ônibus.

