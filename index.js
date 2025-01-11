const { DefaultExtractors, ForgeMusic, GuildQueueEvent } = require('@tryforge/forge.music')
const { ForgeClient, FunctionManager, LogPriority } = require('@tryforge/forgescript')
const { YoutubeiExtractor } = require('discord-player-youtubei')
const { DeezerExtractor } = require('discord-player-deezer')
const { ForgeCanvas } = require('@tryforge/forge.canvas')
const { ForgeDB } = require('@tryforge/forge.db')
const functions = require('./handlers/functions')
const { ForgeRegex } = require('forge.regex')
const { readFile } = require('fs')

// Error catchers.
process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p)
})
.on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown')
    process.exit(1)
})

// Load the ".env" file.
process.loadEnvFile()

// Load the constants file into ForgeDB.
readFile('./constants.json', 'utf-8', (err, text) => {
    const parsed = JSON.parse(text)
    ForgeDB.variables(parsed)
})

const music = new ForgeMusic({
    connectOptions: {
        leaveOnEmpty: false,
        disableHistory: false
    },
    events: [
        GuildQueueEvent.ConnectionDestroyed,
        GuildQueueEvent.PlayerStart,
        GuildQueueEvent.PlayerError,
        GuildQueueEvent.Connection,
        GuildQueueEvent.Disconnect,
        GuildQueueEvent.EmptyQueue,
        GuildQueueEvent.Error
    ],
    includeExtractors: DefaultExtractors
})

const client = new ForgeClient({
    events: [
        'interactionCreate',
        'messageCreate',
        'ready'
    ],
    extensions: [
        music,
        new ForgeDB(),
        new ForgeRegex(),
        new ForgeCanvas()
    ],
    intents: [
        'Guilds',
        'GuildMessages',
        'GuildVoiceStates'
    ],
    logLevel: LogPriority.Medium,
    prefixes: [
        '<@$clientID>',
        '<@!$clientID>'
    ],
    token: process.env.TOKEN,
})

// Adding custom functions.
FunctionManager.load('sora', process.cwd() + '/functions')
client.functions.add(...functions)

// Loading music and events.
client.applicationCommands.load('./commands')
client.commands.load('./internalCommands')
client.commands.load('./events/client')
client.commands.load('./interactions')
music.commands.load('./events/music')

// Adding more sources to music service.
// music.player.extractors.register(YoutubeiExtractor, {})
// music.player.extractors.register(DeezerExtractor, { decryptionKey: process.env.DZR_DECRYPTION_KEY })

client.login()