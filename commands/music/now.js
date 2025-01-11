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
                $c[Load the queued track to an array.]
                $arrayLoad[tracks;ඞ;$queue[0;5;{position}. **{track.cleanTitle}** by **{track.author}**;ඞ]]
                $let[maximumCanvasWidth;$multi[70;$arrayLength[tracks]]]

                $c[Canvas stuff.]
                $createCanvas[queue;$setCanvasSize[512;$get[maximumCanvasWidth]]]
                $let[barHeight;$sub[$canvasSize[queue;width];50]]
                $let[verticalPosition;20]
                $let[horizontalPosition;$divide[$sub[$canvasSize[queue;width];$get[barHeight]];2]]
                $let[backgroundURL;https://4kwallpapers.com/images/wallpapers/3d-background-squares-purple-light-metal-aesthetic-2048x2048-2700.jpg]
                $filter[queue;add;blur;10]
                $drawImage[queue;$get[backgroundURL];0;0;$canvasSize[queue;width];$canvasSize[queue;height]]
                $filter[queue;remove;blur;10]
                $arrayForEach[tracks;track;
                    $let[text;$replace[$env[track];**;]]
                    $let[safeText;$if[$charCount[$get[text]]>=42;$textSlice[$get[text];0;40]...;$get[text]]]

                    $drawRect[queue;fill;#FFFFFF;$get[horizontalPosition];$get[verticalPosition];$get[barHeight];30]
                    $drawText[queue;fill;$get[safeText];20px Arial;#000000;$sum[$get[horizontalPosition];10];$sum[$get[verticalPosition];22]]

                    $letSum[verticalPosition;50]
                ]

                $c[Draw the client name into the image.]
                $drawText[queue;fill;$username[$clientID] Music;10px Arial;#FFFFFF;$get[horizontalPosition];$sub[$get[maximumCanvasWidth];10]]

                $c[Attach the canvas as attachment.]
                $attachCanvas[queue]

                $title[Incoming Tracks;;1]
                $description[Amount of pending songs: $queueLength\nEstimated time: $parseMS[$queueEstimatedDuration]\n-# Estimated time is an approximation, cannot be accurate.;1]
                $image[attachment://queue.png;1]
                $footer[$username[$clientID] Music;$userAvatar[$clientID];1]
                $color[FFFFFF;1]
                $timestamp[;1]
            ]
        ]
    `
}