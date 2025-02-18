import { CommandManager } from '@managers/CommandManager'
import { GatewayIntentBits } from 'discord.js'
import { Sora } from '@structures/Sora'

CommandManager.load(__dirname + '/commands')
process.loadEnvFile()

// Create the awesome sora.
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

client.login(process.env.TOKEN!)