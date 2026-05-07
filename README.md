# 🚀 ESP32 Radar Scanner

A futuristic **ESP32-based Radar Scanner** using an **HC-SR04 Ultrasonic Sensor**, **Servo Motor**, and a **real-time military-style web dashboard** for live object detection and radar visualization.

The project simulates a real radar system by continuously rotating the ultrasonic sensor and transmitting live angle and distance data over WiFi to a responsive web interface.

---

# 📸 Project Showcase

## 🛰 Radar Dashboard

<p align="center">
  <img src="images/radar_ui.jpeg" width="900"/>
</p>

---

## 🔧 Hardware Setup

<p align="center">
  <img src="images/project_setup.jpeg" width="700"/>
</p>

---

## 🎯 Detection Demo

<p align="center">
  <img src="images/detection_demo.jpeg" width="700"/>
</p>

---

## 🔌 Circuit Diagram

<p align="center">
  <img src="images/circuit_diagram.png" width="900"/>
</p>

---

# ⚡ Features

✅ 180° radar scanning  
✅ Real-time object detection  
✅ WiFi-based live monitoring  
✅ Military-style HUD dashboard  
✅ Radar sweep fading effect  
✅ Red glowing target indicators  
✅ Detection logs  
✅ Ultrasonic distance measurement  
✅ Servo-based directional sensing  
✅ Embedded systems + IoT integration  

---

# 🛠 Components Used

| Component | Quantity |
|---|---|
| ESP32 Dev Board | 1 |
| HC-SR04 Ultrasonic Sensor | 1 |
| SG90 Servo Motor | 1 |
| LED | 1 |
| Jumper Wires | As required |
| Breadboard | 1 |

---

# 🔌 Circuit Connections

| ESP32 Pin | Component |
|---|---|
| GPIO 5 | Ultrasonic Trigger |
| GPIO 18 | Ultrasonic Echo |
| GPIO 19 | LED |
| GPIO 23 | Servo Signal |
| 5V | Servo + Ultrasonic VCC |
| GND | Common Ground |

---

# 🌐 System Architecture

```text
HC-SR04 Sensor
        ↓
ESP32 Processes Distance Data
        ↓
Servo Rotates Radar
        ↓
ESP32 Creates JSON API
        ↓
Website Fetches Live Data
        ↓
Radar HUD Displays Objects
```

---

# 📂 Project Structure

```text
ESP32-Radar-Scanner/
│
├── esp32_firmware/
│   └── esp32_radar_scanner.ino
│
├── website/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── images/
│   ├── project_setup.jpeg
│   ├── radar_ui.jpeg
│   ├── detection_demo.jpeg
│   ├── serial_monitor.jpeg
│   └── circuit_diagram.png
│
├── README.md
└── LICENSE
```

---

# 🧠 Working Principle

1. The servo motor rotates from **15° to 165°** continuously.
2. At each angle, the HC-SR04 sensor measures object distance.
3. ESP32 processes angle + distance values in real time.
4. ESP32 hosts a live JSON API over WiFi.
5. The website fetches radar data continuously.
6. JavaScript updates the radar dashboard dynamically.
7. Nearby objects appear as glowing red targets on the HUD interface.

---

# 📡 API Response

```json
{
  "angle": 53,
  "distance": 28
}
```

---

# 💻 Technologies Used

| Layer | Technology |
|---|---|
| Embedded | Arduino C++ |
| Microcontroller | ESP32 |
| Networking | WiFi HTTP |
| Frontend | HTML/CSS/JavaScript |
| Visualization | Canvas API |
| IDE | Arduino IDE + VS Code |

---

# 🚀 Installation & Setup

## 1️⃣ Upload ESP32 Firmware

Open:

```text
esp32_firmware/esp32_radar_scanner.ino
```

in Arduino IDE.

Install library:

```text
ESP32Servo
```

Update WiFi credentials:

```cpp
const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";
```

Upload code to ESP32.

---

## 2️⃣ Get ESP32 IP Address

Open Serial Monitor:

```text
115200 baud
```

You’ll see:

```text
WiFi Connected
ESP32 IP Address: 192.168.X.X
```

---

## 3️⃣ Configure Website

Inside:

```text
website/script.js
```

Replace:

```javascript
fetch("http://YOUR_ESP32_IP/data")
```

with your ESP32 IP.

Example:

```javascript
fetch("http://192.168.1.5/data")
```

---

## 4️⃣ Run Website

Open `website` folder in VS Code.

Install extension:

```text
Live Server
```

Right click:

```text
index.html
```

→ Open with Live Server

---

# 🔥 Future Improvements

- ESP32-CAM integration
- AI object classification
- OLED radar visualization
- Cloud dashboard
- MQTT communication
- WebSocket streaming
- Mobile app monitoring
- Voice alerts
- 3D radar visualization

---

# 🏆 Applications

- Obstacle detection systems
- Robotics navigation
- Smart surveillance systems
- Radar simulation projects
- Embedded systems learning
- IoT prototyping
- Real-time visualization systems

---

# 👨‍💻 Author

## Dipaditya Roy

ECE Student | Embedded Systems & IoT Enthusiast

### Connect with me

- GitHub: [roysempai](https://github.com/roysempai?utm_source=chatgpt.com)

---

# 📜 License

This project is open-source and available under the MIT License.