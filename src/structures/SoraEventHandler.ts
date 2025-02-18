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
export abstract class BaseEventHandler<Events = Record<string, unknown>, Names extends keyof Events = keyof Events> {
    constructor(private data: EventHandlerData<Events, Names>) {}
    abstract attach(client: Sora): void
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
export class DiscordEventHandler<K extends keyof ClientEvents = keyof ClientEvents> extends BaseEventHandler<ClientEvents, K> {
    attach(client: Sora) {
        client[this.once ? 'once' : 'on'](this.name, this.execute.bind(client) as any)
    }
}

export type CorrectedGuildQueueEvents = {
    [K in keyof GuildQueueEvents]: Parameters<GuildQueueEvents[K]>
}

/**
 * The music player event handler.
 */
export class PlayerEventHandler<K extends keyof GuildQueueEvents = keyof GuildQueueEvents> extends BaseEventHandler<CorrectedGuildQueueEvents, K> {
    attach(client: Sora) {
        client.player.events[this.once ? 'once' : 'on'](this.name, this.execute.bind(client) as any)
    }
}