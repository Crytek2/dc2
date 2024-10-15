const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('A bot mond valamit egy adott csatornában')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('A csatorna, ahova az üzenetet küldeni szeretnéd')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Az üzenet, amit a bot mondani fog')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const message = interaction.options.getString('message');

        // Ellenőrizd, hogy a botnak van-e jogosultsága üzenetet küldeni a megadott csatornába
        if (!channel.permissionsFor(interaction.guild.me).has('SEND_MESSAGES')) {
            return interaction.reply({ content: 'Nincs jogosultságom üzenetet küldeni ebbe a csatornába!', ephemeral: true });
        }

        await channel.send(message);
        await interaction.reply({ content: `Az üzenet elküldve a(z) ${channel} csatornába!`, ephemeral: true });
    },
};