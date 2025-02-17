import { Player, type PlayerInitOptions } from 'discord-player'
import { DefaultExtractors } from '@discord-player/extractor'
import { Client, type ClientOptions } from 'discord.js'

/**
 * The addition options of Sora.
 */
export interface CustomSoraOptions extends PlayerInitOptions {}

/**
 * A mix of the base client options and Sora ones.
 */
export type SoraInitOptions = CustomSoraOptions & ClientOptions

/**
 * Sora music bot. <3
 */
export class Sora extends Client<true> {
    /**
     * The main discord music player.
     */
    public player: Player

    /**
     * The setup options for Sora.
     * @param options - Options to set the client.
     */
    constructor(options: SoraInitOptions) {
        super(options)
        this.player = new Player(this, options)
    }

    /**
     * Connect the client to Discord.
     * @param token - Auth token to login with.
     * @returns {Promise<string>}
     */
    override async login(token: string) {
        await this.player.extractors.loadMulti(DefaultExtractors)
        return await super.login(token)
    }
}
