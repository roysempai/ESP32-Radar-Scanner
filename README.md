# ESP32 Radar Scanner

A real-time **ESP32-based Radar Scanner** using an **HC-SR04 Ultrasonic Sensor** and **Servo Motor** to detect nearby objects through 180° scanning.  
The project simulates a radar system by continuously rotating the ultrasonic sensor and measuring object distance in real time.

---

## Features

- 180° radar-style scanning
- Real-time object detection
- Ultrasonic distance measurement
- Servo-based directional sensing
- Embedded systems integration
- Serial Monitor visualization
- ESP32-powered embedded control

---

## Components Used

| Component | Quantity |
|---|---|
| ESP32 Dev Board | 1 |
| HC-SR04 Ultrasonic Sensor | 1 |
| Servo Motor (SG90/MG90S) | 1 |
| LED | 1 |
| Jumper Wires | As required |
| Breadboard | 1 |

---

## Circuit Connections

| ESP32 Pin | Component |
|---|---|
| GPIO 5 | Ultrasonic Trigger |
| GPIO 18 | Ultrasonic Echo |
| GPIO 19 | LED |
| GPIO 23 | Servo Signal |
| 5V | Servo + Ultrasonic VCC |
| GND | Common Ground |

---

## Working Principle

1. The servo motor rotates from **0° to 180°**.
2. At each angle, the ultrasonic sensor measures distance.
3. The ESP32 processes the readings in real time.
4. Objects within range are detected and displayed through serial output.
5. The LED can indicate nearby object presence.

---

## Technologies Used

- ESP32
- Embedded C/C++
- Arduino IDE
- HC-SR04 Ultrasonic Sensor
- Servo Motor Control
- Sensor Interfacing

---

## Project Structure

```bash
ESP32-Radar-Scanner/
│
├── images/
│   ├── radar1.jpg
│   ├── radar2.jpg
│   └── radar3.jpg
│
├── ESP32_Radar.ino
├── README.md
└── circuit_diagram.png
```

---

## Preview

<p align="center">
  <img src="images/radar1.jpg" width="600"/>
</p>

<p align="center">
  <img src="images/radar2.jpg" width="600"/>
</p>

<p align="center">
  <img src="images/radar3.jpg" width="600"/>
</p>

---

## Code

```cpp
#include <ESP32Servo.h>

const int trigPin = 5;
const int echoPin = 18;
const int ledPin = 19;
const int servoPin = 23;

long duration;
int distance;

Servo myServo;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ledPin, OUTPUT);

  Serial.begin(115200);

  myServo.attach(servoPin, 500, 2400);
}

void loop() {

  for (int angle = 0; angle <= 180; angle++) {

    myServo.write(angle);

    delay(15);

    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);

    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);

    digitalWrite(trigPin, LOW);

    duration = pulseIn(echoPin, HIGH);

    distance = duration * 0.034 / 2;

    Serial.print("Angle: ");
    Serial.print(angle);

    Serial.print(" | Distance: ");
    Serial.print(distance);
    Serial.println(" cm");

    if (distance < 20) {
      digitalWrite(ledPin, HIGH);
    } else {
      digitalWrite(ledPin, LOW);
    }
  }

  for (int angle = 180; angle >= 0; angle--) {

    myServo.write(angle);

    delay(15);

    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);

    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);

    digitalWrite(trigPin, LOW);

    duration = pulseIn(echoPin, HIGH);

    distance = duration * 0.034 / 2;

    Serial.print("Angle: ");
    Serial.print(angle);

    Serial.print(" | Distance: ");
    Serial.print(distance);
    Serial.println(" cm");

    if (distance < 20) {
      digitalWrite(ledPin, HIGH);
    } else {
      digitalWrite(ledPin, LOW);
    }
  }
}
```

---

## Applications

- Obstacle detection systems
- Robotics navigation
- Smart surveillance systems
- Radar simulation projects
- Embedded systems learning
- IoT prototyping

---

## Future Improvements

- OLED radar visualization
- Web dashboard integration
- WiFi-based monitoring
- Real radar-style graphical interface
- Buzzer alerts
- Mobile app connectivity

---

## Author

### Dipaditya Roy

ECE Student | Embedded Systems & Digital Logic Enthusiast

- GitHub: https://github.com/roysempai

---

## License

This project is open-source and available under the MIT License.