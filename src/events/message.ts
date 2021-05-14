import { Client, Message } from 'discord.js';
import logger from '../utils/logger';

require('dotenv').config();

const { TEST_SERVER = '' } = process.env;

const onMessage = async (client: Client, message: Message) => {
  logger.debug(`${message.author.tag} -> ${message.content}`);
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
};

export default onMessage;
