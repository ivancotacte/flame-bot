const fs = require("fs");
const login = require("./src/fca-unofficial");
require('dotenv').config();

const proxy = {
    protocol: 'https',
    host: '35.185.196.38',
    port: 3128,
    type: 'https',
    anonymityLevel: 'elite',
    country: 'United States',
    city: 'The Dalles',
    hostname: '35.185.196.38',
};

const local = {
    timezone: 'Asia/Manila',
    region: 'ph',
    headers: {
        'X-Facebook-Locale': 'en_US',
        'X-Facebook-Timezone': 'Asia/Manila',
        'X-Fb-Connection-Quality': 'EXCELLENT',
    },
};

const loginPath = { appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")), proxy: proxy, local: local };

const client = {
    commands: new Map(),
    events: new Map(),
    noprefix: new Map(),
    onload: new Array()
};

['handlerCommand', 'handlerEvent'].forEach(handler => {
});

login(loginPath, (err, api) => {
    if (err) return console.error(err);
})