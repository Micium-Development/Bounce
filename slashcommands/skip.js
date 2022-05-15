const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("skip playing song"),

    async run(interaction, client) {

const voiceChannel = interaction.member.voice.channel;
if(!voiceChannel) return interaction.followUp({content: 'You must Join a voice channel before using this command!'}).catch(e => { })

if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id)
return interaction.followUp({content: "You Must be in same voice channel to use this command"}).catch(e => { })

const player = message.client.manager.get(message.guild.id);
if (!player) return interaction.followUp({content: `Nothing is playing right now!`}).catch(e => { })
if (!player.queue.current) return interaction.followUp({content: `Nothing is playing right now!`}).catch(e => { })

player.stop();
let embedstop = new MessageEmbed()
.setDescription(`⏭️ Music has been skipped`)
.setColor("#ff0400")
await interaction.followUp({embeds: [embedstop]}).catch(e => { })
    }
}