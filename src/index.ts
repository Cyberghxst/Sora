import { GatewayIntentBits } from 'discord.js'
import { Sora } from '@structures/Sora'

const client = new Sora({
    events: {
        client: [
            'ready',
            'interactionCreate'
        ],
        player: [
            'audioTrackAdd',
            'audioTrackRemove'
        ]
    },
    intents: GatewayIntentBits.Guilds
    | GatewayIntentBits.GuildMessages
    | GatewayIntentBits.GuildVoiceStates
})