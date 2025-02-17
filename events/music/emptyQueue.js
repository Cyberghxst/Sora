const { GuildQueueEvent } = require('@tryforge/forge.music')

module.exports = {
    type: GuildQueueEvent.EmptyQueue,
    code: `
        $try[
            $c[Avoid execution and delete control var when watermark played.]
            $let[history;$queueHistory[0;10;{track.cleanTitle}]]
            $if[$and[$queueHistoryLength==1;$endsWith[$get[history];.wav;$checkContains[$get[history];SORA];$checkContains[$get[history];WATERMARK]]];$stop]

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

                $c[
                    Leave the voice channel if client is still connected and
                    queue is still empty or channel is empty.
                ]
                $if[$and[$voiceID[$guildID;$clientID];$isPlaying==false;$isPaused==false;$or[$queueLength==0;$usersInVoiceChannel[$voiceID[$guildID;$clientID]]==0]];
                    $leaveVoiceChannel
                ]
            ;60000]
        ;$logger[Error;EmptyQueue throwed an error: $env[error]];error]
    `
}