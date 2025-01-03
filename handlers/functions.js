module.exports = [
    {
        name: 'fixedUnparseDigital',
        params: [
            'digitalDuration'
        ],
        code: `
            $djsEval[
                eval('$readFile[./unparseDigital.js;utf-8]');
                const unparsed = unparseDigital('$env[digitalDuration]');
                ctx.setEnvironmentKey('unparsed', unparsed);
            ]
            
            $return[$get[unparsed]]
        `
    }
]