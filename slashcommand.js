const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./slashcommands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = '940655029956800603';

for (const file of commandFiles) {
	const command = require(`./slashcommands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands');
	} catch (error) {
		console.error(error);
	}
})();