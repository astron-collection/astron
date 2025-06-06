// script pour déployer les commandes slash sur Discord depuis le dossier commands 
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const env = require('dotenv');
const fs = require('fs');
const path = require('path');

const commands = []; // import des commandes 

env.config(); // import des variables d'environnement depuis le fichier .env

// Lire tous les fichiers dans le dossier commands
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
// Pour chaque fichier, importer le module et ajouter la commande à la liste
for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`); // Importer les sous-dossier
    if (command.data && command.data.name) {
        commands.push(command.data.toJSON());
    } else {
        console.warn(`Le fichier ${file} ne contient pas de commande valide.`);
    }
}

// Créer une instance de REST
const rest = new REST({ version: '9' }).setToken(token);
// Déployer les commandes       
(async () => {
    try {
        console.log('Début du déploiement des commandes slash...');
        await rest.put(
            Routes.applicationGuildCommands(clientId),
            { body: commands },
        );
        console.log('Commandes slash déployées avec succès !');
    } catch (error) {
        console.error('Erreur lors du déploiement des commandes :', error);
    }
})();

client.login(process.env.BOT_TOKEN);