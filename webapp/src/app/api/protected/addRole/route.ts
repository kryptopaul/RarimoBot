import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import mongoose from "mongoose";
import Info from "@/lib/infoSchema";
import Server from "@/lib/serverSchema";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const cookie: any = req.cookies.get("web3session");
    const discordAccessToken = req.cookies.get("discordAccessToken");
    const guildId = req.cookies.get("guildId")?.value;
    console.log(cookie);
    console.log(discordAccessToken);
    console.log(guildId);
    // If no cookie, unauthorized
    if (!cookie || !discordAccessToken) {
      return NextResponse.json(
        { message: "You are not authorized to access this resource." },
        { status: 403 }
      );
    }

    // Check the SIWE session
    const response = await axios.get("http://localhost:3000/siwe", {
      headers: {
        Cookie: `web3session=${cookie.value}`,
      },
    });
    const info = response.data;
    console.log(info);
    // If no address, unauthorized
    if (!info.address) {
      return NextResponse.json(
        { message: "You are not authorized to access this resource." },
        { status: 403 }
      );
    }

    // Discord check todo
    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${discordAccessToken.value}`,
      },
    });
    console.log(userResponse.data);
    // Get the verified role id from mongo
    const server = await mongoose.connect(
      process.env.MONGO_CONNECTION as string,
      {
        dbName: "info",
      }
    );

    const serverResponse = await Server.findOne({ guildId: guildId });
    console.log(serverResponse);
    const verifiedRoleId = serverResponse?.verifiedRoleId;
    await server.disconnect();

    // Save info in Mongo

    const connection = process.env.MONGO_CONNECTION!;

    await mongoose.connect(connection, {
      dbName: "info",
    });
    const payload = new Info({
      guildId: guildId,
      userDiscordId: userResponse.data.id,
      userAddress: info.address,
      userStatus: "verified",
    });
    await payload.save();
    console.log("Saved to db:");
    console.log({ payload });

    // Finally, assign role to user
    // `https://discord.com/api/guilds/${guildId}/members/${userResponse.data.id}/roles/${verifiedRoleId}`
    const token = process.env.TOKEN;
    console.log(token);
    const roleResponse = await fetch(
        `https://discord.com/api/guilds/${guildId}/members/${userResponse.data.id}/roles/${verifiedRoleId}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bot ${token}`,
            }
        }
    )
    console.log(roleResponse.status);

    return NextResponse.json({ message: "success" });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
