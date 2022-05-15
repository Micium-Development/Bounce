const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "resume",
    aliases: [],
    run: async (client, message, args) => {
   
const voice = message.member.voice.channel;
if (!voice) return message.reply("You must Join a voice channel before using this command!").catch(err => console.log(err))

if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
return message.reply("You Must be in same voice channel to use this command").catch(err => console.log(err))

const botPerms = voice.permissionsFor(message.client.user);
if (!botPerms.has("CONNECT") || !botPerms.has("SPEAK"))
return message.reply("I Don't have permission for work this command").catch(err => console.log(err))

const player = message.client.manager.get(message.guild.id);
if (!player) return message.reply("Nothing is playing right now!").catch(err => console.log(err))
if (!player.queue.current) return message.reply("Nothing is playing right now!").catch(err => console.log(err))
if (!player.paused) return message.reply("The player is already paused!").catch(err => console.log(err))

player.pause(false);
let embed = new MessageEmbed()
.setDescription("⏯️ Music has been resumed!")
.setColor("#ff0400")
return message.channel.send({ embeds : [embed]}).catch(err => console.log(err))
    }
}