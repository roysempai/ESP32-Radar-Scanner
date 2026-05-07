#include <WiFi.h>
#include <WebServer.h>
#include <ESP32Servo.h>

const char* ssid = "Iyad";
const char* password = "12345679";

WebServer server(80);

const int trigPin = 5;
const int echoPin = 18;
const int servoPin = 23;
const int ledPin = 19;

Servo myServo;

int currentAngle = 15;
bool sweepForward = true;

long duration;
int distanceValue;

void handleData() {

  String json = "{";
  json += "\"angle\":" + String(currentAngle) + ",";
  json += "\"distance\":" + String(distanceValue);
  json += "}";

  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", json);
}

void setup() {

  Serial.begin(115200);

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ledPin, OUTPUT);

  myServo.attach(servoPin);

  WiFi.begin(ssid, password);

  Serial.print("Connecting");

  while(WiFi.status() != WL_CONNECTED) {

    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi Connected");

  Serial.print("ESP32 IP Address: ");
  Serial.println(WiFi.localIP());

  server.on("/data", handleData);

  server.begin();
}

void loop() {

  server.handleClient();

  myServo.write(currentAngle);

  delay(30);

  distanceValue = calculateDistance();

  if(distanceValue < 20) {
    digitalWrite(ledPin, HIGH);
  }
  else {
    digitalWrite(ledPin, LOW);
  }

  if(sweepForward)
    currentAngle++;
  else
    currentAngle--;

  if(currentAngle >= 165)
    sweepForward = false;

  if(currentAngle <= 15)
    sweepForward = true;
}

int calculateDistance() {

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);

  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);

  int distance = duration * 0.034 / 2;

  return distance;
}