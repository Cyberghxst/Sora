import { DiscordEventHandler } from '@structures/SoraEventHandler'
import { ApplicationCommandDataResolvable, Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.ClientReady,
    once: true,
    execute() {
        console.log(`Client ${this.user.username} is ready and connected to Discord.`)
    }
})