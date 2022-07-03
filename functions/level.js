const mySqlConnector = require('../src/MySqlConnector');

module.exports = {
  level: async (client) => {
    client.on('messageCreate', async (message) => {
      if (message.author.bot) return;

      // On regarde si l'utilisateur a un compte lié au serveur dans la base de données
      const user = await mySqlConnector.executeQuery(`SELECT * FROM xp WHERE user_id = '${message.author.id}' AND server_id = '${message.guild.id}'`);

      if (user.length === 0) {
        // L'utilisateur n'a pas de compte, on le crée
        await mySqlConnector.executeQuery(`INSERT INTO xp (user_id, xp_count, xp_level, server_id) VALUES ('${message.author.id}', 0, 1, '${message.guild.id}')`);
      } else {
        const xpCount = user[0].xp_count;
        const xpLevel = user[0].xp_level;

        if (xpCount < xpLevel) {
          await mySqlConnector.executeQuery(`UPDATE xp SET xp_count = xp_count + 1 WHERE user_id = '${message.author.id}' AND server_id = '${message.guild.id}'`);
        } else {
          await mySqlConnector.executeQuery(`UPDATE xp SET xp_count = 0, xp_level = xp_level + 1 WHERE user_id = '${message.author.id}' AND server_id = '${message.guild.id}'`);
          // get level channel
          const levelChannel = message.guild.channels.cache.find(channel => channel.name === process.env.LEVEL_CHANNEL)
          // send on levelChannel
          await levelChannel.send(`<@${message.author.id}> est passé niveau ${user[0].xp_level + 1} !`);


        }

      }
    })
  }
}