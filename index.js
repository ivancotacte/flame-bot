const fs = require("fs");
const login = require("./src/fca-unofficial");
require('dotenv').config();

loginPath = { appState: JSON.parse(fs.readFileSync("session.json", "utf8")) };

var client = {
    config: process.env,
    commands: new Map(),
    events: new Map(),
    noprefix: new Map(),
    onload: new Array()
};

['handlerCommand', 'handlerEvent'].forEach(handler => {
    require(`${__dirname}/core/${handler}`)(client);
});

login(loginPath, (err, api) => {
    if (err) return console.error(err);

})