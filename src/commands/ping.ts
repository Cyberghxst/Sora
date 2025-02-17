import type { SoraChatInputCommandData } from '@structures/SoraCommand'

export const data: SoraChatInputCommandData = {
    name: ['music', 'play'],
    description: '',
    async execute(interaction) {
        await interaction.reply('ok')
    },
}
