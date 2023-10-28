import mongoose from "mongoose";
const ServerSchema = new mongoose.Schema(
  {
    guildId: String,
    verifiedRoleId: String,
  },
  { collection: "servers" }
);

const Server = mongoose.models.Server || mongoose.model("Server", ServerSchema);
export default Server;
