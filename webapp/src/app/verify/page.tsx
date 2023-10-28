"use client";

import {
  Container,
  Grid,
  Title,
  Overlay,
  Button,
  Center,
  Text,
} from "@mantine/core";
import { useSIWE, useModal, SIWESession, ConnectKitButton } from "connectkit";
import { FeaturesCard } from "@/components/FeaturesCard/FeaturesCard";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import Lottie from "lottie-react";
import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import Cookies from "universal-cookie";

const icon = <IconInfoCircle />;

function Verify({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cookies = new Cookies();

  async function checkNFT(address: `0x${string}`) {
    setPohLoading(true);
    const response = await axios.get(
      `/api/checkNFTOwnership?address=${address}`
    );

    if (response.data.result === true) {
      setOwnsNFT(true);
      const response = await axios.post("/api/protected/addRole");
      console.log(response.data.message);
      if (response.data.message === "success") {
        setPohLoading(false);
        setDisplaySuccess(true);
      }
      return;
    }
    setOwnsNFT(false);
    setPohLoading(false);
    return;
  }
  // Handle Discord callback
  // No idea why it calls itself twice, but well, it works
  useEffect(() => {
    if (searchParams.code && !discordId) {
      setDiscordLoading(true);
      console.log(searchParams.code);
      axios
        .get(
          `http://localhost:3000/api/protected/getDiscordInfo?code=${searchParams.code}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.accessToken) {
            console.log(res.data.accessToken);
            setDiscordId(res.data.accessToken); // Hold this accessToken in state to use it later in our protected route

            cookies.set("discordAccessToken", res.data.accessToken);
            console.log(cookies.get("discordAccessToken")); // Pacman
            setStage(3);
          }
          setDiscordLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setDiscordLoading(false);
        });
    }
  }, [searchParams.code]);

  // Save the guildId in localStorage so that it can be accessed later when we come back from Discord login page
  useEffect(() => {
    try {
      if (searchParams.guildId) {
        console.log(searchParams.guildId);
        cookies.set("guildId", searchParams.guildId as string);
      }
    } catch (err) {
      console.log(err);
    }
  }, [searchParams.guildId]);

  // Get the guildId from localStorage - required for the build process
  useEffect(() => {
    try {
      const guildId = cookies.get("guildId");
      if (guildId) {
        setGuildId(guildId);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const [guildId, setGuildId] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [discordLoading, setDiscordLoading] = useState(false);
  const [stage, setStage] = useState(1);
  const [pohLoading, setPohLoading] = useState(false);
  const [ownsNFT, setOwnsNFT] = useState<boolean | null>(null);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  const { data, isReady, isRejected, isLoading, isSignedIn, signOut, signIn } =
    useSIWE({
      onSignIn: (session?: SIWESession) => {
        // Do something with the data
      },
      onSignOut: () => {
        // Do something when signed out
      },
    });

  useEffect(() => {
    if (isSignedIn) {
      setStage(2);
    }
    if (discordId) {
      setDiscordLoading(false);
      setStage(3);
    }
  }, [isSignedIn, discordId]);
  const { address } = useAccount();
  const { setOpen } = useModal();
  // PoH Modal
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      {" "}
      <Modal opened={opened} onClose={close} title="Proof of Humanity">
        <Alert
          display={ownsNFT === false ? "flex" : "none"}
          variant="filled"
          color="pink"
          title="PoH Soulbound not detected"
          icon={icon}
        >
          Have you claimed yours at{" "}
          <a href="https://robotornot.mainnet-beta.rarimo.com" target="_blank">
            https://robotornot.mainnet-beta.rarimo.com
          </a>
          ?
        </Alert>
        <Alert display={displaySuccess === true ? 'flex' : 'none'} variant="filled" color="green" title="Success!" icon={icon}>
          {
            "We've successfully verified your PoH. Enjoy your new Discord role!"
          }
        </Alert>
        {/* Modal content */}
        <Lottie
          animationData={require("../../../public/person.json")}
          style={{
            width: 250,
            height: 250,
            margin: "auto",
            display: "block",
          }}
        />
        <br />
        <Title order={4} mb={10}>
          {"          Let's check your PoH holder status."}{" "}
        </Title>
        <Text>This will only take a while.</Text>

        <Button
          onClick={() => checkNFT(address!)}
          style={{ flex: 1, marginTop: 10 }}
          size="md"
          loading={pohLoading}
        >
          Check
        </Button>
      </Modal>
      <Container mt={200} size={"md"}>
        <Title>✨Welcome!</Title>
        <Title order={2}>
          {"You're only a few clicks away from joining our community!"}
        </Title>
        <br /> <br />
        <Grid>
          <Grid.Col span={4}>
            <Title order={3}>Step 1</Title>
            <Title order={4} mb={10}>
              Connect your Wallet
            </Title>
            <FeaturesCard
              title="Connect your Wallet"
              image="/stage1.png"
              description="Sign in and sign a message to verify your wallet."
              extraComponent={
                isSignedIn ? (
                  <Button disabled radius="md" style={{ flex: 1 }} size="lg">
                    ✅ Done
                  </Button>
                ) : address ? (
                  <Button
                    radius="md"
                    style={{ flex: 1 }}
                    size="lg"
                    onClick={() => signIn()}
                  >
                    Sign Message
                  </Button>
                ) : (
                  <Button
                    radius="md"
                    style={{ flex: 1 }}
                    size="lg"
                    onClick={() => setOpen(true)}
                  >
                    Connect Wallet
                  </Button>
                )
              }
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={3}>Step 2</Title>
            <Title order={4} mb={10}>
              Verify your Discord
            </Title>
            <FeaturesCard
              title="Verify your Discord"
              description="Login with your Discord account to verify your identity."
              image="/step2.png"
              extraComponent={
                <Button
                  disabled={
                    stage === 2 ? false : true // If the wallet is connected and the discord is connected, then the button is disabled
                  }
                  loading={discordLoading}
                  onClick={
                    discordId ? (event) => event.preventDefault() : () => {} // I know, spaghetti :o
                  }
                  radius="md"
                  style={{ flex: 1 }}
                  size="lg"
                  component="a"
                  href={
                    stage === 2
                      ? "https://discord.com/api/oauth2/authorize?client_id=1167473955330871296&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fverify&response_type=code&scope=identify"
                      : ""
                  }
                >
                  {discordId ? "✅ Done" : "Login"}
                </Button>
              }
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={3}>Step 3</Title>
            <Title order={4} mb={10}>
              Verify your PoH
            </Title>
            <FeaturesCard
              title="Verify your PoH"
              description="Use our PoH dApp to verify that you're a human"
              image="/step3.png"
              extraComponent={
                <Button
                  disabled={stage === 3 ? false : true}
                  radius="md"
                  style={{ flex: 1 }}
                  size="lg"
                  onClick={open}
                >
                  Verify
                </Button>
              }
            />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}

export default Verify;
