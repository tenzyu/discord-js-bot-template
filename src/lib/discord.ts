import { Client, CommandInteraction } from 'discord.js'
import { readdir } from 'fs/promises'
import { join, parse } from 'path'

import { ICommand } from './command'

export class MyBot extends Client {
  readonly commands: ICommand[] = []
  // NOTE: must be an absolute path
  readonly pathToCogs = join(__dirname, '..', 'cogs')
  readonly pathToCommands = join(__dirname, '..', 'commands')

  async loadCogs() {
    const files = await readdir(this.pathToCogs)

    files.map(parse).forEach(async ({ name }) => {
      // NOTE: must be a relative path
      const path = join('..', 'cogs', name)

      await import(path).then((_) => console.log(`loaded ${name} cog`))
    })
  }

  async loadCommand(guildId: string): Promise<void> {
    const files = await readdir(this.pathToCommands)

    files.map(parse).forEach(async ({ name }) => {
      // NOTE: must be a relative path
      const path = join('..', 'commands', name)
      const { data, execute }: ICommand = (await import(path)).default

      this.commands.push({ data, execute })
    })

    this.once('ready', async () => {
      // NOTE: Log each one. Use set() instead of create() if launch performance is important.
      this.commands.forEach(async ({ data }) => {
        await this.application?.commands
          .create(data, guildId)
          .then((_) => console.log(`created command ${data.name}`))
          .catch((error) =>
            console.error(`failed to create ${data.name}\n${error}`)
          )
      })
    })

    this.on('interactionCreate', async (interaction) => {
      if (!(interaction instanceof CommandInteraction)) return

      const command: ICommand | undefined = this.commands.find(
        (command) => interaction.command?.name === command.data.name
      )

      await command?.execute(interaction).catch(console.error)
    })
  }
}
