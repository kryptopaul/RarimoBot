import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const cookie: any = req.cookies.get("web3session");
    console.log(cookie);
    // If no cookie, unauthorized
    if (!cookie) {
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
    const info = await response.data;
    console.log(info);
    // If no address, unauthorized
    if (!info.address) {
      return NextResponse.json(
        { message: "You are not authorized to access this resource." },
        { status: 403 }
      );
    }

    // Discord check todo

    return NextResponse.json(info);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
