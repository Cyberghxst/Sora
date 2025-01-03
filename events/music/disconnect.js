const { GuildQueueEvent } = require('@tryforge/forge.music')

module.exports = {
    type: GuildQueueEvent.Disconnect,
    code: `
        $c[Storing the message ID.]
        $let[messageId;$sendMessage[$channelID;
            $title[Disconnected]
            $description[Client disconnected successfully.]
            $footer[$username[$clientID] Music]
            $color[FFFFFF]
            $timestamp
        ;true]]

        $c[Deleting the previous message passed 60 seconds.]
        $setTimeout[
            $if[$messageExists[$channelID;$get[messageId]];
                $deleteMessage[$channelID;$get[messageId]]
            ]
        ;60000]
    `
}