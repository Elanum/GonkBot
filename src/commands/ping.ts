import { CommandInteraction, MessageEmbed } from 'discord.js';
import Command from '../libs/command';

class Ping extends Command {
  public constructor() {
    super({
      name: 'ping',
      description: 'Replies with the current latency',
    });
  }

  public async sendResponse(interaction: CommandInteraction): Promise<void> {
    const ping = `Ping is ${Date.now() - interaction.createdTimestamp}ms`;
    const response = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('Ping')
      .setDescription(ping);
    await interaction.reply({
      ephemeral: true,
      embeds: [response],
    });
  }
}

export default Ping;
