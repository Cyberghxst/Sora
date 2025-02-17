module.exports = {
    data: {
        name: 'filters',
        description: '💿 → Toggle music filter for the current stream.',
        options: [
            {
                name: 'filter',
                description: 'The filter name to toggle.',
                type: 3,
                required: false,
                autocomplete: true
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

        $c[Allowing track requester and administrators to toggle filters.]
        $onlyIf[$or[$trackInfo[requestedBy;id]==$authorID;$hasPerms[$guildID;$authorID;ManageGuild];$hasPerms[$guildID;$authorID;Administrator]];
            $interactionReply[
                $author[Disallowed Action]
                $description[Only the track requester and administrators can pause this song.]
                $footer[$username[$clientID] Music]
                $color[FFFFFF]
                $timestamp
            ]
        ]

        $c[If the user provided a filter, lets toggle it.]
        $if[$option[filter]!=;
            $c[Defer the interaction as it may take long.]
            $defer

            $c[Teggling the filter.]
            $toggleFilters[$callFunction[toPascalCase;$option[filter]]]

            $c[Let's reply the interaction.]
            $interactionFollowUp[
                $title[Filter Toggled]
                $description[New state for $bold["$option[filter]"]: $if[$checkContains[$getEnabledFilters;$option[filter]];<:toggle_on:1324786159213088848> Enabled;<:toggle_off:1324786102413824142> Disabled]]
                $footer[$username[$clientID] Music]
                $color[FFFFFF]
                $timestamp
            ]
                
            $stop $c[Stop the execution for the filter showcase. (below)]
        ]

        $c[Getting the filter names.]
        $arrayLoad[disabledFilters;,;$getDisabledFilters]
        $arrayLoad[enabledFilters;,;$getEnabledFilters]
        $arrayConcat[allFilters;disabledFilters;enabledFilters]
        $arrayCreate[contents]

        $c[Looping for each filter name.]
        $arrayForEach[allFilters;currentFilter;
            $if[$env[currentFilter]!=;
                $if[$arrayIncludes[disabledFilters;$env[currentFilter]]==true;
                    $arrayPush[contents;$toTitleCase[$env[currentFilter]]: <:toggle_off:1324786102413824142>]
                ;
                    $arrayPush[contents;$toTitleCase[$env[currentFilter]]: <:toggle_on:1324786159213088848>]
                ]
            ]
        ]
        
        $c[Sending the interaction.]
        $interactionReply[
            $title[Filters]
            $description[$arrayJoin[contents;\n]]
            $footer[$username[$clientID] Music]
            $color[FFFFFF]
            $timestamp
        ]
    `
}