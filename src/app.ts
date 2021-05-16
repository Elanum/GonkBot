import { Intents, Interaction, Message } from 'discord.js';
import { onInteraction, onMessage, onReady } from './events';
import Client from './libs/client';
import logger from './utils/logger';

require('dotenv').config();

const { TOKEN } = process.env;

const client: Client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => onReady(client));
client.on('message', (message: Message) => onMessage(message));
client.on('interaction', (interaction: Interaction) => onInteraction(client, interaction));

client
  .login(TOKEN)
  .then(() => logger.info('🚀 Bot started'))
  .catch((error: Error) => logger.error(error.message));
