module.exports = {
    data: {
        name: 'disconnect',
        description: '💿 → Destroys the current voice connection.'
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

        $c[Trying to leave the voice channel.]
        $try[
            $leaveVoiceChannel
            $interactionReply[
                $ephemeral
                $title[Action performed]
                $description[Client disconnected!]
                $footer[$username[$clientID] Music]
                $color[FFFFFF]
                $timestamp
            ]
        ;
            $c[Send the error message if something goes wrong.]
            $interactionFollowUp[
                $title[Something internal went wrong]
                $description[I was unable to disconnect from voice channel.\n-# with reason: $advancedTextSplit[$replace[$env[error];[Object\\] ;];(Extractor;0]]
                $footer[$username[$clientID] Music]
                $color[FFFFFF]
                $timestamp
            ;false]
        ;error]
    `
}