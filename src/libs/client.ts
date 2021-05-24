import { Client as DiscordClient, ClientOptions, Collection } from 'discord.js';
import Command from './command';

class Client extends DiscordClient {
  public commands: Collection<string, Command>;

  public constructor(props: ClientOptions) {
    super(props);
    this.commands = new Collection();
  }
}

export default Client;
