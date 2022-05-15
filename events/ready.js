module.exports = async (client) => {
client.manager.init(client.user.id);
console.log(`Thanks for using Bounce from Micium-Development https://github.com/Micium-Development/Bounce`);
setInterval(() => {client.user.setActivity(`Made by https://micium-development.ovh/`, {type: 'LISTENING'})}, 60000);
};
