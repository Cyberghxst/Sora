import { DiscordEventHandler } from '@structures/SoraEventHandler'
import { CommandManager } from '@managers/CommandManager'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.ClientReady,
    once: true,
    execute() {
        const commands = CommandManager.toArray()
        this.application.commands.set(commands, '966131185120059424')
        .then(success => console.info('The commands were updated!'))
        .catch(error => console.info('Unable to sync commands.'))
    }
})