const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  name: "invite",
  aliases: ["add"],
  run: async (client, message, args) => {

let invite = new MessageEmbed()
.setDescription(`Invite me to your server [click here](https://discord.com/oauth2/authorize?client_id=940655029956800603&scope=bot+applications.commands&permissions=37088600)
Need more support join [Support server](https://discord.gg/BnWD58YubK)`)
.setColor("#ff0400")
    
    
    let invbtn = new MessageButton()
    .setStyle('LINK')
    .setLabel('Invite Me')
    .setURL('https://discord.com/oauth2/authorize?client_id=940655029956800603&scope=bot+applications.commands&permissions=37088600') 

    let invbtn2 = new MessageButton()
    .setStyle('LINK')
    .setLabel('Support server')
    .setURL('https://discord.gg/BnWD58YubK') 
        
    const row = new MessageActionRow().addComponents(invbtn, invbtn2);
    message.channel.send({embeds: [invite],components: [row],}).catch(err => console.log(err))
  },
};