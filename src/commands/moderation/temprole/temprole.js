const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('temprole')
        .setDescription('Adjon hozzá egy ideiglenes rangot a felhasználónak')
        .addUserOption(option => option.setName('user').setDescription('A felhasználó, akinek ideiglenes rangot szeretnél adni').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('A rang, amit ideiglenesen hozzá szeretnél adni').setRequired(true))
        .addIntegerOption(option => option.setName('duration').setDescription('Az időtartam másodpercben').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');
        const duration = interaction.options.getInteger('duration');

        const member = await interaction.guild.members.fetch(user.id);
        
        // Rang hozzáadása
        await member.roles.add(role);
        await interaction.reply(`A rang ${role.name} hozzáadva a felhasználóhoz ${user.tag} ideiglenesen ${duration} másodpercre.`);

        // Rang eltávolítása a megadott idő elteltével
        setTimeout(async () => {
            await member.roles.remove(role);
            console.log(`A rang ${role.name} eltávolítva a felhasználótól ${user.tag}.`);
        }, duration * 1000); // Átváltás milliszekundumra
    },
};