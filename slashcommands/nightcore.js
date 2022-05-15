const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("nightcore")
    .setDescription("change music filter to nightcore"),

    async run(interaction, client) {
    const voiceChannel = interaction.member.voice.channel;
    if(!voiceChannel) return interaction.followUp({content: 'You must Join a voice channel before using this command!'}).catch(e => { })
        
    if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id)
    return interaction.followUp({content: "You Must be in same voice channel to use this command"}).catch(e => { })
        
    const player = message.client.manager.get(message.guild.id);
    if (!player) return interaction.followUp({content: `Nothing is playing right now!`}).catch(e => { })
    if (!player.queue.current) return interaction.followUp({content: `Nothing is playing right now!`}).catch(e => { })

    try {
        player.node.send({
          op: "filters",
          guildId: message.guild.id,
          equalizer: player.bands.map((gain, index) => {
              var Obj = {
                "band": 0,
                "gain": 0,
              };
              Obj.band = Number(index);
              Obj.gain = Number(gain)
              return Obj;
            }),
          timescale: {
                "speed": 1.165,
                "pitch": 1.125,
                "rate": 1.05
            },
    });
        const embed = new MessageEmbed()
        .setDescription(`<:yup:940656263212171307> | Changed filter to \`nightcore\``)
        .setColor("#ff0400")
        await interaction.followUp({ embeds : [embed]}).catch(err => console.log(err))
       }catch (e) {
        console.log(e)}
     }
    };