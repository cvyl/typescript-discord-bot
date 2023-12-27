import { Client, GatewayIntentBits, ActivityType } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { deployCommands } from "./deploy-commands";

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages],
});

client.once("ready", () => {
    console.log("Discord bot is ready! 🤖");

    // Set custom presence
    setCustomPresence(client);
});

client.on("guildCreate", async (guild) => {
    await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
        commands[commandName as keyof typeof commands].execute(interaction);
    }
});

client.login(config.DISCORD_TOKEN);

// Function to set custom presence
function setCustomPresence(client: Client) {
    if (client.user) {
        // Get an array of all guilds' member usernames
        const usernames: string[] = [];
        client.guilds.cache.forEach((guild) => {
            guild.members.cache.forEach((member) => {
                usernames.push(member.user.username);
            });
        });

        // Choose a random username from any guild's member list using discordjs. make it listen to all guilds and put all guild ids into an array and get the users from those guilds
        // Set custom activity where it chooses a random username from the array every 10 seconds
        setInterval(() => {
            client.user?.setActivity(usernames[Math.floor(Math.random() * usernames.length)], {
                type: ActivityType.Watching,
            });
        }, 10000);
    }
}
