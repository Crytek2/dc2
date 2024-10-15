const { Collection } = require('discord.js');
const fs = require('fs');

module.exports = async (client, path) => {
    client.commands = new Collection();

    const commandFiles = fs.readdirSync(path).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        try {
            const command = require(`${path}/${file}`);
            client.commands.set(command.data.name, command);
            console.log(`Parancs: **${command.data.name}** - Betöltve ✔️`);
        } catch (error) {
            console.error(`Hiba a(z) ${file} fájl betöltésekor: ${error.message}`);
            const logChannel = client.channels.cache.get('1081239239582294127'); // Cseréld ki a log csatorna ID-jára
            if (logChannel) {
                await logChannel.send(`Hiba a(z) ${file} fájl betöltésekor: \`${error.message}\``);
            }
        }
    }
};