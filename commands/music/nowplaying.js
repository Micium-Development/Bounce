const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    run: async (client, message, args) => {
      
const voice = message.member.voice.channel;
if (!voice) return message.reply("You must Join a voice channel before using this command!").catch(err => console.log(err))

const botPerms = voice.permissionsFor(message.client.user);
if (!botPerms.has("CONNECT") || !botPerms.has("SPEAK"))
return message.reply("I Don't have permission for work this command").catch(err => console.log(err))

const player = message.client.manager.get(message.guild.id);
if (!player) return message.reply("Nothing is playing right now!").catch(err => console.log(err))
if (!player.queue.current) return message.reply("Nothing is playing right now!").catch(err => console.log(err))

let embed = new MessageEmbed()
.setThumbnail(player.queue.current.displayThumbnail("3"))
.setColor("#ff0400")
.addField("Now playing",`**[${player.queue.current.title}](https://discord.gg/BnWD58YubK)**`)
.addField(`Duration`, `${player.queue.current.isStream ? "**[`LIVE STREAM`]**" : `[`+createBar(player)+`]`}`)
return message.channel.send({ embeds : [embed]}).catch(err => console.log(err))
    }
}
function createBar(player) {
    let size = 10;
    let line = "▬";
    let slider = "🔴";
    
    if (!player.queue.current) return `${slider}${line.repeat(size - 1)}]`;
    let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
    let total = player.queue.current.duration;
    let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
   
    if (!String(bar).includes(slider)) return `${slider}${line.repeat(size - 1)}`;
    return `${bar[0]}`;
}