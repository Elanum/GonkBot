import { Intents, Interaction, Message } from 'discord.js';
import { onInteraction, onMessage, onReady } from './events';
import Client from './libs/client';
import logger from './utils/logger';

const { TOKEN, npm_package_version } = process.env;

const client: Client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => onReady(client));
client.on('message', (message: Message) => onMessage(message));
client.on('interaction', (interaction: Interaction) => onInteraction(client, interaction));
client.on('error', (error) => logger.error(error.message));

client
  .login(TOKEN)
  .then(() => logger.info(`🚀 Bot started on version ${npm_package_version}`))
  .catch((error: Error) => logger.error(error.message));

process.on('unhandledRejection', (error) => logger.error(`Unhandled promise rejection: ${JSON.stringify(error)}`));
