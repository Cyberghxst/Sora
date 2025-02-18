import { recursiveCollectFilePaths } from '@utils/recursiveCollectFilePaths'
import type { SoraChatInputCommandData } from '@structures/SoraCommand'

/**
 * The commands registry.
 */
const registry: Record<string, SoraChatInputCommandData> = {}

/**
 * The class that handles every client event.
 */
export class CommandManager {
    /**
     * Adds an event to the given event branch.
     * @param branchName - The branch to add the event to.
     * @param event - The event to add.
     * @returns {void}
     */
    static add(command: SoraChatInputCommandData) {
        registry[command.name] = command
    }

    /**
     * Check whether the given event branch has the given event name.
     * @param branchName - The branch to check the event on.
     * @param eventName - The event name to check.
     * @returns {boolean}
     */
    static exists(commandName: string) {
        return Object.prototype.hasOwnProperty.call(registry, commandName)
    }

    /**
     * Get a command from the registry by name.
     * @param name - The name of the command.
     * @returns {SoraChatInputCommandData | null}
     */
    static get(name: string): SoraChatInputCommandData | null
    /**
     * Get a command from the registry by matching the callback.
     * @param callback - The function to match.
     * @returns {SoraChatInputCommandData | null}
     */
    static get(callback: (command: SoraChatInputCommandData) => boolean): SoraChatInputCommandData | null
    static get(commandNameOrCallback: string | ((command: SoraChatInputCommandData) => boolean)) {
        if (typeof commandNameOrCallback === 'string') {
            return registry[commandNameOrCallback] ?? null
        } else {
            return CommandManager.toArray().find(commandNameOrCallback) ?? null
        }
    }

    /**
     * Load the events of the provided path in the given events branch.
     * @param name - The name of the events branch.
     * @param dir - The dir to load the events from.
     */
    static load(dir: string) {
        const paths = recursiveCollectFilePaths(dir, f => f.endsWith('.js'))
        const commands: SoraChatInputCommandData[] = paths.map(path => require(path).data)

        for (const command of commands) {
            CommandManager.add(command)
        }

        return true
    }

    /**
     * Returns the given branch of loaded events.
     * @param branch - The branch to get.
     * @returns {BaseEventHandler[]}
     */
    static toArray() {
        return Object.values(registry)
    }
}