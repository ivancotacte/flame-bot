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
    onload: new Array(),
    config: JSON.parse(fs.readFileSync("./config.json", "utf8")),
};

['onCommand', 'onEvents'].forEach(handler => {
    require(`${__dirname}/src/handle/${handler}`)(client);
});

login(loginPath, (err, api) => {
    if (err) return console.error(err);

    for (let i = 0; i < client.onload.length; i++) {
        client.onload[i].onload(api, client);
    }

    api.setOptions({ 
        listenEvents: true,
        selfListen: false,
        online: true,
        forceLogin: true,
        autoMarkDelivery: false,
    });
    
    api.listenMqtt((err, event) => {
        client.events.forEach((value, key) => {
            client.events.get(key).run(api, event, client);
        });

        const check = event.body == undefined;
        if (check) return;

        let args = event.body.trim().split(' ');

        let listCommands = [];
        if(!event.body.startsWith(client.config.prefix)) return;
        args = event.body.slice(client.config.prefix.length).trim().split(' ');
        client.commands.forEach((value, key) => {
            listCommands.push(key);
        });

        if (!listCommands.includes(args[0])) return api.sendMessage('Your command does not exist!!', event.threadID, event.messageID);
        client.commands.get(args[0]).run(api, event, args, client);
    });
});