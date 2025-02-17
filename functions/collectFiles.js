const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

/**
 * Collect files from a directory.
 * @param {string} dir - The directory to collect files from.
 * @param {?(file: string) => boolean} cb - The callback to load files from.
 * @param {?(name: string) => true} except - Exceptions to skip files.
 * @returns {string[]}
 */
function collectFiles(dir, cb = null, except = null) {
    const files = readdirSync(dir)
    const collected = []

    for (const file of files) {
        if (lstatSync(join(dir, file)).isDirectory()) {
            collected.push(...collectFiles(join(dir, file), cb, except))
            continue
        }

        if (except !== null && except(file)) continue;
        if (cb === null || (cb && cb(file))) {
            collected.push(join(dir, file))
        }
    }

    return collected
}

module.exports = { collectFiles }