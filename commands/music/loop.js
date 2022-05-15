const { MessageEmbed } = require("discord.js");
module.exports = {
        name: "loop",
        aliases: ["repeat"],
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

if (args.length && /queue/i.test(args[0])) {
player.setQueueRepeat(!player.queueRepeat);
const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
let embed1 = new MessageEmbed()
.setDescription(`🔄 Change loop mode to \`${queueRepeat}\``)
.setColor("#ff0400")
return message.channel.send({embeds: [embed1]}).catch(err => console.log(err))
}
player.setTrackRepeat(!player.trackRepeat);
const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
let embed2 = new MessageEmbed()
.setDescription(`🔄 Change loop mode to \`${trackRepeat}\``)
.setColor("#ff0400")
return message.channel.send({embeds: [embed2]}).catch(err => console.log(err))
  }
}