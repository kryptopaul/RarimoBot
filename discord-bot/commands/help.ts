import { CommandInteraction, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import { logger } from "../logger/logger";
import { config } from "../config";

const supportServer = config.SUPPORT_SERVER;

export const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("See a list of available commands.");

export async function execute(interaction: CommandInteraction) {
    const embed = new EmbedBuilder()
    .setTitle('Help')
    .setDescription('List of available commands:')
    .addFields(
        { name: '/invite', value: 'Invite the bot.' },
        { name: '/help', value: 'Shows the help message.' },
        { name: '/configure role', value: 'Change the role given to verified members.' },
        { name: '/configure dm_prompt', value: 'Enable or disable message sent to new members.' },
        { name: '/configure dm_message', value: 'Configure the message sent to new members.' },
        { name: '/verify', value: 'Receive a link to verify yourself.' },
        { name: '/support', value: 'Join the support server.' }
    )
    .setColor('#00A2E8');  // Set a color for the embed. This is optional.



  return interaction.reply({ ephemeral: false, embeds: [embed] });
}