const { NativeFunction, ArgType } = require('@tryforge/forgescript')
const { ForgeMusic, QueryType } = require('@tryforge/forge.music')
const { join } = require('path')

const WATERMARK_PATH = join(process.cwd(), '/sounds', 'SORA_WATERMARK.wav')

exports.default = new NativeFunction({
    name: '$playWatermark',
    description: 'Plays the client watermark.',
    brackets: true,
    unwrap: true,
    version: '1.0.0',
    args: [
        {
            name: 'Channel ID',
            description: 'The channel ID to play the watermark in.',
            type: ArgType.Channel,
            check: t => t.isVoiceBased(),
            required: true,
            rest: false
        }
    ],
    execute: async function(ctx, [voiceChannel]) {
        const player = ctx.getExtension(ForgeMusic, true).player
        const result = await player.play(voiceChannel, WATERMARK_PATH, {
            nodeOptions: {
                leaveOnEnd: false,
                leaveOnStop: false,
                leaveOnEmpty: false
            },
            searchEngine: 'file'
        }).catch(e => e)

        return result instanceof Error
            ? this.customError('Unable to play the watermark!' + result)
            : this.success()
    }
})