const fs = require("fs");
const login = require("./src/fca-unofficial");
require('dotenv').config();

loginPath = { appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) };

var client = {
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