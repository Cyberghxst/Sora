import { lstatSync, readdirSync } from 'fs'
import { join } from 'path'

/**
 * Recursively read the given directory and subfolders
 * to extract the file paths of inside.
 * @param dir - The directory to read.
 * @param cb - Callback to load the file paths.
 * @returns {string[]}
 */
export function recursiveCollectFilePaths(
    dir: string,
    cb: ((file: string) => boolean) | null = null
): string[] {
    const files = readdirSync(dir)
    const collected: string[] = []

    for (const file of files) {
        const stat = lstatSync(join(dir, file))
        if (stat.isDirectory()) {
            collected.push(
                ...recursiveCollectFilePaths(
                    join(dir, file),
                    cb
                )
            )
        } else if (cb === null || cb(file)) {
            collected.push(join(dir, file))
        }
    }

    return collected
}