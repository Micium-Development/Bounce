const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "volume",
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

if (!args.length) return message.channel.send(`Current volume is \`${player.volume}%\``).catch(err => console.log(err))

const volume = Number(args[0]);

if (!volume || volume < 1 || volume > 100) return message.reply("You can only set volume \`1%\` and \`100%\`").catch(err => console.log(err))
  
player.setVolume(volume);
return message.channel.send(`Changed volume to \`${volume}%\``).catch(err => console.log(err))
    }
}