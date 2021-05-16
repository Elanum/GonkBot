import commands from '../commands';
import Client from '../libs/client';
import logger from '../utils/logger';

require('dotenv').config();

const { TEST_SERVER = '' } = process.env;

const onReady = async (client: Client): Promise<void> => {
  commands.forEach((Cmd) => {
    const cmd = new Cmd();
    client.commands.set(cmd.name, cmd);
  });

  await client.guilds.cache
    .get(TEST_SERVER)
    ?.commands.set(client.commands.map((c) => c.commandData));

  logger.info(`Loaded ${client.commands.size} commands!`);
  logger.debug(`Commands: ${client.commands.map((c) => c.name)}`);
  logger.info(`Logged in as ${client.user?.tag}!`);
};

export default onReady;
