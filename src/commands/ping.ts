import { Output, type SoraChatInputCommandData } from '@structures/SoraCommand'
import { ApplicationCommandOptionType } from 'discord.js'

export const data: SoraChatInputCommandData = {
    name: 'play',
    description: 'Plays a song.',
    options: [
        {
            name: 'query',
            description: 'The query to search.',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async execute(interaction) {
        if (!interaction.member.voice) {
            return Output.error('You must be connected to a voice channel!')
        }

        const query = interaction.options.getString('query', true)
        try {
            const result = await this.player.play(interaction.member.voice.id, query)
            const { track } = result

            await interaction.reply(`Playing ${track.cleanTitle} by **${track.author}**.`)
        } catch (e: any) {
            return Output.error(`Unable to play the track with reason:\n-# ${e.message}`)
        }


        return Output.success();
    },
    validate: [
        function (interaction) {
            return interaction.user.id === '590267498192961540'
        }
    ]
}
