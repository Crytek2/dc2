const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Adjon hozzá egy rangot a felhasználónak')
        .addUserOption(option => option.setName('user').setDescription('A felhasználó, akinek rangot szeretnél adni').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('A rang, amit hozzá szeretnél adni').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');

        const member = await interaction.guild.members.fetch(user.id);
        await member.roles.add(role);
        
        await interaction.reply(`A rang ${role.name} hozzáadva a felhasználóhoz ${user.tag}.`);
    },
};