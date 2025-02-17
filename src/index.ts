import { GatewayIntentBits } from 'discord.js'
import { Sora } from '@structures/Sora'

const client = new Sora({
    intents: GatewayIntentBits.Guilds
    | GatewayIntentBits.GuildMessages
    | GatewayIntentBits.GuildVoiceStates
})