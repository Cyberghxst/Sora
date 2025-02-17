const { collectFiles } = require('../../functions/collectFiles')
const Command = require('./Command')

/**
 * The global command registry.
 * @type {Map<string, Command>}
 */
const globalCommands = new Map()

class CommandManager {
    /**
     * The commands to add.
     * @param {(typeof Command)[]} commands - The commands to be added.
     * @returns {void}
     */
    add(...commands) {
        for (const command of commands) {
            const instancedCommand = new command()
            globalCommands.set(instancedCommand.toJSON.name, instancedCommand)
        }
    }

    /**
     * Load commands from directory.
     * @param {string} dir - The directory to load cmds from.
     * @returns {void}
     */
    load(dir) {
        const commands = collectFiles(
            dir,
            f => f.endsWith('.js'),
            fold => fold === 'node_modules'
        ).map(path => require(path).default)
        .map(cmd => new cmd())

        for (const cmd of commands) {
            globalCommands.set(cmd.data.name, cmd)
        }
    }

    /**
     * Return the cached commands as array.
     * @returns {Command[]}
     */
    all() {
        return Array.from(globalCommands.values())
    }
}

module.exports = { globalCommands, CommandManager }