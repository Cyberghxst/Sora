/**
 * Represents a key-value structure
 * for converting times to milliseconds.
 * @type {Record<number, (arg: number) => number>}
 */
const convertionConstants = {
    0: (ss) => ss * 1000,
    1: (mm) => mm * 60 * 1000,
    2: (hh) => hh * 60 * 60 * 1000,
    3: (dd) => dd * 24 * 60 * 60 * 1000,
    4: (ww) => ww * 7 * 24 * 60 * 60 * 1000
}

/**
 * The convertion names.
 */
const convertionNames = ['ss', 'mm', 'hh', 'dd', 'ww'].reverse()

/**
 * Unparses from digital duration to milliseconds.
 * @param {string} duration - The duration to be unparsed.
 * @returns {number}
 */
function unparseDigital(duration) {
    const parts = duration.split(':').reverse()
    if (parts.length < 2) throw new Error('Digital format must be formed by "mm:ss" at least!')
    if (parts.length > convertionNames.length) throw new Error(`Digital format must be formed by "${convertionNames.join(':')}" at most!`)

    let unparsedDuration = 0

    for (let i = 0; i < parts.length; i++) {
        unparsedDuration = 
            unparsedDuration + convertionConstants[i](parseInt(parts[i]))
    }

    return unparsedDuration
}

module.exports = { unparseDigital }