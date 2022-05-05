import { ID_GUILD_MAIN, TOKEN_BOT_DISCORD } from './constant'
import { MyBot } from './lib/discord'

const bot = new MyBot({
  intents: 32767,
  partials: ['MESSAGE', 'REACTION', 'USER']
})

;(async () => {
  await bot.loadCogs()
  await bot.loadCommand(ID_GUILD_MAIN)
  await bot.login(TOKEN_BOT_DISCORD)
})()
  .then(() => console.log(`logged in as ${bot.user?.username}`))
  .catch(console.error)

export const client = bot
