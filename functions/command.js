module.exports = {
  command: async (client) => {

    const COMMAND_PREFIX = '$';
    
    client.on('messageCreate', async (message) => {

      // Ne pas tenir compte des messages envoyés par les bots, ou qui ne commencent pas par le préfix
      if (message.author.bot || !message.content.startsWith(COMMAND_PREFIX)) return;

      // On découpe le message pour récupérer tous les mots
      const words = message.content.split(' ');

      const commandName = words.shift().slice(1); // Le premier mot du message, auquel on retire le préfix
      const arguments = words; // Tous les mots suivants sauf le premier

      if (client.commands.has(commandName)) {
        // La commande existe, on la lance
        client.commands.get(commandName).run(client, message, arguments);
      } else {
        // La commande n'existe pas, on prévient l'utilisateur
        await message.delete();
        await message.channel.send(`The ${commandName} does not exist.`);
      }
    })
  }
}