const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Bejelentkezve mint: ${client.user.tag}`);

        const logChannelId = "1295560562939400223"; // Cseréld ki a log csatorna ID-jára

        // Csatorna lekérése
        const logChannel = await client.channels.fetch(logChannelId).catch(error => {
            console.error('Hiba a csatorna lekérésekor:', error);
            return null; // Ha hiba történik, térjünk vissza nullával
        });

        if (!logChannel || logChannel.type !== 'GUILD_TEXT') {
            console.error('Log channel not found or is not a text channel.');
            return; // Ne folytassa, ha a csatorna nem található
        }

        await logChannel.send(`Bot bejelentkezve: **${client.user.tag}**`);

        // Kiírja az elérhető parancsokat
        const commandList = [];
        client.commands.forEach(command => {
            commandList.push(`${command.data.name} - Betöltve ✔️`);
        });

        // Ellenőrzi, ha vannak parancsok
        if (commandList.length > 0) {
            await logChannel.send(`Elérhető parancsok:\n${commandList.join('\n')}`);
        } else {
            await logChannel.send('Nincsenek elérhető parancsok.');
        }
    },
};