import {
  Client, Intents, Interaction, Message,
} from 'discord.js';
import { onReady, onMessage, onInteraction } from './events';

import logger from './utils/logger';

require('dotenv').config();

const { TOKEN } = process.env;

const client: Client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => onReady(client));
client.on('message', (message: Message) => onMessage(client, message));
client.on('interaction', (interaction: Interaction) => onInteraction(interaction));

client
  .login(TOKEN)
  .then(() => logger.info('🚀 Bot started'))
  .catch((error: Error) => logger.error(error.message));
