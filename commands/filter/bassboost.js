const { MessageEmbed } = require("discord.js");
const levels = {
    none: 0.0,
    low: 0.20,
    medium: 0.30,
    high: 0.35,
  };
module.exports = {
    name: "bassboost",
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

if (!args.join(" ")) {
    let embed = new MessageEmbed()
    .setTitle("You need to provide a bassboost level")
    .setDescription(`\`\`\`css\nAvailable Levels are - none, low, medium, high\`\`\``)
    .setColor("#ffb700")
    message.reply({embeds: [embed]}).catch(err => console.log(err))
  } else {
    let level = "none";
    if (args.length && args[0].toLowerCase() in levels) level = args[0].toLowerCase();

    player.setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] })));
    let embed = new MessageEmbed()
    .setDescription(`<:yup:940656263212171307> | Changed filter bassboost to \`${level}\``)
    .setColor("#ff0400")
    message.channel.send({ embeds : [embed]}).catch(err => console.log(err))
    }
  }
}
