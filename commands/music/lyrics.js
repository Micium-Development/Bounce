const { MessageEmbed } = require("discord.js"); 
const lyricsFinder = require("lyrics-finder"); 

module.exports = {
    name: "lyrics",
    aliases: ["ly"],
    run: async (client, message, args) => {

const player = message.client.manager.get(message.guild.id);
const queue = player.queue.current;
if (!queue) return message.reply(`Nothing is playing right now!`)

let lyrics = null;
const title = queue.title;
try {
lyrics = await lyricsFinder(queue.title, "");
if (!lyrics) return message.reply(`No lyrics found!`)
} catch (error) {
message.channel.send(`unexpected error occured!`)
}

let embed = new MessageEmbed()
.setTitle(`${player.queue.current.title}`)
.setDescription(lyrics)
.setColor("RED")

if (embed.description.length >= 2048) embed.description = `${embed.description.substr(0, 2045)}...`; return message.channel.send({embeds: [embed]})
   }
} 
