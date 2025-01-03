const { GuildQueueEvent } = require('@tryforge/forge.music')

module.exports = {
    type: GuildQueueEvent.EmptyQueue,
    code: `
        $c[Storing the message ID.]
        $let[messageId;$sendMessage[$channelID;
            $title[Warning]
            $description[**Queue is empty!**\n-# Awaiting 60 seconds to leave...]
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