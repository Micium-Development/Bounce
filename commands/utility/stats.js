const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const discord = require('discord.js');
const { mem, cpu, os } = require('node-os-utils');
module.exports = {
  name: "stats",
  aliases: [],
  run: async (client, message, args) => {
    let days = Math.floor(client.uptime / 86400000 );
    let hours = Math.floor(client.uptime / 3600000 ) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    const { totalMemMb, usedMemMb } = await mem.info();
    const msg = await message.channel.send("loading...").catch(err => console.log(err))

let embed = new MessageEmbed()
.setColor("#ff0400")
.addFields({
name: 'SYSTEM STATS',
value: `\`\`\`css\nRAM - ${totalMemMb} MB
RAM USAGES: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
OS: ${await os.oos()}
CPU: ${cpu.model()}
CORE: ${cpu.count()}
CPU USAGES: ${await cpu.usage()} %\`\`\``,
inline: false
}, {
name: `BOT STATS`,
value: `\`\`\`css\nTOTAL SERVERS: ${client.guilds.cache.size}
PING: ${client.ws.ping} ms
UPTIME: ${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds\`\`\``,
inline: false
}, {
name: 'PACKAGE STATS',
value: `\`\`\`css\nDISCORD.JS: v${discord.version}
NODE.JS: ${process.version}
BOT VERSION: V1.1.0\`\`\``,
inline: true
},{
name: 'DEVELOPERS',
value: `\`\`\`css\nGrowtoups#8330
Vaibhav#9662\`\`\``,
inline: true
})
.setFooter({ text: 'Micium-Development - https://micium-development.ovh/', iconURL: '' });
let button1 = new MessageButton()
.setStyle('LINK')
.setLabel('Micium-hosting')
.setURL("https://discord.gg/f7Ryq72ZHX")
let button3 = new MessageButton()
.setStyle('LINK')
.setLabel('WeStart Hosting')
.setURL("https://discord.gg/S8Ds2HeU4S")
    let button2 = new MessageButton()
.setStyle('LINK')
.setLabel('Patreon')
.setURL('https://www.patreon.com/micium_development')
const row = new MessageActionRow().addComponents(button1, button2, button3);

message.channel.send({ embeds : [embed], components: [row]}).catch(err => console.log(err))
await msg.delete()
  }
}
