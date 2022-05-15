module.exports = {
        name: "ping",
        aliases: [],
        run: async (client, message, args) => {
    message.channel.send(`Pong! \`${client.ws.ping}ms\``).catch(err => console.log(err))
        }
}