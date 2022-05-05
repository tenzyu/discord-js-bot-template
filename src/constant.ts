import { config } from 'dotenv'
import { join } from 'path'

config({ path: join(__dirname, '..', '.env') })

export const TOKEN_BOT_DISCORD = process.env.TOKEN_BOT_DISCORD
export const ID_GUILD_MAIN =
  process.env.ID_GUILD_MAIN ?? 'Here default ID_GUILD_MAIN'
export const ID_CHANNEL_BOT_ACTIVITY =
  process.env.ID_CHANNEL_BOT_ACTIVITY ?? 'Here default ID_CHANNEL_BOT_ACTIVITY'
