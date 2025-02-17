var { SlashCommandBuilder } = require('discord.js')

/**
 * @typedef CommandArg
 * @property {import('discord.js').ChatInputCommandInteraction} interaction - The interaction context.
 * @property {import('./DiscordClient').DiscordClient} client - The discord client instance.
 */

class Command {
    /**
     * @type {SlashCommandBuilder}
     */
    data = null

    /**
     * @type {?((arg: CommandArg) => boolean)[]}
     */
    validators = null

    /**
     * @type {(arg: CommandArg): Promise<unknown>}
     */
    execute = null

    /**
     * The slash command data as JSON.
     */
    get toJSON() {
        return this.data.toJSON()
    }
}

module.exports = Command