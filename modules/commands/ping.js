module.exports.config = {
    name: 'ping',
    version: '1.0.0',
    credit: 'test',
    isPrefix: true,
    description: 'Pong!',
    usage: ''
}

module.exports.run = function (api, event, args, client) {
    api.sendMessage("Pong!", event.threadID, event.messageID);
}