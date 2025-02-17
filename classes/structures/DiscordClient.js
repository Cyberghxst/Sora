var { DefaultExtractors } = require('@discord-player/extractor')
var { Player } = require('discord-player')
var { Client } = require('discord.js')
var { CommandManager } = require('./Commands')

/**
 * @typedef {{ player: import('discord-player').PlayerInitOptions} & import('discord.js').ClientOptions} DiscordClientSetupOptions
 */

/**
 * The discord.js Client class with extended functionality.
 */
class DiscordClient extends Client {
    #player = null
    #cmds = new CommandManager()

    /**
     * Set the options for the DiscordClient.
     * @param {DiscordClientSetupOptions} options 
     */
    constructor(options) {
        super(options)
        this.#player = new Player(this, options.player)
    }

    /**
     * The command manager.
     */
    get commands() {
        return this.#cmds
    }

    /**
     * The music player.
     * @returns {Player}
     */
    get player() {
        return this.#player
    }

    /**
     * Connect the client to Discord.
     * @param {string} token - The token to log-in.
     * @returns {Promise<string>}
     */
    async login(token) {
        await this.player.extractors.loadMulti(DefaultExtractors)
        return await super.login(token)
    }
}

module.exports = { DiscordClient }