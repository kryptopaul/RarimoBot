import { CommandInteraction, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import { logger } from "../logger/logger";
import { config } from "../config";

const supportServer = config.SUPPORT_SERVER;

export const data = new SlashCommandBuilder()
  .setName("verify")
  .setDescription("Verify your Proof of Membership!");

export async function execute(interaction: CommandInteraction) {
    const embed = new EmbedBuilder()
    .setTitle(`Welcome to ${interaction.guild?.name}!`)
    .setDescription("Upon clicking the button, you'll be redirected to the verification page. Your role will automatically be assigned upon a successful Proof of Humanity verification.")
    .setColor(2326507)
    .setThumbnail('https://em-content.zobj.net/source/apple/354/nerd-face_1f913.png')

  const subscribe = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel('Join Server')
    .setURL(supportServer)
    .setEmoji('⭐')

  const row = new ActionRowBuilder<ButtonBuilder>()
  .addComponents(subscribe);

  return interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
}