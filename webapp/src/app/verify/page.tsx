"use client";

import { Container, Grid, Title, Overlay } from "@mantine/core";
import { useSIWE, useModal, SIWESession, ConnectKitButton } from "connectkit";
import { FeaturesCard } from "@/components/FeaturesCard/FeaturesCard";
const Verify = () => {
  const { data, isReady, isRejected, isLoading, isSignedIn, signOut, signIn } =
    useSIWE({
      onSignIn: (session?: SIWESession) => {
        // Do something with the data
      },
      onSignOut: () => {
        // Do something when signed out
      },
    });
  return (
    <>
      <Container mt={200} size={"md"}>
        <Title>✨Welcome to Rarimo!</Title>
        <Title order={2}>
          {"You're only a few clicks away from joining the community!"}
        </Title>
        <br />
        <Grid>
          <Grid.Col span={4}>
            <Title order={3}>Step 1</Title>
            <Title order={4} mb={10}>
              Verify your wallet
            </Title>
            <FeaturesCard
              title="Verify your Wallet"
              image="/stage1.png"
              description="Sign in and sign a message to verify your wallet."
              visible={true}
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
            />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default Verify;
