const { join } = require('path')
const WATERMARK_PATH = join(process.cwd(), 'sounds', 'SORA_WATERMARK.wav').replace(/\\/g, '/')

module.exports = [
    {
        name: 'toPascalCase',
        params: [
            'text'
        ],
        code: `
            $arrayLoad[parts; ;$env[text]]
            $arrayMap[parts;part;
                $return[$toUpperCase[$textSlice[$env[part];0;1]]$textSlice[$env[part];1]]
            ;result]

            $return[$arrayJoin[result;]]
        `
    },
    {
        name: 'playWatermark',
        params: [
            'voiceId'
        ],
        code: `
            $playTrack[$env[voiceId];${WATERMARK_PATH};file]
        `
    }
]