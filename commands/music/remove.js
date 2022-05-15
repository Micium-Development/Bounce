const { MessageEmbed } = require("discord.js");
const MAIN_COLOR = `#ff0400`;
module.exports = {
    name: "remove",
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
        
if (!args[0]) {return message.reply("You have to specify a valid query!").catch(err => console.log(err))}
        
if (isNaN(args[0])) {return message.reply("You have to specify a valid query by number!").catch(err => console.log(err))}
        
if (Number(args[0]) > player.queue.size) {return message.reply("You have to specify a valid query!").catch(err => console.log(err))}

player.queue.remove(Number(args[0]) - 1);
const embed = new MessageEmbed()
.setDescription(`<:yup:940656263212171307> | Successfully removed the track`)
.setColor(MAIN_COLOR)
await message.channel.send({ embeds: [embed] }).catch(err => console.log(err))
     }
}