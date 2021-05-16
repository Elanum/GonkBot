import {
  APIMessage,
  ApplicationCommandData,
  CommandInteraction,
  MessageAdditions,
  MessageEmbed,
} from 'discord.js';

const defaultResponse: MessageEmbed = new MessageEmbed()
  .setTitle('ERROR')
  .setColor('RED')
  .setDescription('No response defined');

type CommandResponse = string | APIMessage | MessageAdditions;

class Command {
  private data: ApplicationCommandData;

  private responseMessage: CommandResponse = defaultResponse;

  public constructor(data: ApplicationCommandData) {
    this.data = data;
  }

  public get name(): string {
    return this.data.name;
  }

  public get description(): string {
    return this.data.description;
  }

  public get commandData(): ApplicationCommandData {
    return this.data;
  }

  public set response(data: CommandResponse) {
    this.responseMessage = data;
  }

  public get response(): CommandResponse {
    return this.responseMessage;
  }

  public async sendResponse(interaction: CommandInteraction): Promise<void> {
    await interaction.reply(this.response);
  }
}

export default Command;
