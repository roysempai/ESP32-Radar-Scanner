const canvas = document.getElementById("radarCanvas");
const ctx = canvas.getContext("2d");

const angleText = document.getElementById("angle");
const distanceText = document.getElementById("distance");
const logList = document.getElementById("logList");

let angle = 0;
let distance = 0;

const centerX = 450;
const centerY = 600;
const radarRadius = 420;

let trail = [];
let detections = [];

function drawRadar() {

    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, 0, 900, 650);

    drawGrid();
    drawSweep();
    drawObjects();
}

function drawGrid() {

    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 2;

    for (let r = 80; r <= 400; r += 80) {

        ctx.beginPath();
        ctx.arc(centerX, centerY, r, Math.PI, 2 * Math.PI);
        ctx.stroke();

        ctx.fillStyle = "#00ff00";
        ctx.font = "16px Arial";

        ctx.fillText((r / 4) + " cm", centerX + r - 40, centerY - 10);
    }

    for (let a = 0; a <= 180; a += 15) {

        let rad = a * Math.PI / 180;

        let x = centerX + radarRadius * Math.cos(rad);
        let y = centerY - radarRadius * Math.sin(rad);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.fillText(a + "°", x - 10, y - 10);
    }
}

function drawSweep() {

    let rad = angle * Math.PI / 180;

    let x = centerX + radarRadius * Math.cos(rad);
    let y = centerY - radarRadius * Math.sin(rad);

    trail.push({ x, y });

    if (trail.length > 25) {
        trail.shift();
    }

    for (let i = 0; i < trail.length; i++) {

        let alpha = i / trail.length;

        ctx.strokeStyle = "rgba(0,255,0," + alpha + ")";
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.stroke();
    }

    ctx.shadowBlur = 30;
    ctx.shadowColor = "#00ff00";

    ctx.strokeStyle = "#7CFC00";
    ctx.lineWidth = 7;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.shadowBlur = 0;
}

function drawObjects() {

    if (distance < 100) {

        let rad = angle * Math.PI / 180;

        let objX = centerX + distance * 4 * Math.cos(rad);
        let objY = centerY - distance * 4 * Math.sin(rad);

        detections.push({
            x: objX,
            y: objY,
            d: distance,
            a: angle
        });

        if (detections.length > 8) {
            detections.shift();
        }
    }

    detections.forEach(obj => {

        ctx.shadowBlur = 25;
        ctx.shadowColor = "red";

        ctx.fillStyle = "red";

        ctx.beginPath();
        ctx.arc(obj.x, obj.y, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        ctx.fillStyle = "#ff4444";
        ctx.font = "18px Arial";

        ctx.fillText(obj.d + " cm", obj.x + 15, obj.y);
    });
}

async function getData() {

    try {

        const response = await fetch("http://YOUR_ESP32_IP/data");

        const data = await response.json();

        angle = data.angle;
        distance = data.distance;

        angleText.innerHTML = angle + "°";
        distanceText.innerHTML = distance + " cm";

        if (distance < 100) {

            let li = document.createElement("li");

            li.innerHTML = "● " + angle + "° → " + distance + " cm";

            logList.prepend(li);

            if (logList.children.length > 5) {
                logList.removeChild(logList.lastChild);
            }
        }

        drawRadar();

    } catch (error) {
        console.log(error);
    }
}

setInterval(getData, 50);
