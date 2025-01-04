module.exports = {
    type: 'interactionCreate',
    allowedInteractionTypes: [
        'autocomplete'
    ],
    code: `
        $c[Allowing the execution for this comand and option only.]
        $onlyIf[$and[$applicationCommandName==music;$applicationSubCommandName==filters;$focusedOptionName==filter]]

        $c[Check whether is a music node created.]
        $onlyIf[$hasMusicNode==true;
            $addChoice[No music service active in this guild;__none__]
        ]

        $c[Getting the filter names.]
        $arrayLoad[enabledFilters;,;$getEnabledFilters]
        $arrayLoad[disabledFilters;,;$getDisabledFilters]
        $arrayConcat[allFilters;enabledFilters;disabledFilters]
        $arraySort[allFilters;allFilters]
        
        $ifx[
            $c[Show the first filters in the list if the option value is empty.]
            $if[$focusedOptionValue==;
                $arraySlice[allFilters;showFilters;0;25]
                $arrayForEach[showFilters;currentFilter;
                    $if[$env[currentFilter]!=;
                        $addChoice[$env[currentFilter];$env[currentFilter]]
                    ]
                ]
            ]
            $else[
                $let[addedFilters;0]
                $arrayForEach[allFilters;currentFilter;
                    $if[$env[currentFilter]!=;
                        $if[$and[$checkContains[$toLowerCase[$env[currentFilter]];$toLowerCase[$focusedOptionValue]];$get[addedFilters]<25];
                            $addChoice[$env[currentFilter];$env[currentFilter]]
                            $letSum[addedFilters;1]
                        ]
                    ]
                ]
            ]
        ]
    `
}