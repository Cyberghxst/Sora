const { Arg, ArgType, NativeFunction } = require('@tryforge/forgescript')

exports.default = new NativeFunction({
    name: '$textSlice',
    description: 'Fixed version of native $sliceText.',
    brackets: true,
    unwrap: true,
    version: '1.0.0',
    args: [
        Arg.requiredString('text', 'The text to slice.'),
        Arg.requiredNumber('start index', 'The index to start slicing.'),
        Arg.optionalNumber('end index', 'The index to end slicing.')
    ],
    output: ArgType.String,
    execute: function(ctx, [text, start, end]) {
        return this.success(text.slice(start, end ?? undefined))
    }
})