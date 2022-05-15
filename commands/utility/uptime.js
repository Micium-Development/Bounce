const { MessageEmbed } = require("discord.js");
const moment = require('moment');
module.exports = {
    name: "uptime",
    aliases: ["up"],
    run: async (client, message, args) => {

    const d = moment.duration(message.client.uptime);
    let days = Math.floor(client.uptime / 86400000 );
    let hours = Math.floor(client.uptime / 3600000 ) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    const date = moment().subtract(d, 'ms').format('dddd, MMMM Do YYYY');

let embed = new MessageEmbed()
.setDescription(`**Uptime:** ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds
**Last Restart:** ${date}`)
.setColor("#ff0400")
message.channel.send({embeds: [embed]}).catch(err => console.log(err)) 
    }
} 