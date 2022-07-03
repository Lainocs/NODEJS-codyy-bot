const fs = require('fs');

module.exports = {
  load: (client) => {
    // Créer l'objet de stockage des commandes dans le client s'il n'existe pas déjà
    if (!client.hasOwnProperty('commands')) {
      client.commands = new Map();
    }

    fs.readdirSync('./commands') // Lis le dossier commands
      .filter((file) => file.endsWith('.js')) // Ne garde que les fichiers JS
      .forEach((file) => {
        const command = require('../commands/' + file);

        // On récupère le nom de la fonction déclaré avec module.exports.name dans le fichier de la commande
        const commandName = command.name;

        // On ajoute la commande avec son nom dans une map accessible depuis notre client Discord
        client.commands.set(commandName, command);

        console.log(`The ${commandName} command has been loaded!`.green);
      })
  }
};
