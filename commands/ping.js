var { SlashCommandBuilder } = require('discord.js')
var Command = require('../classes/structures/Command')

exports.default = class PingCommand extends Command {
    data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Shows the client websocket latency.')

    /**
     * Validators to execute before command execution.
     * @type {((interaction: import('discord.js').ChatInputCommandInteraction) => boolean)[]}
     */
    validators = [
        ({ interaction }) => interaction.user.id === '590267498192961540'
    ]

    /**
     * The callback of this command.
     * @param {import('../classes/structures/Command').CommandArg} arg0
     * @returns {Promise<unknown>}
     */
    execute = async ({ interaction, client }) => {
        if (client.ws.ping !== -1) {
            await interaction.reply({
                content: `My websocket ping is: ${client.ws.ping} ms`
            })
        } else {
            await interaction.reply('Unable to fetch the ping right now.')
        }
    }
}