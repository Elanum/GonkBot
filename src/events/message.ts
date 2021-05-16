import { Message } from 'discord.js';
import logger from '../utils/logger';

const onMessage = async (message: Message): Promise<void> => {
  if (!message.author.bot) {
    logger.debug(`${message.author.tag} -> ${message.toString()}`);
  }
};

export default onMessage;
