const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "autoplay",
    aliases: [],
    run: async (client, message, args) => {

if (!message.member.permissions.has('MANAGE_GUILD'))
return message.reply(`You must have \`Manage Guild\` permission to use this command.`).catch(err => log.send(`\`\`\`fix\nGUILD - ${message.guild.name} ERROR - missing permission\`\`\``));
         
const voice = message.member.voice.channel;
if (!voice) return message.reply("You must Join a voice channel before using this command!").catch(err => console.log(err))
        
if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
return message.reply("You Must be in same voice channel to use this command").catch(err => console.log(err))
        
const player = message.client.manager.get(message.guild.id);
if (!player) return message.reply("Nothing is playing right now!").catch(err => console.log(err))
if (!player.queue.current) return message.reply("Nothing is playing right now!").catch(err => console.log(err))

const autoplay = player.get("autoplay");
if (autoplay === false) {
    const identifier = player.queue.current.identifier;
    player.set("autoplay", true);
    player.set("requester", message.author);
    player.set("identifier", identifier);
    const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
    res = await player.search(search, message.author);
    player.queue.add(res.tracks[1]);
    let embed = new MessageEmbed()
    .setDescription(`<:yup:940656263212171307> | Enabled autoplay mode in ${message.guild.name}`)
    .setColor("#ff0400")
    return message.channel.send({ embeds : [embed]}).catch(err => console.log(err))
} else {
    player.set("autoplay", false);
    player.queue.clear();
    let thing = new MessageEmbed()
    .setDescription(`<:yup:940656263212171307> | Disabled autoplay mode in ${message.guild.name}`)
    .setColor("#ff0400")
    return message.channel.send({ embeds : [thing]}).catch(err => console.log(err))
}
    }
}
