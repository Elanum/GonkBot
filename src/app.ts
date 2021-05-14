import {
  Client, Intents, Interaction, Message,
} from 'discord.js';
import logger from './util/logger';

require('dotenv').config();

const { TOKEN, TEST_SERVER = '' } = process.env;

const client: Client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => logger.info(`Logged in as ${client.user?.tag}!`));

client.on('message', async (message: Message): Promise<void> => {
  if (!client.application?.owner) await client.application?.fetch();

  if (
    message.content.toLowerCase() === '!deploy'
    && message.author.id === client.application?.owner?.id
  ) {
    const data = [
      {
        name: 'ping',
        description: 'Replies with Pong!',
      },
      {
        name: 'echo',
        description: 'Replies with your input!',
        options: [
          {
            name: 'input',
            type: 'STRING',
            description: 'The input which should be echoed back',
            required: true,
          },
        ],
      },
    ];

    const command = await client.guilds.cache
      .get(TEST_SERVER)
      ?.commands.set(data);
    message.channel.send(`Successfully initialized ${command?.size} commands`);
  }
});

client.on('interaction', async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!', { ephemeral: true });
  }
  if (interaction.commandName === 'echo') {
    const input: string = interaction.options[0].value?.toString() || '';
    await interaction.reply(input, { ephemeral: true });
  }
});

client
  .login(TOKEN)
  .then(() => logger.info('🚀 Bot started'))
  .catch((error: Error) => logger.error(error.message));
