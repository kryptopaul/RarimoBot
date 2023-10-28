import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import fs from "fs";
import path from "path";
import { logger } from "./logger/logger";
import { deployCommands } from "./deploy-commands";
import { commands } from "./commands";
import dotenv from "dotenv";
dotenv.config();
const token = process.env.TOKEN;

const client = new Client({
  intents: ["Guilds", "GuildMembers"], // Needed to print the server name in the message
});

client.once("ready", async () => {
  logger.info("Discord bot is ready! 🤖");
  await deployCommands({ guildId: "1167476694190407822" }); // Temporarily hardcoding my sevrer
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

// Log in to Discord with your client's token
client.login(token);
