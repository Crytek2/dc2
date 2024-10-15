const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to kick')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');

        if (!interaction.member.permissions.has('KickMembers')) {
            return interaction.reply({ content: 'You do not have permission to kick members.', ephemeral: true });
        }

        await interaction.guild.members.kick(user);
        await interaction.reply({ content: `${user.tag} has been kicked.` });
    },
};