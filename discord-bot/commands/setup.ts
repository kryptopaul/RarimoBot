import { CommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import mongoose from "mongoose";
import Server from "../utils/serverSchema";

export const data = new SlashCommandBuilder()
  .setName("setup")
  .setDescription("Setup the bot for your server. Requires admin permissions.")
  .addRoleOption((option) =>
    option
      .setName("role")
      .setDescription("The role given to verified members.")
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export async function execute(interaction: CommandInteraction) {
  const role = interaction.options.get("role")?.value;
  console.log(role);
  const guildId = interaction.guild?.id;
  console.log(guildId);

  // Add role to DB
  await mongoose.connect(process.env.MONGO_CONNECTION as string, {
    dbName: "info",
  });
  const payload = new Server({
    guildId: guildId,
    verifiedRoleId: role,
  });

  await payload.save();
  console.log("Saved to db:");

  return interaction.reply("Setup complete!");
}
