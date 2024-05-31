import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("replyme")
    .setDescription("Replies with a list of all commands and their descriptions");

export async function execute(interaction: CommandInteraction) {
    await interaction.reply("test replyMe command executed!");
}
