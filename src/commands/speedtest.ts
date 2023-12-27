import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from 'discord.js';
const FastSpeedtest = require("fast-speedtest-api");

export const data = new SlashCommandBuilder()
    .setName('speedtest')
    .setDescription('Run a local speedtest');

export async function execute(interaction: CommandInteraction) {
    try {
        const loadingMessage = await interaction.reply('Loading...');

        const progressIcons = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
        let progressIndex = 0;

        const progressInterval = setInterval(() => {
            loadingMessage.edit(`Loading... ${progressIcons[progressIndex]}`);
            progressIndex = (progressIndex + 1) % progressIcons.length;
        }, 200);

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
            clearInterval(progressInterval);
            const downloadSpeed = Math.floor(s);
            const embed = new EmbedBuilder()
                .setTitle('Speedtest Results')
                .addFields([
                    { name: 'Download Speed', value: `${downloadSpeed} Mbps` }
                ])
                .setColor('#00FF00');

            loadingMessage.delete(); // Remove the loading message

            interaction.reply({ embeds: [embed], components: [] });
        }).catch((e: any) => {
            clearInterval(progressInterval);
            console.error(e);
            loadingMessage.edit('An error occurred while running the speedtest.');
        });
    } catch (error) {
        console.error(error);
        await interaction.reply('An error occurred while running the speedtest.');
    }
}
