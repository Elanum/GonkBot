import { CommandInteraction, MessageEmbed } from 'discord.js';
import prettyMilliseconds from 'pretty-ms';
import Command from '../libs/command';

class Info extends Command {
  public constructor() {
    super({
      name: 'info',
      description: 'Information about the Bot',
    });
  }

  public async sendResponse(interaction: CommandInteraction): Promise<void> {
    const { npm_package_version } = process.env;
    const { id, username } = interaction.client.user!;
    const memory = process.memoryUsage().heapUsed / 1024 / 1024;
    const response = new MessageEmbed()
      .setTitle(`${username} v${npm_package_version}`)
      .setColor('BLUE')
      .addField('Developer', '[Elanum](https://elanum.de)', true)
      .addField('Bot ID', id, true)
      .addField('Memory Usage', `${Math.round(memory * 100) / 100} MB`, true)
      .addField('Bugs', 'https://github.com/Elanum/GonkBot/issues', true)
      .addField('Uptime', prettyMilliseconds(interaction.client.uptime!));
    await interaction.reply(response);
  }
}

export default Info;
