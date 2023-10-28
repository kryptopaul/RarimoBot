import dotenv from "dotenv";

dotenv.config();

const { TOKEN, CLIENT_ID, SUPPORT_SERVER } = process.env;

if (!TOKEN || !CLIENT_ID || !SUPPORT_SERVER) {
  throw new Error("Missing environment variables");
}

export const config = {
  TOKEN,
  CLIENT_ID,
  SUPPORT_SERVER
};