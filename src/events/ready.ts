import { Client } from 'discord.js';
import logger from '../utils/logger';

const onReady = (client: Client) => {
  logger.info(`Logged in as ${client.user?.tag}!`);
};

export default onReady;
