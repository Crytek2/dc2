const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to ban')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');

        if (!interaction.member.permissions.has('BanMembers')) {
            return interaction.reply({ content: 'You do not have permission to ban members.', ephemeral: true });
        }

        await interaction.guild.members.ban(user);
        await interaction.reply({ content: `${user.tag} has been banned.` });
    },
};