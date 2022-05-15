const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js')
module.exports = {
    name: "play",
    aliases: ["p"],
    run: async (client, message, args) => {
        
const voice = message.member.voice.channel;
if (!voice) return message.reply("You must Join a voice channel before using this command!").catch(err => console.log(err))

if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
return message.reply("You Must be in same voice channel to use this command").catch(err => console.log(err))

const botPerms = voice.permissionsFor(message.client.user);
if (!botPerms.has(Discord.Permissions.FLAGS.CONNECT) || !botPerms.has(Discord.Permissions.FLAGS.SPEAK) || !botPerms.has(Discord.Permissions.FLAGS.VIEW_CHANNEL))
return message.reply("I Don't have permission to connect the voice channel!").catch(err => console.log(err))

if (!args.join(" ")) return message.reply("You need provide song name to play!").catch(err => console.log(err))

const player = client.manager.create({
  guild: message.guild.id,
  voiceChannel: message.member.voice.channel.id,
  textChannel: message.channel.id,
  volume: 80,
  selfDeafen: true,
});
const search = args.join(' ');
let res;

if (player.state != "CONNECTED") await player.connect();
res = await player.search(search, message.author);

if (res.loadType === 'NO_MATCHES') return message.reply("No match result found").catch(err => console.log(err))
if (res.loadType === 'LOAD_FAILED') return message.reply("An error occured when loading the track").catch(err => console.log(err))

if (res.loadType === 'PLAYLIST_LOADED') {
    for (const track of res.tracks) {
      player.queue.add(track);
      if (!player.playing && !player.paused && !player.queue.size)
      player.play();
}
  let embed1 = new MessageEmbed()
  .setColor("#ff0400")
  .addField('ADDED PLAYLIST', `[\`${res.playlist.name}\`](https://discord.gg/BnWD58YubK)`, true)
  .setFooter({ text: 'Micium-Development - https://micium-development.ovh/', iconURL: '' });
  message.channel.send({embeds: [embed1]}).catch(err => console.log(err))
} else {
  player.queue.add(res.tracks[0]);
  if (!player.playing && !player.paused && !player.queue.size)
  player.play();
  let embed2 = new MessageEmbed()
  .setColor("#ff0400")
  .addField('ADDED TO QUEUE', `[\`${res.tracks[0].title}\`](https://discord.gg/BnWD58YubK)`, true)
  .setFooter({ text: 'Micium-Development - https://micium-development.ovh/', iconURL: '' });
  message.channel.send({embeds: [embed2]}).catch(err => console.log(err))
        }
    }
}
