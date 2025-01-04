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
    }
]