const { readdirSync } = require("fs");
const path = require('path');

module.exports = (client) => {

    const eventPath = path.join(__dirname, '..', '..', 'modules', 'events');
    const eventFiles = readdirSync(eventPath).filter(file => file.endsWith('.js'));

    let eventCount = 0;
    for (const file of eventFiles) {
        const event = require(path.join(eventPath, file));

        if (!event.config.name) continue;
        if (event.run) {
            eventCount++;
            client.events.set(event.config.name, event);
        }
        if (event.onload) {
            client.onload.push(event);
        }
    }

    console.log(`Successfully loaded ${eventCount} events!!`);

}
