const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const load = require('lodash');
module.exports = {
    name: "queue",
    aliases: ["q"],
    run: async (client, message, args) => {

        const voice = message.member.voice.channel;
        if (!voice) return message.reply("You must Join a voice channel before using this command!").catch(err => console.log(err))
              
        const botPerms = voice.permissionsFor(message.client.user);
        if (!botPerms.has("CONNECT") || !botPerms.has("SPEAK"))
        return message.reply("I Don't have permission for work this command").catch(err => console.log(err))
                
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.reply("Nothing is playing right now!").catch(err => console.log(err))
        if (!player.queue.current) return message.reply("Nothing is playing right now!").catch(err => console.log(err))

        if(player.queue.length === "0" || !player.queue.length) {
            const embed = new MessageEmbed()
            .setColor("#ff0400")
            .setDescription(`Now playing [${player.queue.current.title}](${player.queue.current.uri})`)

            await message.channel.send({embeds: [embed]}).catch(() => {});
        } else {
            const queuedSongs = player.queue.map((t, i) => `\`${++i}\` • ${t.title} • [${t.requester}]`);

            const mapping = load.chunk(queuedSongs, 10);
            const pages = mapping.map((s) => s.join("\n"));
            let page = 0;

            if(player.queue.size < 11) {
                const embed = new MessageEmbed()
                .setColor("#ff0400")
                .setDescription(`**Now playing**\n > [${player.queue.current.title}](${player.queue.current.uri})\n**Queued Songs**\n${pages[page]}`)
                .setThumbnail(player.queue.current.thumbnail)

                await message.channel.send({embeds: [embed]}).catch(err => console.log(err))
            } else {
                const embed2 = new MessageEmbed()
                .setColor("#ff0400")
                .setDescription(`**Now playing**\n > [${player.queue.current.title}](${player.queue.current.uri})\n**Queued Songs**\n${pages[page]}`)
                .setThumbnail(player.queue.current.thumbnail)

                const but1 = new MessageButton()
                .setCustomId("queue_cmd_but_1")
              
                .setEmoji("⏭")
                .setStyle("SECONDARY")

                const but2 = new MessageButton()
                .setCustomId("queue_cmd_but_2")
                .setEmoji("⏮")
                .setStyle("SECONDARY")

                const but3 = new MessageButton()
                .setCustomId("queue_cmd_but_3")
                .setLabel(`${page + 1}/${pages.length}`)
                .setStyle("SECONDARY")
                .setDisabled(true)

                const row1 = new MessageActionRow().addComponents([
                    but2, but3, but1
                ]);

                const msg = await message.channel.send({embeds: [embed2], components: [row1]}).catch(err => console.log(err))

                const filter = u => u.user.id === message.author.id
                const collector = message.channel.createMessageComponentCollector({ filter, componentType: "BUTTON", idle: 30e3 });

                collector.on("collect", async (button) => {
                    if(button.customId === "queue_cmd_but_1") {
                        await button.deferUpdate().catch(() => {});
                        page = page + 1 < pages.length ? ++page : 0;

                        const embed3 = new MessageEmbed()
                        .setColor("#ff0400")
                        .setDescription(`**Now playing**\n[${player.queue.current.title}](${player.queue.current.uri})\n**Queued Songs**\n${pages[page]}`)
                        .setThumbnail(player.queue.current.thumbnail)

                        await msg.edit({
                            embeds: [embed3],
                            components: [new MessageActionRow().addComponents(but2, but3.setLabel(`${page + 1}/${pages.length}`), but1)]
                        })
                    } else if(button.customId === "queue_cmd_but_2") {
                        await button.deferUpdate().catch(() => {});
                        page = page > 0 ? --page : pages.length - 1;

                        const embed4 = new MessageEmbed()
                        .setColor("#ff0400")
                        .setDescription(`**Now playing**\n[${player.queue.current.title}](${player.queue.current.uri})\n**Queued Songs**\n${pages[page]}`)
                        .setThumbnail(player.queue.current.thumbnail)

                        await msg.edit({
                            embeds: [embed4],
                            components: [new MessageActionRow().addComponents(but2, but3.setLabel(`Page ${page + 1}/${pages.length}`), but1)]
             }).catch(() => {});
                    } else return;
                });

                collector.on("end", async () => {
                    await msg.edit({
                        components: []
                    })
                });
            }
        }
   }
};