const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js')
module.exports = {
    name: "connect",
    aliases: ["join"],
    run: async (client, message, args) => {
                
const voice = message.member.voice.channel;
if (!voice) return message.reply("You must Join a voice channel before using this command!").catch(err => console.log(err))
        
if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
return message.reply("You Must be in same voice channel to use this command").catch(err => console.log(err))
        
const botPerms = voice.permissionsFor(message.client.user);
if (!botPerms.has(Discord.Permissions.FLAGS.CONNECT) || !botPerms.has(Discord.Permissions.FLAGS.SPEAK) || !botPerms.has(Discord.Permissions.FLAGS.VIEW_CHANNEL))
return message.reply("I don't have permission to connect the voice channel!").catch(err => console.log(err))

const player = client.manager.create({
    guild: message.guild.id,
    voiceChannel: message.member.voice.channel.id,
    textChannel: message.channel.id,
    volume: 80,
    selfDeafen: true,
});
if (player.state !== "CONNECTED") {
    player.connect()
    let embed = new MessageEmbed()
    .setDescription(`<:yup:940656263212171307> | joined the voice channel`)
    .setColor("#ff0400")
    return message.channel.send({ embeds : [embed]}).catch(err => console.log(err))
} else {
    let embed2 = new MessageEmbed()
    .setDescription(`<:yup:940656263212171307> | joined the voice channel`)
    .setColor("#ff0400")
    return message.channel.send({ embeds : [embed2]}).catch(err => console.log(err))
}
    }
}
