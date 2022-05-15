const fs = require("fs");
module.exports = (client) => {
//Events
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith("js"))
for (const file of eventFiles){
  const event = require(`../events/${file}`);
  client.on(file.split(".")[0], (...args) => event(client, ...args));
}
//Commands
let folders = fs.readdirSync("./commands");
folders.forEach((category) => {
const commandFiles = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith("js"))
for (const file of commandFiles){
  const command = require(`../commands/${category}/${file}`);
  client.commands.set(command.name, command);
}})
//Slash commands
const slashcommandsFiles = fs.readdirSync("./slashcommands").filter(file => file.endsWith("js"))
for(const file of slashcommandsFiles){
  const slash = require(`../slashcommands/${file}`)
  client.slashcommands.set(slash.data.name, slash)
   }
}
