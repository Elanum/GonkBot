import { Interaction } from 'discord.js';
import logger from '../utils/logger';

const onInteraction = async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;
  logger.debug(`${interaction.user.tag} -> /${interaction.commandName}`);
  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!', { ephemeral: true });
  }
  if (interaction.commandName === 'echo') {
    const input: string = interaction.options[0].value?.toString() || '';
    await interaction.reply(input, { ephemeral: true });
  }
};

export default onInteraction;
