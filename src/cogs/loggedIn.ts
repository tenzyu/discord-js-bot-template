import { TextChannel } from 'discord.js'

import { client } from '..'
import { ID_CHANNEL_BOT_ACTIVITY } from '../constant'

client.on('ready', async () => {
  const channel = getTextChannelOrNull(ID_CHANNEL_BOT_ACTIVITY)

  await channel?.send('Logged in')
})

const getTextChannelOrNull = (id: string): TextChannel | null => {
  const channel = client.channels.cache.get(id)

  return channel instanceof TextChannel ? channel : null
}
