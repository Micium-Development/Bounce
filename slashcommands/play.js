const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays your choice songs')
        .addStringOption(string => 
            string
                .setName('search')
                .setDescription('Play a given song name/url in the voice channel')
                .setRequired(true)),
    async run(interaction, client) {
const voiceChannel = interaction.member.voice.channel;
if(!voiceChannel) return interaction.followUp({content: 'You must Join a voice channel before using this command!'}).catch(e => { })

if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id)
return interaction.followUp({content: "You Must be in same voice channel to use this command"}).catch(e => { })

const botPerms = voiceChannel.permissionsFor(interaction.client.user);
if (!botPerms.has(Discord.Permissions.FLAGS.CONNECT) || !botPerms.has(Discord.Permissions.FLAGS.SPEAK) || !botPerms.has(Discord.Permissions.FLAGS.VIEW_CHANNEL))
return interaction.followUp({content: "I Don't have permission to connect the voice channel!"}).catch(e => { })

const player = client.manager.create({
    guild: interaction.guild.id,
    voiceChannel: interaction.member.voice.channel.id,
    textChannel: interaction.channel.id,
    volume: 80,
    selfDeafen: true,
});

const search = interaction.options.getString('search');
let res;

if (player.state != "CONNECTED") await player.connect();
res = await player.search(search, interaction.user);

if (res.loadType === 'NO_MATCHES') return interaction.followUp("No match result found").catch(e => { })
if (res.loadType === 'LOAD_FAILED') return interaction.followUp("An error occured when loading the track").catch(e => { })

if (res.loadType === 'PLAYLIST_LOADED') {
    for (const track of res.tracks) {
      player.queue.add(track);
      if (!player.playing && !player.paused && !player.queue.size)
      player.play();
}
  let embed1 = new MessageEmbed()
  .setColor("#ff0400")
  .addField('ADDED PLAYLIST', `[\`${res.playlist.name}\`](https://discord.gg/BnWD58YubK)`, true)
  await interaction.followUp({embeds: [embed1]}).catch(err => console.log(err))
} else {
  player.queue.add(res.tracks[0]);
  if (!player.playing && !player.paused && !player.queue.size)
  player.play();
  let embed2 = new MessageEmbed()
  .setColor("#ff0400")
  .addField('ADDED TO QUEUE', `[\`${res.tracks[0].title}\`](https://discord.gg/BnWD58YubK)`, true)
   await interaction.followUp({embeds: [embed2]}).catch(err => console.log(err))
        }
    }
}