const { SlashCommandBuilder } = require('discord.js');
const { MinecraftServer } = require('minecraft-server-util');
const { query } = require('steam-server-util');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gamestatus')
        .setDescription('Lekérdezi a játék szerver státuszát')
        .addStringOption(option =>
            option.setName('game')
                .setDescription('A játék neve')
                .setRequired(true)
                .addChoices(
                    { name: 'Minecraft', value: 'minecraft' },
                    { name: 'CS:GO', value: 'csgo' },
                    { name: 'ARK', value: 'ark' }
                ))
        .addStringOption(option =>
            option.setName('ip')
                .setDescription('A szerver IP címe')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('port')
                .setDescription('A szerver portja')
                .setRequired(false)),
    async execute(interaction) {
        const game = interaction.options.getString('game');
        const ip = interaction.options.getString('ip');
        const port = interaction.options.getNumber('port') || 25565; // Alapértelmezett port

        let response;

        try {
            if (game === 'minecraft') {
                const server = new MinecraftServer(ip, port);
                const status = await server.status();
                response = `A(z) **${status.host}** Minecraft szerveren **${status.onlinePlayers}** játékos van fent!`;
            } else if (game === 'csgo') {
                const status = await query(ip, port);
                response = `A(z) **${status.serverName}** CS:GO szerveren **${status.players}** játékos van fent!`;
            } else if (game === 'ark') {
                // Itt implementálhatod az ARK lekérdezést
                response = `ARK szerver státusza: [ide írd a logikát]`;
            }

            await interaction.reply(response);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Hiba történt a szerver lekérdezésekor. Ellenőrizd az IP címet és a portot!', ephemeral: true });
        }
    },
};






//gamestatus game "minecraft/csgo/ark" ip "szerver-ip-címe" [port "szerver-port"]