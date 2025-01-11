const { ArgType, NativeFunction } = require('@tryforge/forgescript')

exports.default = new NativeFunction({
    name: '$usersInVoiceChannel',
    description: 'Returns the count of users connected to a voice channel.',
    brackets: true,
    unwrap: true,
    version: '1.0.0',
    args: [
        {
            name: 'Channel ID',
            description: 'The voice channel to check.',
            type: ArgType.Channel,
            check: c => c.isVoiceBased(),
            required: true,
            rest: false
        }
    ],
    output: ArgType.Number,
    execute: function(ctx, [channel]) {
        console.log('CHHH', channel)
        return this.success(channel.members?.cache?.size ?? 0)
    }
})