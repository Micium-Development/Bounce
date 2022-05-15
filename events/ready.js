module.exports = async (client) => {
client.manager.init(client.user.id);
console.log(`Bot online now`);
setInterval(() => {client.user.setActivity(`Made by https://micium-development.ovh/`, {type: 'LISTENING'})}, 60000);
};
