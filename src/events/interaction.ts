import { Interaction } from 'discord.js';
import Client from '../libs/client';

const onInteraction = async (
  client: Client,
  interaction: Interaction,
): Promise<void> => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;
  const command = client.commands.find((c) => c.name === commandName);
  if (command) await command.sendResponse(interaction);
};

export default onInteraction;
