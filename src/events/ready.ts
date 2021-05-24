import commands from '../commands';
import Client from '../libs/client';
import logger from '../utils/logger';

const { TEST_SERVER } = process.env;

const onReady = async (client: Client): Promise<void> => {
  commands.forEach((Command) => {
    const command = new Command();
    client.commands.set(command.name, command);
  });

  if (!TEST_SERVER) throw new Error('No TEST_SERVER defined!');
  await client.guilds.cache
    .get(TEST_SERVER)
    ?.commands.set(client.commands.map((c) => c.data));

  logger.info(`Loaded ${client.commands.size} commands!`);
  logger.debug(`Commands: ${client.commands.map((c) => c.name)}`);
  logger.info(`Logged in as ${client.user?.tag}!`);
};

export default onReady;
