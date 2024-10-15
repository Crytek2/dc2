const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Események betöltése
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    client.on(event.name, event.execute.bind(null, client));
}

// Parancsok regisztrálása
const commandsDir = path.join(__dirname, 'commands');
const commands = [];

fs.readdirSync(commandsDir).filter(file => file.endsWith('.js')).forEach(file => {
    const command = require(path.join(commandsDir, file));
    commands.push(command.data.toJSON()); // Csak a JSON formátumú adatokat pusholjuk
});

// REST API példány létrehozása
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Parancsok regisztrálása a Discord API-n
(async () => {
    try {
        console.log('Parancsok regisztrálása...');
        
        // Globális parancsok regisztrálása
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        
        console.log('Parancsok sikeresen regisztrálva!');
    } catch (error) {
        console.error('Hiba a parancsok regisztrálása közben:', error);
    }
})();

// Parancsok kezelése
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = commands.find(cmd => cmd.name === interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Hiba történt a parancs végrehajtása során.', ephemeral: true });
    }
});

  client.login(process.env.token);