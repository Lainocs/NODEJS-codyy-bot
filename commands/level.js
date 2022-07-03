const Discord = require('discord.js');
const mySqlConnector = require('../src/MySqlConnector');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
    // get level channel
    const levelChannel = message.guild.channels.cache.find(channel => channel.name === process.env.LEVEL_CHANNEL);
    // send on levelChannel
    // get xp
    const xp = await mySqlConnector.executeQuery(`SELECT * FROM xp WHERE user_id = '${message.author.id}' AND server_id = '${message.guild.id}'`);

    const embed = new Discord.MessageEmbed()
                    .setTitle('Ton niveau')
                    .setDescription(`<@${message.author.id}> est niveau ${xp[0].xp_level} !`)
                    .setColor('#ff0000')
                    .setThumbnail(message.author.avatarURL())

    levelChannel.send({embeds: [embed]})
};

module.exports.name = 'level';