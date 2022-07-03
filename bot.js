const clientLoader = require('./src/clientLoader');
const commandLoader = require('./src/commandLoader');
const MysqlConnector = require('./src/MySqlConnector');
const roleFunction = require('./functions/role');
const levelFunction = require('./functions/level');
const commandFunction = require('./functions/command');

require('colors');

MysqlConnector.connect();

clientLoader.createClient(['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'])
  .then(async (client, member) => {
    await commandLoader.load(client);
    await roleFunction.addRole(client, member);
    await levelFunction.level(client);
    await commandFunction.command(client);
  });
