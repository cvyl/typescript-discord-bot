import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from 'discord.js';
const FastSpeedtest = require("fast-speedtest-api");

export const data = new SlashCommandBuilder()
    .setName('speedtest')
    .setDescription('Run a local speedtest');

export async function execute(interaction: CommandInteraction) {
    try {
        interaction.deferReply();


        const speedtest = new FastSpeedtest({
            token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
            verbose: false, // default: false
            timeout: 10000, // default: 5000
            https: true, // default: true
            urlCount: 5, // default: 5
            bufferSize: 8, // default: 8
            unit: FastSpeedtest.UNITS.Mbps // default: Bps
        });


        speedtest.getSpeed().then((s: any) => {
            const downloadSpeed = Math.floor(s);
            const embed = new EmbedBuilder()
                .setTitle('Speedtest Results')
                .addFields([
                    { name: 'Download Speed', value: `${downloadSpeed} Mbps` }
                ])
                .setColor('#00FF00');

            interaction.followUp({ embeds: [embed], components: [] });
        }).catch((e: any) => {
            console.error(e);
            interaction.editReply('An error occurred while running the speedtest.');
        });
    } catch (error) {
        console.error(error);
        await interaction.reply('An error occurred while running the speedtest.');
    }
}
