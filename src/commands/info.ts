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
    const { client } = interaction;
    const {
      uptime, user, users, guilds,
    } = client;

    if (!user) return;
    const { id, username } = user;

    const guildsAmount = guilds.cache.size;
    const icon = user.avatarURL();
    const memory = process.memoryUsage().heapUsed / 1024 / 1024;
    const memoryUsage = `${Math.round(memory * 100) / 100} MB`;
    const prettyUptime = prettyMilliseconds(uptime || 0, {
      secondsDecimalDigits: 0,
    });
    const usersAmount = users.cache.size;

    const response = new MessageEmbed()
      .setTitle(`${username} v${npm_package_version}`)
      .setColor('BLUE')
      .setDescription('🤖 The most powerful droid on Discord')
      .addField('Developer', '[Elanum](https://elanum.de)', true)
      .addField('Bot ID', id, true)
      .addField(
        'Presence',
        `${guildsAmount} Servers\n${usersAmount} Users`,
        true,
      )
      .addField('Uptime', prettyUptime, true)
      .addField('Memory Usage', memoryUsage, true)
      .addField(
        'Repository',
        '[GitHub](https://github.com/Elanum/GonkBot "GonkBot")',
        true,
      );

    if (icon) response.setThumbnail(icon);

    await interaction.reply(response);
  }
}

export default Info;
