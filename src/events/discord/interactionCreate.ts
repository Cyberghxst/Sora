import { DiscordEventHandler } from '@structures/SoraEventHandler'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.InteractionCreate,
    once: false,
    execute(interaction) {
        console.log(`Client ${this.user.username} is ready and connected to Discord.`)
    }
})