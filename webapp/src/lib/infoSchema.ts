import mongoose from "mongoose";
const InfoSchema = new mongoose.Schema(
  {
    guildId: String,
    userDiscordId: String,
    userAddress: String,
    userStatus: String,
  },
  { collection: "info" }
);

const Info = mongoose.models.Info || mongoose.model("Info", InfoSchema);
export default Info;
