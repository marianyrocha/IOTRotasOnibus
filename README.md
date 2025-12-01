# Sistema de Monitoramento do Posicionamento de Ônibus 

Este repositório contém a implementação de um sistema IoT para monitorar a passagem de um ônibus por pontos fixos utilizando RFID, NodeMCU ESP8266, backend em Node.js, banco de dados MySQL e um aplicativo mobile em React Native.
O projeto foi desenvolvido para fins acadêmicos na disciplina de Internet das Coisas 

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

### Softwares necessários para executar o projeto
- Arduino IDE (para compilar e enviar o código ao NodeMCU)
- MySQL Workbench (para criação e visualização do banco de dados)
- Visual Studio Code (para executar o backend e o aplicativo mobile)
- Navegador (para visualizar as respostas da API e inicialização do app)

### Ajuste necessários do endereço IP e WIFI

Antes de enviar o código para o NodeMCU, é necessário configurar manualmente o nome da rede Wi-Fi (SSID) e a senha, além do endereço IP do servidor.

#### Código do NodeMCU (Arduino IDE)
1. Arquivo: codigo-rfid-wifi.ino
- const char* ssid = "NOME-DA-REDE";
- const char* password = "SENHA-DA-REDE";
- const char* serverName = "http://SEU-IP:3000/api/leituras";

#### App Mobile (Visual Studio Code)
2. arquivo: bus-app/App.js
- const API_URL = "http://SEU-IP:3000/api/leituras";
