import type { AutocompleteInteraction, ChatInputApplicationCommandData, ChatInputCommandInteraction } from 'discord.js'
import type { Sora } from './Sora'

export interface SoraChatInputCommandData extends Omit<ChatInputApplicationCommandData, 'name'> {
    /**
     * The name of the command.
     */
    name: string | string[]
    /**
     * Executes the given callbacks before executing the command.
     */
    validate?: Array<(this: Sora, ...args: Parameters<SoraChatInputCommandData['execute']>) => boolean>
    /**
     * The executor of this command.
     * @param this - The sora client instance.
     * @param interaction - The current command interaction context.
     * @returns {Promise<any>}
     */
    execute: (this: Sora, interaction: ChatInputCommandInteraction) => Promise<any>
}