#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN D2
#define RST_PIN D1

MFRC522 rfid(SS_PIN, RST_PIN);

const char* ssid = "444";
const char* password = "12345678";

const char* serverName = "http://10.139.38.181:3000/api/leituras";

void setup() {
  Serial.begin(115200);
  Serial.println("\nIniciando sistema...");

  SPI.begin();
  rfid.PCD_Init();
  Serial.println("RFID inicializado.");

  Serial.print("Conectando ao Wi-Fi: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);
  int tentativas = 0;

  while (WiFi.status() != WL_CONNECTED && tentativas < 20) {
    delay(500);
    Serial.print(".");
    tentativas++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nConectado ao Wi-Fi!");
    Serial.print("IP obtido: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nFalha ao conectar no Wi-Fi!");
  }
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Wi-Fi perdido! Tentando reconectar...");
    WiFi.reconnect();
    delay(2000);
    return;
  }

  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) {
    return;
  }

  String tag = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    tag += String(rfid.uid.uidByte[i] < 0x10 ? "0" : "");
    tag += String(rfid.uid.uidByte[i], HEX);
  }
  tag.toUpperCase();

  Serial.println("Tag detectada: " + tag);

  WiFiClient client;
  HTTPClient http;

  http.begin(client, serverName);
  http.addHeader("Content-Type", "application/json");

  String body = "{\"tag\":\"" + tag + "\"}";
  int httpCode = http.POST(body);

  if (httpCode > 0) {
    Serial.println("Enviado: " + body);
    Serial.println("Resposta HTTP: " + String(httpCode));
  } else {
    Serial.println("Erro HTTP: " + http.errorToString(httpCode));
  }

  http.end();

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();

  delay(1500);
}
