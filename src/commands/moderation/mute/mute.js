const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a user in the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to mute')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');

        if (!interaction.member.permissions.has('MuteMembers')) {
            return interaction.reply({ content: 'You do not have permission to mute members.', ephemeral: true });
        }

        const member = interaction.guild.members.cache.get(user.id);
        await member.voice.setMute(true);
        await interaction.reply({ content: `${user.tag} has been muted.` });
    },
};