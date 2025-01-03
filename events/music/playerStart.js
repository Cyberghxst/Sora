const { GuildQueueEvent } = require('@tryforge/forge.music')

module.exports = {
    type: GuildQueueEvent.PlayerStart,
    code: `
        $c[Storing the message ID.]
        $let[messageId;$sendMessage[$channelID;
            $title[Playing now...]
            $if[$trackInfo[thumbnail]!=;
                $thumbnail[$trackInfo[thumbnail]]
            ]
            $addField[Song Name;$if[$checkContains[$trackInfo[cleanTitle];-]==false;$trackInfo[cleanTitle];$advancedTextSplit[$trackInfo[cleanTitle];-;1]]]
            $addField[Author;$if[$checkContains[$trackInfo[cleanTitle];-]==false;$trackInfo[author];$advancedTextSplit[$trackInfo[cleanTitle];-;0]]]
            $addField[Duration;$trackInfo[duration]]
            $addField[Requester;$trackInfo[requestedBy]]
            $footer[$username[$clientID] Music;$userAvatar[$clientID]]
            $color[FFFFFF]
            $timestamp
        ;true]]

        $c[Deleting the previous message passed the duration of the song.]
        $setTimeout[
            $if[$messageExists[$channelID;$get[messageId]];
                $deleteMessage[$channelID;$get[messageId]]
            ]
        ;$fixedUnparseDigital[$trackInfo[duration]]]
    `
}