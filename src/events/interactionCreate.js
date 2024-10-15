module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        if (!interaction.isCommand()) return;

        console.log(`Parancs hívva: /${interaction.commandName} by ${interaction.user.tag}`);

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`Ismeretlen parancs: ${interaction.commandName}`);
            return;
        }

        try {
            command.execute(interaction);
            console.log(`Sikeresen végrehajtva: /${interaction.commandName}`);
        } catch (error) {
            console.error(`Hiba történt a parancs végrehajtásakor: ${error}`);
            interaction.reply({ content: 'Hiba történt a parancs végrehajtása során.', ephemeral: true });
        }
    },
};