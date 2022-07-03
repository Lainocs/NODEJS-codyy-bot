const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
    // get message content
    const content = message.content;
    // look if someone is mentioned in the message
    const mentioned = message.mentions.users.first();

    if (mentioned != null) {
        message.channel.send(`<@${mentioned.id}> merci d'être là !`);
    }
};

module.exports.name = 'reward';
