import { type GuildQueueEvents, Player, type PlayerInitOptions } from 'discord-player'
import { Client, type ClientEvents, type ClientOptions } from 'discord.js'
import { DefaultExtractors } from '@discord-player/extractor'
import { defaultPlayerEventsPath, EventManager } from '@managers/EventManager'
import { DiscordEventHandler, PlayerEventHandler } from './SoraEventHandler'

/**
 * The addition options of Sora.
 */
export interface CustomSoraOptions extends PlayerInitOptions {
    /**
     * The events to be loaded.
     */
    events: {
        client: Array<keyof ClientEvents>
        player: Array<keyof GuildQueueEvents>
    }
}

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
     * The list of allowed events.
     */
    private allowedEvents: SoraInitOptions['events']

    /**
     * The setup options for Sora.
     * @param options - Options to set the client.
     */
    constructor(options: SoraInitOptions) {
        super(options)
        this.allowedEvents = options.events
        this.player = new Player(this, options)

        EventManager.load() // Load the client events.
        EventManager.load('player', defaultPlayerEventsPath) // Load the player events.

        this.#attachSoraEvents()
        this.#attachPlayerEvents()
    }

    /**
     * Attach the discord client events.
     */
    #attachSoraEvents() {
        const events = EventManager.toArray<DiscordEventHandler>()
        for (const event of events) {
            if (this.allowedEvents.client.includes(event.name)) {
                event.attach(this)
            }
        }
    }

    /**
     * Attach the events of the music player.
     */
    #attachPlayerEvents() {
        const events = EventManager.toArray<PlayerEventHandler>('player')
        for (const event of events) {
            if (this.allowedEvents.player.includes(event.name)) {
                event.attach(this)
            }
        }
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
