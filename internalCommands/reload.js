module.exports = {
    name: 'reload',
    aliases: ['r', 'u'],
    type: 'messageCreate',
    code: `
        $onlyIf[$authorID==$getGlobalVar[ownerId];]

        $updateCommands
        $updateApplicationCommands

        $logger[Info;Commands updated!]
    `
}