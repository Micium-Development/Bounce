const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "seek",
    aliases: [],
    run: async (client, message, args) => {
         
const voice = message.member.voice.channel;
if (!voice) return message.reply("You must Join a voice channel before using this command!").catch(err => console.log(err))
        
if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
return message.reply("You Must be in same voice channel to use this command").catch(err => console.log(err))
        
const player = message.client.manager.get(message.guild.id);
if (!player) return message.reply("Nothing is playing right now!").catch(err => console.log(err))
if (!player.queue.current) return message.reply("Nothing is playing right now!").catch(err => console.log(err))

if (!args[0]) return message.reply(`Please provide position to seek!`).catch(err => console.log(err))

const time = Number(args[0])
if (isNaN(time)) return message.reply(`Please enter a valid number!`).catch(err => console.log(err))

if (Number(args[0]) < 0 || Number(args[0]) >= player.queue.current.duration / 1000)
return message.reply(`You may seek from \`0\` to \`${player.queue.current.duration}\``).catch(err => console.log(err))

player.seek(Number(args[0]) * 1000);
let embed = new MessageEmbed()
.setDescription(`Seeked to \`${format(Number(args[0]) * 1000)}\``)
.setColor("#ff0400")
return message.channel.send({ embeds : [embed]}).catch(err => console.log(err))
    }
}
function format(millis) {
    try {
      var h = Math.floor(millis / 3600000),
        m = Math.floor(millis / 60000),
        s = ((millis % 60000) / 1000).toFixed(0);
      if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
      else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    } catch (e) {
      console.log(e)
    }
}