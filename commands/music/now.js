module.exports = {
    data: {
        name: 'now',
        description: '💿 → Shows the song that is being played now.'
    },
    code: `
        $c[Checking for the command author to be connected to a voice channel.]
        $onlyIf[$voiceID[$guildID;$authorID]!=;
            $interactionReply[
                $author[Disallowed Action]
                $description[You must be connected to a voice channel to perform this action.]
                $footer[$username[$clientID] Music]
                $color[FFFFFF]
                $timestamp
            ]
            $stop
        ]

        $c[Checking for the client to be connected to a voice channel.]
        $onlyIf[$voiceID[$guildID;$clientID]!=;
            $interactionReply[
                $author[Disallowed Action]
                $description[I am not connected to a voice channel.]
                $footer[$username[$clientID] Music]
                $color[FFFFFF]
                $timestamp
            ]
            $stop
        ]

        $c[Checking the author to be connected to the same channel as client.]
        $onlyIf[$voiceID[$guildID;$clientID]==$voiceID[$guildID;$authorID];
            $interactionReply[
                $author[Disallowed Action]
                $description[You must be connected to the same voice channel as me.]
                $footer[$username[$clientID] Music]
                $color[FFFFFF]
                $timestamp
            ]
            $stop
        ]

        $c[Checking if the bot has a music node created.]
        $if[$hasMusicNode==false;
            $interactionReply[
                $author[Disallowed Action]
                $description[There is not a music service active in this guild.]
                $footer[$username[$clientID] Music]
                $color[FFFFFF]
                $timestamp
            ]
            $stop
        ]

        $c[Show the song that is playing now.]
        $interactionReply[
            $title[💿 → Playing now...]
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

            $c[Add incoming tracks if there are queued tracks.]
            $if[$queueLength>0;
                $arrayLoad[tracks;_ඞ_ඞ_;$queue[0;5;{position}. **{track.cleanTitle}** by **{track.author}**;_ඞ_ඞ_]]
                $title[Incoming Tracks;;1]
                $description[$arrayJoin[tracks;\n];1]
                $footer[$username[$clientID] Music;$userAvatar[$clientID];1]
                $color[FFFFFF;1]
                $timestamp[;1]
            ]
        ]
    `
}