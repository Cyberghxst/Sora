import type { ChatInputApplicationCommandData, ChatInputCommandInteraction } from 'discord.js'
import type { Sora } from './Sora'

export interface SoraChatInputCommandData extends Omit<ChatInputApplicationCommandData, 'name'> {
    /**
     * The name of the command.
     */
    name: string
    /**
     * Executes the given callbacks before executing the command.
     */
    validate?: Array<(client: Sora, ...args: Parameters<SoraChatInputCommandData['execute']>) => boolean>
    /**
     * The executor of this command.
     * @param this - The sora client instance.
     * @param interaction - The current command interaction context.
     * @returns {Promise<any>}
     */
    execute: (this: Sora, interaction: ChatInputCommandInteraction<'cached'>) => Output | Promise<Output>
}

/**
 * The possible command output types.
 */
export enum OutputType {
    Error,
    Success
}

export class Output<Type extends OutputType = OutputType, Value = unknown> {
    static error(value?: string | Error) {
        return new Output(OutputType.Error, value)
    }
    static success(value?: unknown) {
        return new Output(OutputType.Success, value)
    }
    constructor(public type: Type, public value?: Value) {}
    isSuccess(): this is Output<OutputType.Success, string> {
        return this.type === OutputType.Success
    }
    isError(): this is Output<OutputType.Error, string | Error> {
        return this.type === OutputType.Error
    }
}