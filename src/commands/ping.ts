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
        if (!interaction.member.voice.channel) {
            return Output.error('You must be connected to a voice channel!')
        }

        const query = interaction.options.getString('query', true)
        let connectionRetries = 10
        let succeed = false
        let currentTry = 0
        let lastReason = 'No reason.'

        await interaction.deferReply()

        while (currentTry < connectionRetries && !succeed) {
            try {
                const result = await this.player.play(interaction.member.voice.channel, query)
                await interaction.followUp({
                    content: `Playing "${result.track.cleanTitle}" by **${result.track.author}**.\n-# Connection try: ${currentTry + 1}`
                })
                succeed = true
            } catch (e: any) {
                currentTry++
                lastReason = e.message
            }
        }

        if (currentTry === connectionRetries) {
            return Output.error(`Unable to play the track after ${connectionRetries} retries with reason:\n-# ${lastReason}`)
        }

        return Output.success();
    },
    validate: [
        (client, interaction) => interaction.user.id === '590267498192961540',
        (client, interaction) => interaction.guild.id === '966131185120059424'
    ]
}
