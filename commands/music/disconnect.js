const { MessageEmbed } = require("discord.js");
module.exports = {
        name: "disconnect",
        aliases: ["dc", "leave"],
        run: async (client, message, args) => {

const voice = message.member.voice.channel;
if (!voice) return message.reply("You must Join a voice channel before using this command!").catch(err => console.log(err))
        
if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
return message.reply("You Must be in same voice channel to use this command").catch(err => console.log(err))
        
const botPerms = voice.permissionsFor(message.client.user);
if (!botPerms.has("CONNECT") || !botPerms.has("SPEAK"))
return message.reply("I Don't have permission for work this command").catch(err => console.log(err))

const player = client.manager.create({
guild: message.guild.id,
voiceChannel: message.member.voice.channel.id,
textChannel: message.channel.id,
});

player.destroy();
let embed = new MessageEmbed()
.setDescription("<:yup:940656263212171307> | Left the voice channel")
.setColor("#ff0400")
return message.channel.send({ embeds : [embed]}).catch(err => console.log(err))
     }
}