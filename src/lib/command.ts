import type {
  ChatInputApplicationCommandData,
  CommandInteraction
} from 'discord.js'

export interface ICommand {
  readonly data: ChatInputApplicationCommandData
  readonly execute: (interaction: CommandInteraction) => Promise<void>
}
