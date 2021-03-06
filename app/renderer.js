// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.


const s = (p) => {
    // OSCのAPI(preload.jsでcontextBridgeとして定義)
    let oscAPI = window.oscAPI;
    let osc_sensor = [];

    p.preload = () => {
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
    }
    p.draw = () => {
        p.background(0, 0, 0);

    }
    p.osc_parse = () => {
        // for (let i = 0; i < osc_sensor.length; i++) {
        // if (osc_sensor[i] > 2000) osc_sensor[i] = 0;
        // }
    }
    p.mousePressed = () => {
    }
    p.keyPressed = () => {
    }

    // OSCデータを受信する
    p.oscReceive = (msg) => {
        let data = oscAPI.receive("/sensor", msg);
        osc_sensor[0] = data[0];
        osc_sensor[1] = data[1];
        osc_sensor[2] = data[2];
        osc_sensor[3] = data[3];
        console.log(data);
    }
}

const container = document.getElementById('container');
const p5app = new p5(s, container)

// OSC受信イベントがあったとき、
// p5js内の「oscReceive」関数に、oscMsgを引数として渡す
container.addEventListener("osc_rcv", (event) => {
    p5app.oscReceive(event.detail.oscMsg);
});

// OSC受信イベントをセットする
window.oscAPI.setDispatchEvent();

// OSCデータを送信する
// oscAPI.send('/test', [p.mouseX, p.mouseY]);

