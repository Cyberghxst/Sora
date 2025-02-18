import { DiscordEventHandler } from '@structures/SoraEventHandler'
import { ChatInputCommandInteraction, Events } from 'discord.js'
import { CommandManager } from '@managers/CommandManager'

export default new DiscordEventHandler({
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            let commands = CommandManager.toArray()
            const subcommand = interaction.options.getSubcommand(false)
            if (!subcommand) {
                const command = commands.find(c => c.name === interaction.commandName)
                if (!command) return;

                // Execute each validator if any.
                if (command.validate) {
                    for (const validator of command.validate) {
                        const result = validator.call(this, interaction as ChatInputCommandInteraction<'cached'>)
                        if (!result) return;
                    }
                }

                // Execute the command.
                await command.execute.call(this, interaction as ChatInputCommandInteraction<'cached'>)
            }
        }
    }
})