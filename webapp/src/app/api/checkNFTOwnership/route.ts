import { NextRequest, NextResponse } from "next/server";
import { Network, Alchemy } from "alchemy-sdk";
export async function GET(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");
  const nftAddress = "0xfaA7e7F14a2dCAD537d0141533bB58D62dD8022c"; // Goerli

  try {
    if (!address) {
      return NextResponse.json({ message: "Invalid request" }, { status: 500 });
    }
    // Optional Config object, but defaults to demo api-key and eth-mainnet.
    const settings = {
      apiKey: process.env.ALCHEMY_KEY, // Replace with your Alchemy API Key.
      network: Network.ETH_GOERLI, // Replace with your network.
    };

    const alchemy = new Alchemy(settings);
    const result = await alchemy.nft.verifyNftOwnership(address, nftAddress);
    console.log(result);

    return NextResponse.json({ result }); // Return user info as JSON response
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to retrieve user info" }); // Return error as JSON response
  }
}
