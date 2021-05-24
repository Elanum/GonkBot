import {
  ApplicationCommandData,
  CommandInteraction,
} from 'discord.js';

abstract class Command {
  public data: ApplicationCommandData;

  public constructor(data: ApplicationCommandData) {
    this.data = data;
  }

  public get name(): string {
    return this.data.name;
  }

  public get description(): string {
    return this.data.description;
  }

  abstract sendResponse(interaction: CommandInteraction): Promise<void>;
}

export default Command;
