# RarimoBot
Project for ETH London 2023
## Requirements

- Docker (or a remote MongoDB)

- NodeJS

## How to run?

### MongoDB
I've attached a dockerized MongoDB in this repo, to make running it easier.
1. Run `docker compose up`

### Discord Bot
1. Create an .env file within the `discord-bot` folder and fill in:

	- TOKEN=

	- CLIENT_ID=

	- SUPPORT_SERVER=

	- MONGO_CONNECTION=

If you're using the dockerized MongoDB from this repo, you can use `mongodb://admin:admin@localhost:27019/?authMechanism=DEFAULT`

2. Run `yarn install`
3. Run `yarn start`

### WebApp
1. Create a `.env.local` file within the webapp folder.
2. Fill in the following (use the same MongoDB string):
	- SESSION_SECRET=
	- NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
	- TOKEN=
	- CLIENT_ID=
	- CLIENT_SECRET=
	- ALCHEMY_KEY=
	- MONGO_CONNECTION=

I'll attach my values to copy and paste on Telegram along with the submission. If you've not received it, DM @kryptopauldev

3. Run `yarn install`
4. Run `yarn build`
5. Run `yarn start`

## Set up the Discord Bot
Use the following link to add the bot to your server. It will work only if you use my values - otherwise you'll need to generate one yourself. 

https://discord.com/api/oauth2/authorize?client_id=1167473955330871296&permissions=268437504&scope=bot

If you're generating a link yourself, make sure you've ticked the `Server Members Intent` in the Bot tab in Discord Developer Portal.

For the permissions, make sure the bot can Manage Roles, and Send Messages. 

#### Set up the "Verified" role
Once you add the bot for the first time, make sure to run `/setup` and select the role which should be received by the verified users.

### How to verify?
Once the bot is set up, the users can run `/verify` which will generate a link for them where they'll need to go through SIWE, Discord connection and PoH verification.

Once all stages have been completed, the bot will automatically assign a role to them.