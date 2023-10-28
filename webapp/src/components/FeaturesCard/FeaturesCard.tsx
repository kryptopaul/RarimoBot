import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Center,
  Button,
  Overlay,
} from "@mantine/core";
import {
  IconGasStation,
  IconGauge,
  IconManualGearbox,
  IconUsers,
} from "@tabler/icons-react";
import { ConnectKitButton } from "connectkit";
import classes from "./FeaturesCard.module.css";

interface FeaturesCardProps {
  title: string;
  image: string;
  description: string;
  visible?: boolean;
}

export function FeaturesCard({ title, image, description }: FeaturesCardProps) {
  return (
    <>
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.imageSection}>
          <Image src={image} alt="Tesla Model S" />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="md">
          <div>
            <Text fw={500}>{title}</Text>
            <Text fz="xs" c="dimmed">
              {description}
            </Text>
          </div>
        </Group>

        <Card.Section className={classes.section}>
          <Group gap={30}>
          <ConnectKitButton />

          </Group>
        </Card.Section>

      </Card>
    </>
  );
}
