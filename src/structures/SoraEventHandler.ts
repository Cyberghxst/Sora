import type { GuildQueueEvents } from 'discord-player'
import type { ClientEvents } from 'discord.js'
import { Sora } from './Sora'

export type AssertArgs<T> = T extends unknown[] ? T : never

/**
 * The event handler data.
 */
export interface EventHandlerData<Events = Record<string, unknown[]>, K extends keyof Events = keyof Events> {
    /**
     * The name of the event.
     */
    name: K
    /**
     * Whether execute the event once.
     */
    once: boolean
    /**
     * The callback to execute.
     */
    execute: (this: Sora, ...args: AssertArgs<Events[K]>) => void | Promise<void>
}

/**
 * The base event handler class.
 */
export class BaseEventHandler<Events = Record<string, unknown>, Names extends keyof Events = keyof Events> {
    constructor(private data: EventHandlerData<Events, Names>) {}
    public get name() {
        return this.data.name
    }
    public get once() {
        return this.data.once
    }
    public get execute() {
        return this.data.execute
    }
}

/**
 * The discord event handler.
 */
export class DiscordEventHandler<K extends keyof ClientEvents> extends BaseEventHandler<ClientEvents, K> {}

/**
 * The music player event handler.
 */
export class PlayerEventHandler<K extends keyof GuildQueueEvents> extends BaseEventHandler<GuildQueueEvents, K> {}