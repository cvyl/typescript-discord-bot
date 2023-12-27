import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import fs from "fs";
//make a slash command that sends a message to the channel with all the commands and their descriptions
export const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Replies with a list of all commands and their descriptions");

//reply with a list of all commands and their descriptions when the slash command is used
export async function execute(interaction: CommandInteraction) {
    const commandFiles = fs.readdirSync(__dirname)
        .filter(file => file.endsWith(".ts") && file !== "list_commands.ts");

    const commands = commandFiles.map(file => {
        const commandName = file.replace(".ts", "");
        return `- ${commandName}`;
    });

    await interaction.reply(`Here are the available commands:\n${commands.join("\n")}`);
}
