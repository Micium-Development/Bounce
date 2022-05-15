const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("returns Bot ping"),

    async run(interaction, client) {
        await interaction.followUp({ content: `Pong! \`${client.ws.ping}ms\``}).catch(e => { })
    }
}