const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
module.exports = {
    name: "help",
    aliases: ["command"],
    run: async (client, message, args) => {
let embed = new MessageEmbed()
.addField('Music [16]', `\`play\`, \`autoplay\`, \`stop\`, \`skip\`, \`pause\`, \`resume\`, \`search\`, \`loop\`, \`queue\`, \`remove\`, \`nowplaying\`, \`connect\`, \`disconnect\`, \`volume\`, \`seek\`, \`shuffle\``)
.addField('Filter [8]', `\`8D\`, \`bassboost\`, \`chipmunk\`, \`nightcore\`, \`slowmo\`, \`speed\`, \`tremolo\`, \`reset\``)
.addField('Utility [5]', `\`ping\`, \`uptime\`, \`stats\`, \`invite\`, \`help\``)
.setThumbnail(`${client.user.displayAvatarURL()}`)
.setColor("#ff0400")
.setFooter({ text: 'Micium-Development - https://micium-development.ovh/', iconURL: '' });
let button1 = new MessageButton()
.setStyle('LINK')
.setLabel('Support server')
.setURL('https://discord.gg/BnWD58YubK')
        
let button2 = new MessageButton()
.setStyle('LINK')
.setLabel('Invite Me')
.setURL('https://discord.com/oauth2/authorize?client_id=940655029956800603&scope=bot+applications.commands&permissions=37088600')

let button3 = new MessageButton()
.setStyle('LINK')
.setLabel('Website')
.setURL('https://bouncebot.xyz/') 

let button4 = new MessageButton()
.setStyle('LINK')
.setLabel('Patreon')
.setURL('https://www.patreon.com/micium_development') 

const row = new MessageActionRow().addComponents(button1, button2, button3, button4);
message.channel.send({embeds: [embed], components: [row]})
    }
}
