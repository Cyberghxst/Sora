const { Partials } = require('discord.js')
const { DiscordClient } = require('./classes/structures/DiscordClient')
const { GatewayIntentBits, REST, Routes } = require('discord.js')

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

// The bot itself.
const client = new DiscordClient({
    intents: GatewayIntentBits.Guilds
        | GatewayIntentBits.GuildMessages
        | GatewayIntentBits.GuildVoiceStates,
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.User
    ]
})

client.commands.load(__dirname + '/commands')
client.once('ready', async () => {
    const rest = new REST().setToken(process.env.TOKEN)
    await rest.put(
        Routes.applicationGuildCommands(client.user.id, '966131185120059424'),
        { body: client.commands.all().map(c => c.toJSON) }
    )
})

client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {
        const command = client.commands.all().find(c => c.data.name === interaction.commandName)
        if (!command) return;

        if (command.validators.length) {
            for (const callback of command.validators) {
                if (!(callback({ interaction, client }))) {
                    return;
                }
            }
        }

        await command.execute({ interaction, client })
    }
})

client.login(process.env.TOKEN)