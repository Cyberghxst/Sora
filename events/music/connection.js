const { GuildQueueEvent } = require('@tryforge/forge.music')

module.exports = {
    type: GuildQueueEvent.Connection,
    code: `
        $try[
            $c[Stop the execution if no voice channel.]
            $let[voiceId;$voiceID[$guildID;$clientID]]
            $if[$get[voiceId]==;$stop]

            $c[Storing the message ID.]
            $let[messageId;$sendMessage[$channelID;
                $title[Connection created]
                $description[Connected to <#$get[voiceId]> successfully.]
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
        ;$logger[Error;Connection throwed an error: $env[error]];error]
    `
}