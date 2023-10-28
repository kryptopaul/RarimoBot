import {
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
} from "discord.js";
import dotenv from "dotenv";
dotenv.config();
export const data = new SlashCommandBuilder()
  .setName("support")
  .setDescription("Join the RarimoBot Support Server!");

export async function execute(interaction: CommandInteraction) {
  const embed = new EmbedBuilder()
    .setTitle("Join the RarimoBot Support Server!")
    .setDescription(
      "Upon clicking the button, you'll be redirected to the RarimoBot Support Server."
    )
    .setColor(2326507)
    .setThumbnail("https://emojigraph.org/media/apple/ring-buoy_1f6df.png");

  const subscribe = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel("Join Server")
    .setURL(process.env.SUPPORT_SERVER as string)
    .setEmoji("🛟");

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(subscribe);
  return interaction.reply({
    ephemeral: false,
    embeds: [embed],
    components: [row],
  });
}
