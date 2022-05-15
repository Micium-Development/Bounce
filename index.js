const {Client, Intents, Collection} = require("discord.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const {token} = require("./config.json")
const { Manager } = require("erela.js");
const Spotify = require('erela.js-spotify');
const { convertTime } = require('./utils/convert.js');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]});

client.setMaxListeners(10);
client.commands = new Collection();
client.slashcommands = new Collection();

["handler"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("raw", d => client.manager.updateVoiceState(d));
process.on("unhandledRejection", (reason, promise) => {
  try {
      console.error("Unhandled Rejection at: ", promise, "reason: ", reason.stack || reason);
  } catch {
      console.error(reason);
    }
});
const clientID = "6spotify";
const clientSecret = "spotify";
const nodes = [
  {
    host: "lavalinknode",
    password: "password",
    port: 2333
  }
]

client.manager = new Manager({
  nodes,
  autoPlay: true,
  plugins: [
    new Spotify({
      clientID,
      clientSecret
    })
  ],
    send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  }
})

.on("nodeConnect", node => {
  console.log(`Node ${node.options.identifier} connected`)
})
.on('nodeError', (node, error) => {
console.log(`Node ${node.options.identifier} encountered an error`)
})
.on('nodeDisconnect', node => {
console.log(`Node ${node.options.identifier} disconnected`)
})
.on('nodeReconnect', node => {
console.log(`Node ${node.options.identifier} is now reconnecting`)
})
.on("trackStart", async(player, track) => {
  try{
  const starts = new MessageEmbed()
  .setAuthor({name: 'NOW PLAYING', iconURL: track.requester.displayAvatarURL(), url: 'https://discord.gg/BnWD58YubK'})
  .setDescription(`[${track.title}](${track.uri})`)
  .addFields({name: 'Requester', value: `${track.requester}`, inline: true},
  {name: 'Artist', value: `\`${track.author}\``, inline: true},
  {name: 'Duration', value: `${track.isStream ? "`❯ LIVE STREAM`" : `\`❯ `+convertTime(track.duration)+`\``}`, inline: true})
  .setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
  .setColor("#ff0400")
  const But1 = new MessageButton().setCustomId("volume").setEmoji("🔊").setStyle("SECONDARY");
  const But2 = new MessageButton().setCustomId("stop").setEmoji("⏹").setStyle("SECONDARY");
  const But3 = new MessageButton().setCustomId("pause").setEmoji("⏯").setStyle("SECONDARY");
  const But4 = new MessageButton().setCustomId("skip").setEmoji("⏩").setStyle("SECONDARY");
  const row = new MessageActionRow().addComponents(But1, But2, But3, But4);
  let song = await client.channels.cache.get(player.textChannel).send({embeds: [starts], components: [row]}).catch(err => console.log(err));
  player.setNowplayingMessage(song);
  const collector = song.createMessageComponentCollector({
  filter: (b) => {if (b.guild.me.voice.channel && b.guild.me.voice.channelId === b.member.voice.channelId) return true;
  else {b.reply({ content: `You must Join ${b.guild.me.voice.channel} before using this button!`, ephemeral: true}).catch(e => { }); return false;}},
  time: track.duration});
  collector.on("end", async (collected) => {
  await song.edit({components: [new MessageActionRow().addComponents(But1.setDisabled(true), But2.setDisabled(true), But3.setDisabled(true), But4.setDisabled(true))]}).catch(e => { })});
  collector.on("collect", async (i) => {
  await i.deferReply({ephemeral: true}).catch(e => { })
  if (i.customId === "volume") {
    if (!player) {return collector.stop()}
    if (!player.queue.current) {i.editReply("Nothing is playing right now").catch(e => { })
  } else {
    let amount = Number(player.volume) + 10;
    if (amount >= 110) return i.editReply("You can only set volume \`1%\` to \`100%\`").catch(e => { })
    await player.setVolume(amount);
    i.editReply(`Changed volume to \`${amount}%\``).catch(e => { })
  }
} else if (i.customId === "stop") {
  if (!player) {return collector.stop()}
  if (!player.queue.current) {i.editReply("Nothing is playing right now").catch(e => { })
} else {
  await player.stop();
  await player.queue.clear();
  i.editReply(`Player has been stopped!`).catch(e => { })}
} else if (i.customId === "pause") {
if (!player) {return collector.stop()}
if (!player.queue.current) {i.editReply("Nothing is playing right now").catch(e => { })
} else {
  player.pause(!player.paused);
  const Text = player.paused ? `paused` : `resumed`;
  i.editReply(`Player has been ${Text}!`).catch(e => { })}
} else if (i.customId === "skip") {
if (!player) {return collector.stop()}
if (!player.queue.current) {i.editReply("Nothing is playing right now").catch(e => { })
} else {
  await player.stop();
  i.editReply(`Player has been skipped!`).catch(e => { })}}})
} catch(e) {
  console.log(e)}
})
.on('playerMove', (player, oldChannel, newChannel) => {
  const guild = client.guilds.cache.get(player.guild)
  if(!guild) return;
  if(oldChannel === newChannel) return;
  if(newChannel === null || !newChannel) {
    if(!player) return;
    return player.destroy();
  } else {
    player.voiceChannel = newChannel;
    return player.destroy();
  }
})
.on("trackError", (player, track) => {
  const channel = client.channels.cache.get(player.textChannel);
  channel.send("An error occured when loading the track").catch(err => console.log(err));
})
.on("trackStuck", (player, track) => {
  const channel = client.channels.cache.get(player.textChannel);
  channel.send("An error occured when loading the song and track is stuck now").catch(err => console.log(err));
})
const { Structure } = require("erela.js");
Structure.extend(
  "Player",
  (Player) =>
    class extends Player {
      setNowplayingMessage(message) {
        if (this.nowPlayingMessage)
          this.nowPlayingMessage.delete().catch(err => console.log(err));
        return (this.nowPlayingMessage = message);
      }
    }
);
client.login(token);
