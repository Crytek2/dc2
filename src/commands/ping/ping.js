const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Visszaadja a ping értékét!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};