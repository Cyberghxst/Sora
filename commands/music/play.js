const redPlatformWarning = 'Playing from the "red platform" can lead to issues and problems in general, may not work as expected.'

module.exports = {
    data: {
        name: 'play',
        description: '💿 → Play a song using the given title or URL.',
        options: [
            {
                name: 'song',
                description: 'Song name/URL to resolve.',
                type: 3,
                required: true,
                autocomplete: false
            }
        ]
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

        $c[
            Checking if client is connected to a voice channel.
            If so, we need to check that the author is connected to the same channel.
        ]
        $if[$and[$voiceID[$guildID;$clientID]!=;$voiceID[$guildID;$authorID]!=$voiceID[$guildID;$clientID]];
            $interactionReply[
                $author[Disallowed Action]
                $description[You must be connected to the same voice channel as me to perform this action.]
                $footer[$username[$clientID] Music]
                $color[FFFFFF]
                $timestamp
            ]
            $stop
        ]

        $c[Saving the user input into a variable.]
        $let[query;$option[song]]

        $c[Creating regexes to match the source.]
        $createRegex[soundcloud;$getGlobalVar[soundcloudRegex]]
        $createRegex[youtube;$getGlobalVar[youtubeRegex]]
        $createRegex[deezer;$getGlobalVar[deezerRegex]]
        $createRegex[vimeo;$getGlobalVar[vimeoRegex]]

        $c[Trying to guess the user input source.]
        $let[sourceType;youtube]
        $ifx[
            $if[$regexTest[soundcloud;$get[query]]==true;
                $c[If the user link has query parameters, we need to remove them.]
                $if[$checkContains[$get[query];?];
                    $let[query;$advancedTextSplit[$get[query];?;0]]
                ]
                $let[sourceType;soundcloud]
            ]
            $elseif[$regexTest[vimeo;$get[query]]==true;
                $let[sourceType;vimeo]
            ]
            $elseif[$or[$regexTest[youtube;$get[query]]==true;$regexTest[deezer;$get[query]]==true];
                $c[We stop the execution for this source.]
                $interactionReply[
                    $title[Disallowed Action]
                    $description[This source is not allowed.]
                    $footer[$username[$clientID] Music]
                    $color[FFFFFF]
                    $timestamp
                ]
                $stop
            ]
        ]

        $c[Deferring the interaction as the song search may take long.]
        $defer

        $c[Checking whether current guild has a music node created.]
        $let[hadMusicNode;$hasMusicNode]

        $c[If there was no music node before, let's play the watermark.]
        $if[$get[hadMusicNode]==false;$callFunction[playWatermark;$voiceID[$guildID;$authorID]]]

        $c[Retry system to play a track.]
        $let[maximumConnectionRetries;10]
        $let[currentConnectionRetry;0]
        $let[lastErrorReason;No reason.]
        $let[succeed;false]

        $c[Trying to play once.]
        $try[
            $playTrack[$voiceID[$guildID;$authorID];$get[query]]
            $let[succeed;true]
        ;
            $let[currentConnectionRetry;$sum[$get[currentConnectionRetry];1]]
            $let[lastErrorReason;$env[e;message]]
        ;e]

        $c[Trying to play many times.]
        $while[$and[$get[currentConnectionRetry]<$get[maximumConnectionRetries];$get[succeed]==false];
            $try[
                $playTrack[$voiceID[$guildID;$authorID];$get[query]]
                $let[succeed;true]
            ;
                $let[lastErrorReason;$env[error;message]]
                $let[currentConnectionRetry;$sum[$get[currentConnectionRetry];1]]
            ;error]
        ]

        $c[Send the play message if succeed.]
        $if[$get[succeed]==true;
            $interactionFollowUp[
                $title[Occurences found]
                $description[<:disk:1323748440425103411> → $if[$get[hadMusicNode]==true;Track added to the queue.;Playing the track...]$if[$get[sourceType]==youtube;\n${redPlatformWarning}]$if[$get[currentConnectionRetry]>0;\nConnected after $bold[$get[currentConnectionRetry] retr$if[$get[currentConnectionRetry]==1;y;ies]].]]
                $footer[$username[$clientID] Music]
                $color[FFFFFF]
                $timestamp
            ]
        ]

        $c[Send the error message if maximum retries reached and not success.]
        $if[$and[$get[currentConnectionRetry]==$get[maximumConnectionRetries];$get[succeed]==false];
            $interactionFollowUp[
                $title[Something internal went wrong]
                $description[I was unable to play the given song after $bold[$get[currentConnectionRetry] connection retr$if[$get[currentConnectionRetry]==1;y;ies]].\n-# with reason: $advancedTextSplit[$replace[$get[lastErrorReason];[Object\\] ;];(Extractor;0]]
                $footer[$username[$clientID] Music]
                $color[FFFFFF]
                $timestamp
            ;false]
        ]
    `
}