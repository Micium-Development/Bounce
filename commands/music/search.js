const { MessageEmbed, MessageButton, MessageActionRow} = require("discord.js");
const Discord = require('discord.js')
module.exports = {
  name: "search",
  aliases: ["find"],
  run: async (client, message, args) => {

const voice = message.member.voice.channel
if(!voice) return message.reply("You must Join a voice channel before using this command!").catch(err => console.log(err))

if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
return message.reply("You Must be in same voice channel to use this command").catch(err => console.log(err))

const botPerms = voice.permissionsFor(message.client.user);
if (!botPerms.has(Discord.Permissions.FLAGS.CONNECT) || !botPerms.has(Discord.Permissions.FLAGS.SPEAK) || !botPerms.has(Discord.Permissions.FLAGS.VIEW_CHANNEL))
return message.reply("I don't have permission to connect the voice channel!").catch(err => console.log(err))

const music = args.slice(0).join(' ');
if(!music) return message.reply("You need provide song name to search!").catch(err => console.log(err))

const player = client.manager.create({
    guild: message.guild.id,
    voiceChannel: message.member.voice.channel.id,
    textChannel: message.channel.id,
    volume: 80,
    selfDeafen: true,
});
if(player && player.state !== "CONNECTED") player.connect();
const query = args.join(" ");

const but = new MessageButton().setCustomId("s_one").setLabel("1️⃣").setStyle("SECONDARY");
const but2 = new MessageButton().setCustomId("s_two").setLabel("2️⃣").setStyle("SECONDARY");
const but3 = new MessageButton().setCustomId("s_three").setLabel("3️⃣").setStyle("SECONDARY");
const but4 = new MessageButton().setCustomId("s_four").setLabel("4️⃣").setStyle("SECONDARY");
const but5 = new MessageButton().setCustomId("s_five").setLabel("5️⃣").setStyle("SECONDARY");
const row = new MessageActionRow().addComponents(but, but2, but3, but4, but5);

let s = await player.search(query, message.author);
if (s.loadType === 'NO_MATCHES') return message.reply("No match result found").catch(err => console.log(err))
if (s.loadType === 'LOAD_FAILED') return message.reply("An error occured when loading the track").catch(err => console.log(err))
switch (s.loadType) {
    case "TRACK_LOADED":
player.queue.add(s.tracks[0]);
const embed = new MessageEmbed()
.setColor("#fa14b9")
.addField('ADDED TO QUEUE', `<:yup:940656263212171307> [\`${s.tracks[0].title}\`](https://discord.gg/BnWD58YubK)`, true)
message.channel.send({ embeds: [embed] });
if (!player.playing) player.play()
break;
case "SEARCH_RESULT":
let index = 1;
const tracks = s.tracks.slice(0, 5);
const results = s.tracks.slice(0, 5).map(x => `${index++}) ${x.title}`).join("\n");

const searched = new MessageEmbed()
.setTitle("Search Results:")
.setDescription(`\`\`\`css\n${results}\`\`\``)
.setColor("#ff0400")
const msg = await message.reply({embeds: [searched], components: [row]});

const collector = msg.createMessageComponentCollector({
filter: (f) => f.user.id === message.author.id ? true : false && f.deferUpdate(),
max: 1,
time: 60000,
idle: 60000/2
});
collector.on("end", async (collected) => {
await msg.edit({components: []}).catch(e => { })
})
collector.on("collect", async (b) => {
if(!b.deferred) await  b.deferUpdate();
if(!player && !collector.ended) return collector.stop();
if(player.state !== "CONNECTED") player.connect();
if(b.customId === "s_one") {
player.queue.add(s.tracks[0]);
if(player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) await player.play();
let embed0 = new MessageEmbed()
.setColor("#ff0400")
.addField('ADDED TO QUEUE', `<:yup:940656263212171307> [\`${s.tracks[0].title}\`](https://discord.gg/BnWD58YubK)`, true)
message.channel.send({embeds: [embed0]}).catch(err => console.log(err))
await msg.delete()
} else if(b.customId === "s_two") {
player.queue.add(s.tracks[1]);
if(player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) await player.play();
let embed0 = new MessageEmbed()
.setColor("#ff0400")
.addField('ADDED TO QUEUE', `<:yup:940656263212171307> [\`${s.tracks[1].title}\`](https://discord.gg/BnWD58YubK)`, true)
message.channel.send({embeds: [embed0]}).catch(err => console.log(err))
await msg.delete()      
} else if(b.customId === "s_three") {
player.queue.add(s.tracks[2]);
if(player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) await player.play();
let embed0 = new MessageEmbed()
.setColor("#ff0400")
.addField('ADDED TO QUEUE', `<:yup:940656263212171307> [\`${s.tracks[2].title}\`](https://discord.gg/BnWD58YubK)`, true)
message.channel.send({embeds: [embed0]}).catch(err => console.log(err))
await msg.delete()     
} else if(b.customId === "s_four") {
player.queue.add(s.tracks[3]);
if(player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) await player.play();
let embed0 = new MessageEmbed()
.setColor("#ff0400")
.addField('ADDED TO QUEUE', `<:yup:940656263212171307> [\`${s.tracks[3].title}\`](https://discord.gg/BnWD58YubK)`, true)
message.channel.send({embeds: [embed0]}).catch(err => console.log(err))
await msg.delete()  
} else if(b.customId === "s_five") {
player.queue.add(s.tracks[4]);
if(player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) await player.play();
let embed0 = new MessageEmbed()
.setColor("#ff0400")
.addField('ADDED TO QUEUE', `<:yup:940656263212171307> [\`${s.tracks[4].title}\`](https://discord.gg/BnWD58YubK)`, true)
message.channel.send({embeds: [embed0]}).catch(err => console.log(err))
await msg.delete()}})}
  }
}