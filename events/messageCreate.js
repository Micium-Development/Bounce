const {MessageEmbed} = require("discord.js");
const config = require("../config.json")
module.exports = async (client, message) => {

if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
let embed = new MessageEmbed()
.setAuthor({name: "Bounce", iconURL: client.user.displayAvatarURL()})
.setDescription(`My Prefix in **${message.guild.name}** is \`b.\`
For More Informating type \`b.help\``)
.setColor("#ff0400")
.setThumbnail(client.user.displayAvatarURL())
message.reply({embeds: [embed]}).catch(err => console.log(err))}

if (message.author.bot || message.channel.type === "dm") return;

const prefix = config.prefix;
if (message.content.indexOf(prefix)!== 0) return;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmda = args.shift().toLowerCase();
    let command = client.commands.get(cmda) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmda));
    if (!command) return;
    try {
        command.run(client, message, args)
    } catch (error) {
        console.error(error)
    }
};