import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import qs from 'querystring';  // Make sure to install the 'querystring' module via npm

export async function GET(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;  // Assuming you have the client secret in an env variable
  const redirectUri = 'http://localhost:3000/verify';  // Replace with your redirect URI
  
  try {
    // Step 1: Exchange code for access token
    const tokenResponse = await axios.post(
      'https://discord.com/api/oauth2/token',
      qs.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;


    return NextResponse.json({accessToken});  // Return user info as JSON response
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to retrieve user info' });  // Return error as JSON response
  }
}
