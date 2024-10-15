const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerole')
        .setDescription('Távolítson el egy rangot a felhasználótól')
        .addUserOption(option => option.setName('user').setDescription('A felhasználó, akitől el szeretnéd venni a rangot').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('A rang, amit el szeretnél venni').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');

        const member = await interaction.guild.members.fetch(user.id);
        await member.roles.remove(role);
        
        await interaction.reply(`A rang ${role.name} eltávolítva a felhasználótól ${user.tag}.`);
    },
};