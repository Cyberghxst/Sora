const { Arg, ArgType, NativeFunction } = require('@tryforge/forgescript')
const { unparseDigital } = require('../unparseDigital')

exports.default = new NativeFunction({
    name: '$fixedUnparseDigital',
    description: 'Fixed version of native $unparseDigital.',
    brackets: true,
    unwrap: true,
    version: '1.0.0',
    args: [
        Arg.requiredString('duration', 'Digital duration to unparse.')
    ],
    output: ArgType.Number,
    execute: function(ctx, [duration]) {
        try {
            return this.success(unparseDigital(duration))
        } catch (error) {
            return this.error(error)
        }
    }
})