// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

// ----------------------------------------------------------------
const { Server, Client, Message } = require('node-osc');

// OSCサーバー設定
// 自分
const oscServer = new Server(3333, 'localhost');

// OSCクライアント設定
// ラズパイ
const client = new Client('192.168.2.27', 3334);


// ----------------------------------------------------------------
const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld(
  "oscAPI", {
  send: (_address, _data) => {
    const message = new Message(_address);
    for (let i = 0; i < _data.length; i++) {
      message.append(_data[i]);
    }
    client.send(message);
  },
  receive: (_address, _msg) => {
    let result = [];
    if (_msg[0] === _address) {
      for (let i = 0; i < (_msg.length - 1); i++) {
        result[i] = _msg[i + 1];
      }
    }
    return result;
  },

  setDispatchEvent: () => {
    oscServer.on('message', function (msg) {
      const targetElement = document.getElementById('container');
      targetElement.dispatchEvent(new CustomEvent("osc_rcv", {
        detail: { oscMsg: msg }
      }));
    });
  }
})

