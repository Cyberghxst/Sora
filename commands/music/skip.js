module.exports = {
    data: {
        name: 'skip',
        description: '💿 → Skips to the next song in the queue.'
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
        $onlyIf[$hasMusicNode==true;
            $interactionReply[
                $author[Disallowed Action]
                $description[There is not a music service active in this guild.]
                $footer[$username[$clientID] Music]
                $color[FFFFFF]
                $timestamp
            ]
        ]

        $c[Allowing track requester and administrators to skip the song.]
        $onlyIf[$or[$trackInfo[requestedBy;id]==$authorID;$hasPerms[$guildID;$authorID;ManageGuild];$hasPerms[$guildID;$authorID;Administrator]];
            $interactionReply[
                $author[Disallowed Action]
                $description[Only the track requester and administrators can skip this song.]
                $footer[$username[$clientID] Music]
                $color[FFFFFF]
                $timestamp
            ]
        ]

        $c[Checking for tracks in queue.]
        $onlyIf[$queueLength>0;
            $author[Disallowed Action]
            $description[There are not any tracks in queue to perform this action.]
            $footer[$username[$clientID] Music]
            $color[FFFFFF]
            $timestamp
        ]

        $c[Skip to the next song.]
        $skipTrack
        $interactionReply[
            $title[Action performed]
            $description[Song skipped.]
            $footer[$username[$clientID] Music]
            $color[FFFFFF]
            $timestamp
        ]
    `
}