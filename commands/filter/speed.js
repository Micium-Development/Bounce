const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "speed",
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

try {
if (!args.join(" ")) return message.reply(`please provide speed rate!`).catch(err => console.log(err))

if(isNaN(args[0])) return message.reply("please provide valid number value").catch(err => console.log(err))

if(parseInt(args[0]) > 3 ||(args[0]) < 0) return message.reply(" please provide speed rate between `1` to `3`").catch(err => console.log(err))
player.node.send({
    op: "filters",
    guildId: message.guild.id,
    equalizer: player.bands.map((gain, index) => {
        var Obj = {
          "band": 0,
          "gain": 0,
        };
        Obj.band = Number(index);
        Obj.gain = Number(gain)
        return Obj;
      }),
    timescale: {
          "speed": 1.0,
          "pitch": 1.0,
          "rate": Number(args[0])
      },
});
    let embed = new MessageEmbed()
    .setDescription(`<:yup:940656263212171307> | Changed speed rate set to \`${args[0]}\``)
    .setColor("#ff0400")
    message.channel.send({ embeds : [embed]}).catch(err => console.log(err))
}catch (e) {
    console.log(e)}
  }
};