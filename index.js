// We require the `Client` class from discord.js needed to instantiate the client.
const { Client, MessageEmbed, WebhookClient, GatewayIntentBits } = require('discord.js');
// We require the `SlashHandler` class we put in the `slash-handler.js` file.
const SlashHandler = require('./slash-handler.js');
const webhookClient = new WebhookClient({ id: '1002147434887131136', token: '2tJ3p7f4AKeO06UA3R8h4wg45GwyND9qNqOMUltLgJ11B6Fh5m1Wq4rW5-61m8lrBjRx' });


// We instantiate the client with the intents we'll use in this example.
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent,
	]
});

const conf = require('./conf.js')

// We instantiate a slash-handler instance and pass our instantiated client to it, and we pass the path of the directory (or folder) we created the slash-commands in.
const slashHandler = new SlashHandler(client, './commands');

// We add a `ready` event listener for the client to execute a method when it's ready, and call the `register` method on our slash-handler instance to register the slash-commands we wrote in our `commands` directory (or folder).
client.once('ready', async () => {
	// Register the slash-commands.
	await slashHandler.register();

	// Log something when the client is ready.
	console.log(`${client.user.tag} is ready for action!`);
});

// Here we add an `interactionCreate` event listener so we can respond to the interactions made by the slash-commands we made.
client.on('interactionCreate', async (interaction) => {
	// Ignore if the interaction is not a slash-command.
	if (!interaction.isCommand()) return;

	// Get the slash-command from the stored slash-commands.
	const command = client.commands.get(interaction.commandName);

	// If the slash-command requested doesn't exist, ignore and let it fail.
	if (!command) return;

	try {
		// Execute the slash-command.
		await command.execute(interaction, client);
	} catch (err) {
		// Log the error if an error occured while executing the slash-command.
		console.error(`An error occured while trying to execute the '${interaction.commandName}' command: ${err.stack}`);
	}
});

// Finally we login to the bot by using it's token.
void client.login(conf.token);