module.exports = {
    name: 'eval',
    aliases: ['e'],
    type: 'messageCreate',
    code: `
        $onlyIf[$authorID==$getGlobalVar[ownerId];]

        $eval[$message]
    `
}